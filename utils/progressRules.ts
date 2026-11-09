import { achievementCatalog } from '@/constants/achievements';
import type { ProfileProgress } from '@/types/profile';
import { previousDayKey } from '@/utils/dateKeys';

export const MAX_HEARTS = 5;
export const HEART_PRICE = 15;
export const COINS_PER_CORRECT = 2;

const DAILY_BASE_COINS = 20;
const DAILY_STREAK_STEP = 5;
const DAILY_STREAK_CAP = 7;

export type RuleResult = { ok: true; progress: ProfileProgress } | { ok: false; error: string };

export function createDefaultProgress(): ProfileProgress {
  return {
    xp: 0,
    coins: 0,
    hearts: MAX_HEARTS,
    heartsDate: null,
    learningLevel: 'A1',
    dailyStreak: 0,
    lastActiveDate: null,
    lastRewardDate: null,
    reviewCount: 0,
    completedLessons: [],
    achievements: [],
    lessonHistory: [],
    mistakeHistory: [],
  };
}

function nonNegativeInteger(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0
    ? Math.floor(value)
    : fallback;
}

function stringList(value: unknown): string[] {
  return Array.isArray(value)
    ? [...new Set(value.filter((item): item is string => typeof item === 'string' && item.length > 0))]
    : [];
}

export function normalizeProgress(stored: Partial<ProfileProgress>): ProfileProgress {
  const defaults = createDefaultProgress();
  const raw = stored as Record<string, unknown>;
  const validLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const lessonHistory = Array.isArray(raw.lessonHistory)
    ? raw.lessonHistory.filter((item): item is ProfileProgress['lessonHistory'][number] =>
        typeof item === 'object' &&
        item !== null &&
        typeof (item as ProfileProgress['lessonHistory'][number]).lessonId === 'string' &&
        typeof (item as ProfileProgress['lessonHistory'][number]).completedAt === 'string' &&
        Number.isFinite((item as ProfileProgress['lessonHistory'][number]).correctCount) &&
        Number.isFinite((item as ProfileProgress['lessonHistory'][number]).wrongCount) &&
        Number.isFinite((item as ProfileProgress['lessonHistory'][number]).seconds),
      )
    : [];
  const mistakeHistory = Array.isArray(raw.mistakeHistory)
    ? raw.mistakeHistory.filter((item): item is ProfileProgress['mistakeHistory'][number] =>
        typeof item === 'object' &&
        item !== null &&
        typeof (item as ProfileProgress['mistakeHistory'][number]).wordId === 'string' &&
        typeof (item as ProfileProgress['mistakeHistory'][number]).lessonId === 'string' &&
        typeof (item as ProfileProgress['mistakeHistory'][number]).answeredAt === 'string',
      )
    : [];

  return {
    ...defaults,
    xp: nonNegativeInteger(raw.xp, defaults.xp),
    coins: nonNegativeInteger(raw.coins, defaults.coins),
    hearts: Math.min(MAX_HEARTS, nonNegativeInteger(raw.hearts, defaults.hearts)),
    heartsDate: typeof raw.heartsDate === 'string' ? raw.heartsDate : null,
    learningLevel: validLevels.includes(String(raw.learningLevel))
      ? (raw.learningLevel as ProfileProgress['learningLevel'])
      : defaults.learningLevel,
    dailyStreak: nonNegativeInteger(raw.dailyStreak, defaults.dailyStreak),
    lastActiveDate: typeof raw.lastActiveDate === 'string' ? raw.lastActiveDate : null,
    lastRewardDate: typeof raw.lastRewardDate === 'string' ? raw.lastRewardDate : null,
    reviewCount: nonNegativeInteger(raw.reviewCount, defaults.reviewCount),
    completedLessons: stringList(raw.completedLessons),
    achievements: stringList(raw.achievements),
    lessonHistory,
    mistakeHistory,
  };
}

export function currentStreak(progress: ProfileProgress, today: string): number {
  const last = progress.lastActiveDate;
  if (last === today || last === previousDayKey(today)) return progress.dailyStreak;
  return 0;
}

export function refreshDaily(progress: ProfileProgress, today: string): ProfileProgress {
  if (progress.heartsDate === today) return progress;
  return { ...progress, hearts: MAX_HEARTS, heartsDate: today };
}

export function markActivity(progress: ProfileProgress, today: string): ProfileProgress {
  if (progress.lastActiveDate === today) return progress;
  return { ...progress, dailyStreak: currentStreak(progress, today) + 1, lastActiveDate: today };
}

function dailyRewardAmount(streak: number): number {
  return DAILY_BASE_COINS + DAILY_STREAK_STEP * Math.min(streak, DAILY_STREAK_CAP);
}

export function previewDailyReward(progress: ProfileProgress, today: string): number {
  return dailyRewardAmount(markActivity(progress, today).dailyStreak);
}

export function claimDailyRewardRule(progress: ProfileProgress, today: string): RuleResult {
  if (progress.lastRewardDate === today) {
    return { ok: false, error: 'جایزه امروز قبلاً دریافت شده است.' };
  }
  const active = markActivity(progress, today);
  const amount = dailyRewardAmount(active.dailyStreak);
  const next = { ...active, coins: active.coins + amount, lastRewardDate: today };
  return { ok: true, progress: { ...next, achievements: unlockedAchievementIds(next) } };
}

export function buyHeartRule(progress: ProfileProgress, today: string): RuleResult {
  const base = refreshDaily(progress, today);
  if (base.hearts >= MAX_HEARTS) return { ok: false, error: 'قلب‌های شما پر است.' };
  if (base.coins < HEART_PRICE) return { ok: false, error: 'سکه کافی برای خرید قلب ندارید.' };
  return {
    ok: true,
    progress: { ...base, hearts: base.hearts + 1, coins: base.coins - HEART_PRICE },
  };
}

export function reviewRule(
  progress: ProfileProgress,
  today: string,
  coveredWordIds: string[],
  missedWordIds: string[],
): RuleResult {
  const missed = new Set(missedWordIds);
  const resolved = new Set(coveredWordIds.filter((wordId) => !missed.has(wordId)));
  const active = markActivity(progress, today);
  const next = {
    ...active,
    reviewCount: active.reviewCount + 1,
    mistakeHistory: active.mistakeHistory.filter((record) => !resolved.has(record.wordId)),
  };
  return { ok: true, progress: { ...next, achievements: unlockedAchievementIds(next) } };
}

export function unlockedAchievementIds(progress: ProfileProgress): string[] {
  const met = achievementCatalog.filter((item) => item.metric(progress) >= item.target).map((item) => item.id);
  return [...new Set([...progress.achievements, ...met])];
}
