import { DEFAULT_AUDIO_SETTINGS } from '@/constants/audio';
import { useProfiles } from '@/context/ProfileContext';
import type { AudioSettings } from '@/types/profile';

export function useAudioSettings(): AudioSettings {
  const { activeProfile } = useProfiles();
  return { ...DEFAULT_AUDIO_SETTINGS, ...activeProfile?.audio };
}
