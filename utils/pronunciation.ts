import { ExpoSpeechRecognitionModule } from 'expo-speech-recognition';

export type ListenResult =
  | { ok: true; transcript: string }
  | { ok: false; reason: 'unsupported' | 'denied' | 'silent' | 'failed' };

type Subscription = { remove: () => void };

async function ensureMicrophonePermission(): Promise<boolean> {
  const current = await ExpoSpeechRecognitionModule.getPermissionsAsync();
  if (current.granted) return true;
  const requested = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
  return requested.granted;
}

export async function listenForWord(): Promise<ListenResult> {
  try {
    if (!ExpoSpeechRecognitionModule.isRecognitionAvailable()) {
      return { ok: false, reason: 'unsupported' };
    }
    if (!(await ensureMicrophonePermission())) {
      return { ok: false, reason: 'denied' };
    }
  } catch {
    return { ok: false, reason: 'failed' };
  }

  return new Promise((resolve) => {
    const subscriptions: Subscription[] = [];
    let settled = false;

    const finish = (result: ListenResult) => {
      if (settled) return;
      settled = true;
      subscriptions.forEach((subscription) => subscription.remove());
      resolve(result);
    };

    subscriptions.push(
      ExpoSpeechRecognitionModule.addListener('result', (event) => {
        const transcript = event.results[0]?.transcript.trim() ?? '';
        finish(transcript ? { ok: true, transcript } : { ok: false, reason: 'silent' });
      }),
      ExpoSpeechRecognitionModule.addListener('nomatch', () => finish({ ok: false, reason: 'silent' })),
      ExpoSpeechRecognitionModule.addListener('error', (event) => {
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          finish({ ok: false, reason: 'denied' });
        } else if (event.error === 'no-speech') {
          finish({ ok: false, reason: 'silent' });
        } else {
          finish({ ok: false, reason: 'failed' });
        }
      }),
      ExpoSpeechRecognitionModule.addListener('end', () => finish({ ok: false, reason: 'silent' })),
    );

    try {
      ExpoSpeechRecognitionModule.start({ lang: 'en-US', interimResults: false, maxAlternatives: 1 });
    } catch {
      finish({ ok: false, reason: 'failed' });
    }
  });
}

export function matchesWord(transcript: string, word: string): boolean {
  const normalize = (value: string) => value.toLowerCase().replace(/[^a-z\s]/g, '').trim();
  return normalize(transcript).split(/\s+/).includes(normalize(word));
}
