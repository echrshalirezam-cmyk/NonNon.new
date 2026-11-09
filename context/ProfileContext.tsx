import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { clearActiveProfileId, loadActiveProfileId, loadProfiles, removeProfile, saveActiveProfileId, saveProfile } from '@/storage/profileStorage';
import { defaultAvatarId } from '@/constants/avatars';
import { validateProfileName } from '@/utils/profileValidation';
import type { LessonAttempt } from '@/types/lesson';
import type { AudioSettings, Profile, ProfileProgress } from '@/types/profile';
import { applyLessonResult } from '@/utils/lessonProgress';
import { dateKey } from '@/utils/dateKeys';
import {
  buyHeartRule,
  claimDailyRewardRule,
  createDefaultProgress,
  refreshDaily,
  reviewRule,
  type RuleResult,
} from '@/utils/progressRules';

export type ProfileInput = {
  name: string;
  avatarId: string;
};

export type ActionResult = { ok: true } | { ok: false; error: string };

export type LessonResultOutcome = { ok: true; xpAwarded: number } | { ok: false; error: string };

type ProgressRule = (progress: ProfileProgress, today: string) => RuleResult;

type ProfileContextValue = {
  ready: boolean;
  loadFailed: boolean;
  profiles: Profile[];
  activeProfile: Profile | null;
  createProfile: (input: ProfileInput) => Promise<ActionResult>;
  updateProfile: (id: string, input: ProfileInput) => Promise<ActionResult>;
  deleteProfile: (id: string) => Promise<ActionResult>;
  selectProfile: (id: string) => void;
  recordLessonResult: (lessonId: string, attempt: LessonAttempt) => Promise<LessonResultOutcome>;
  recordReview: (coveredWordIds: string[], missedWordIds: string[]) => Promise<ActionResult>;
  claimDailyReward: () => Promise<ActionResult>;
  buyHeart: () => Promise<ActionResult>;
  updateAudioSettings: (settings: AudioSettings) => Promise<ActionResult>;
};

const STORAGE_ERROR = 'ذخیره‌سازی انجام نشد. دوباره تلاش کنید.';
const LAST_PROFILE_ERROR = 'این آخرین پروفایل است. ابتدا یک پروفایل جدید بسازید.';
const NO_ACTIVE_ERROR = 'ابتدا یک پروفایل انتخاب کنید.';

const ProfileContext = createContext<ProfileContextValue | null>(null);

