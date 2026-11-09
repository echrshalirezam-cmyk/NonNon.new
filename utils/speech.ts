import * as Speech from 'expo-speech';
import type { AudioSettings } from '@/types/profile';

const ENGLISH_LANGUAGE = 'en-US';

export type EnglishVoice = { id: string; name: string };

export async function loadEnglishVoices(): Promise<EnglishVoice[]> {
  const voices = await Speech.getAvailableVoicesAsync();
  return voices
    .filter((voice) => voice.language.toLowerCase().startsWith('en'))
    .map((voice) => ({ id: voice.identifier, name: voice.name }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function speakText(text: string, settings: AudioSettings, onError: () => void): void {
  Speech.stop();
  if (!settings.enabled) return;
  const speak = (voice: string | undefined, canFallback: boolean) => {
    try {
      Speech.speak(text, {
        language: ENGLISH_LANGUAGE,
        rate: settings.rate,
        voice,
        onError: () => {
          if (voice && canFallback) {
            speak(undefined, false);
          } else {
            onError();
          }
        },
      });
    } catch {
      onError();
    }
  };
  speak(settings.voiceId ?? undefined, true);
}
