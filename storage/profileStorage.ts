import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Profile } from '@/types/profile';
import { normalizeProgress } from '@/utils/progressRules';

const INDEX_KEY = 'nonnon.profileIds';
const ACTIVE_PROFILE_KEY = 'nonnon.activeProfileId';
const profileKey = (id: string) => `nonnon.profile.${id}`;

function isProfile(value: unknown): value is Profile {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Partial<Profile>;
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.name === 'string' &&
    typeof candidate.avatarId === 'string' &&
    typeof candidate.createdAt === 'string' &&
    typeof candidate.progress === 'object' &&
    candidate.progress !== null
  );
}

export async function loadActiveProfileId(): Promise<string | null> {
  return AsyncStorage.getItem(ACTIVE_PROFILE_KEY);
}

export async function saveActiveProfileId(id: string): Promise<void> {
  await AsyncStorage.setItem(ACTIVE_PROFILE_KEY, id);
}

export async function clearActiveProfileId(): Promise<void> {
  await AsyncStorage.removeItem(ACTIVE_PROFILE_KEY);
}

export async function loadProfiles(): Promise<Profile[]> {
  const indexRaw = await AsyncStorage.getItem(INDEX_KEY);
  if (!indexRaw) return [];

  const ids = JSON.parse(indexRaw) as unknown;
  if (!Array.isArray(ids)) throw new Error('Invalid profile index');
  const validIds = [...new Set(ids.filter((id): id is string => typeof id === 'string' && id.length > 0))];
  if (validIds.length === 0) return [];

  const entries = await AsyncStorage.multiGet(validIds.map(profileKey));
  const profiles: Profile[] = [];
  for (const [key, raw] of entries) {
    if (!raw || !key) continue;
    try {
      const parsed: unknown = JSON.parse(raw);
      const expectedId = validIds.find((id) => profileKey(id) === key);
      if (!expectedId || !isProfile(parsed) || parsed.id !== expectedId) continue;
      profiles.push({ ...parsed, progress: normalizeProgress(parsed.progress) });
    } catch {
      // Ignore a single damaged profile instead of preventing other profiles from loading.
    }
  }
  return profiles;
}

export async function saveProfile(profile: Profile, allIds: string[]): Promise<void> {
  const ids = allIds.includes(profile.id) ? allIds : [...allIds, profile.id];
  await AsyncStorage.multiSet([
    [profileKey(profile.id), JSON.stringify(profile)],
    [INDEX_KEY, JSON.stringify(ids)],
  ]);
}

export async function removeProfile(id: string, allIds: string[]): Promise<void> {
  const ids = allIds.filter((existing) => existing !== id);
  await AsyncStorage.setItem(INDEX_KEY, JSON.stringify(ids));
  await AsyncStorage.removeItem(profileKey(id));
}