function createProfileId(): string {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    Promise.all([loadProfiles(), loadActiveProfileId()])
      .then(([loaded, savedActiveId]) => {
        if (cancelled) return;
        setProfiles(loaded);
        setActiveId(savedActiveId && loaded.some((profile) => profile.id === savedActiveId) ? savedActiveId : null);
      })
      .catch(() => {
        if (!cancelled) setLoadFailed(true);
      })
      .finally(() => {
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const activeRecord = profiles.find((profile) => profile.id === activeId) ?? null;

  const activeProfile = useMemo<Profile | null>(() => {
    if (!activeRecord) return null;
    return {
      ...activeRecord,
      progress: refreshDaily(activeRecord.progress, dateKey(new Date())),
    };
  }, [activeRecord]);

  const persistProfile = useCallback(
    async (updated: Profile): Promise<ActionResult> => {
      try {
        await saveProfile(updated, profiles.map((profile) => profile.id));
      } catch {
        return { ok: false, error: STORAGE_ERROR };
      }
      setProfiles((current) => current.map((profile) => (profile.id === updated.id ? updated : profile)));
      return { ok: true };
    },
    [profiles],
  );

  const commitRule = useCallback(
    async (rule: ProgressRule): Promise<ActionResult> => {
      if (!activeRecord) return { ok: false, error: NO_ACTIVE_ERROR };
      const outcome = rule(activeRecord.progress, dateKey(new Date()));
      if (!outcome.ok) return outcome;
      return persistProfile({ ...activeRecord, progress: outcome.progress });
    },
    [activeRecord, persistProfile],
  );

  const createProfile = useCallback(
    async (input: ProfileInput): Promise<ActionResult> => {
      const error = validateProfileName(input.name, profiles);
      if (error) return { ok: false, error };

      const profile: Profile = {
        id: createProfileId(),
        name: input.name.trim(),
        avatarId: input.avatarId || defaultAvatarId,
        createdAt: new Date().toISOString(),
        progress: createDefaultProgress(),
      };

      try {
        await saveProfile(profile, profiles.map((existing) => existing.id));
      } catch {
        return { ok: false, error: STORAGE_ERROR };
      }
      setProfiles((current) => [...current, profile]);
      return { ok: true };
    },
    [profiles],
  );

  const updateProfile = useCallback(
    async (id: string, input: ProfileInput): Promise<ActionResult> => {
      const existing = profiles.find((profile) => profile.id === id);
      if (!existing) return { ok: false, error: STORAGE_ERROR };

      const error = validateProfileName(input.name, profiles, id);
      if (error) return { ok: false, error };

      return persistProfile({ ...existing, name: input.name.trim(), avatarId: input.avatarId });
    },
    [profiles, persistProfile],
  );

  const deleteProfile = useCallback(
    async (id: string): Promise<ActionResult> => {
      if (profiles.length <= 1) return { ok: false, error: LAST_PROFILE_ERROR };

      try {
        await removeProfile(id, profiles.map((profile) => profile.id));
        if (activeId === id) await clearActiveProfileId();
      } catch {
        return { ok: false, error: STORAGE_ERROR };
      }
      setProfiles((current) => current.filter((profile) => profile.id !== id));
      setActiveId((current) => (current === id ? null : current));
      return { ok: true };
    },
    [profiles, activeId],
  );

  const selectProfile = useCallback((id: string) => {
    if (!profiles.some((profile) => profile.id === id)) return;
    setActiveId(id);
    void saveActiveProfileId(id).catch(() => {
      // The in-memory selection remains usable; the next launch will ask for selection again.
    });
  }, [profiles]);

  const recordLessonResult = useCallback(
    async (lessonId: string, attempt: LessonAttempt): Promise<LessonResultOutcome> => {
      if (!activeRecord) return { ok: false, error: NO_ACTIVE_ERROR };

      const { progress, xpAwarded } = applyLessonResult(
        activeRecord.progress,
        lessonId,
        attempt,
        new Date().toISOString(),
      );
      const saved = await persistProfile({ ...activeRecord, progress });
      if (!saved.ok) return saved;
      return { ok: true, xpAwarded };
    },
    [activeRecord, persistProfile],
  );

  const recordReview = useCallback(
    (coveredWordIds: string[], missedWordIds: string[]) =>
      commitRule((progress, today) => reviewRule(progress, today, coveredWordIds, missedWordIds)),
    [commitRule],
  );

  const claimDailyReward = useCallback(() => commitRule(claimDailyRewardRule), [commitRule]);

  const buyHeart = useCallback(() => commitRule(buyHeartRule), [commitRule]);

  const updateAudioSettings = useCallback(
    async (settings: AudioSettings): Promise<ActionResult> => {
      if (!activeRecord) return { ok: false, error: NO_ACTIVE_ERROR };
      return persistProfile({ ...activeRecord, audio: settings });
    },
    [activeRecord, persistProfile],
  );

  const value = useMemo<ProfileContextValue>(
    () => ({
      ready,
      loadFailed,
      profiles,
      activeProfile,
      createProfile,
      updateProfile,
      deleteProfile,
      selectProfile,
      recordLessonResult,
      recordReview,
      claimDailyReward,
      buyHeart,
      updateAudioSettings,
    }),
    [
      ready,
      loadFailed,
      profiles,
      activeProfile,
      createProfile,
      updateProfile,
      deleteProfile,
      selectProfile,
      recordLessonResult,
      recordReview,
      claimDailyReward,
      buyHeart,
      updateAudioSettings,
    ],
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfiles(): ProfileContextValue {
  const context = useContext(ProfileContext);
  if (!context) throw new Error('useProfiles must be used inside ProfileProvider');
  return context;
}
