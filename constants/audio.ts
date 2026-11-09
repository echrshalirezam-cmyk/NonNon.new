import type { AudioSettings } from '@/types/profile';

export const DEFAULT_AUDIO_SETTINGS: AudioSettings = {
  enabled: true,
  voiceId: null,
  rate: 0.85,
};

export const SPEED_OPTIONS: { label: string; rate: number }[] = [
  { label: 'آهسته', rate: 0.6 },
  { label: 'معمولی', rate: 0.85 },
  { label: 'سریع', rate: 1 },
];

export const PREVIEW_TEXT = 'Hello! How are you today?';
