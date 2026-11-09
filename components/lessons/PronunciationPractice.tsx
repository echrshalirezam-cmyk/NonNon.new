import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Mic } from 'lucide-react-native';
import { radius, semanticColors, spacing, typography } from '@/constants/theme';
import { listenForWord, matchesWord, type ListenResult } from '@/utils/pronunciation';
import { fontForText } from '@/utils/fontForText';

type PronunciationPracticeProps = {
  word: string;
};

type Feedback = { tone: 'success' | 'warning' | 'danger'; text: string };

const toneColor = {
  success: semanticColors.success,
  warning: semanticColors.accent,
  danger: semanticColors.danger,
} as const;

function describe(word: string, result: ListenResult): Feedback {
  if (!result.ok) {
    const messages: Record<Exclude<ListenResult, { ok: true }>['reason'], string> = {
      unsupported: 'تمرین تلفظ روی این دستگاه در دسترس نیست.',
      denied: 'دسترسی میکروفون داده نشد.',
      silent: 'صدایی شنیده نشد. دوباره تلاش کنید.',
      failed: 'تشخیص گفتار انجام نشد.',
    };
    return { tone: result.reason === 'unsupported' ? 'warning' : 'danger', text: messages[result.reason] };
  }
  if (matchesWord(result.transcript, word)) {
    return { tone: 'success', text: 'عالی! تلفظ درست بود.' };
  }
  return { tone: 'warning', text: `شنیده شد: "${result.transcript}". دوباره تلاش کنید.` };
}

export function PronunciationPractice({ word }: PronunciationPracticeProps) {
  const [listening, setListening] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  async function handlePress() {
    if (listening) return;
    setListening(true);
    setFeedback(null);
    const result = await listenForWord();
    setListening(false);
    setFeedback(describe(word, result));
  }

  return (
    <View style={styles.wrap}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Practice pronouncing ${word}`}
        disabled={listening}
        onPress={handlePress}
        style={({ pressed }) => [styles.button, pressed && !listening && styles.pressed]}
      >
        <Mic size={14} color={semanticColors.textSecondary} strokeWidth={2.4} />
        <Text style={styles.buttonLabel}>{listening ? 'در حال شنیدن…' : 'تمرین تلفظ'}</Text>
      </Pressable>
      {feedback ? (
        <Text style={[styles.feedback, { color: toneColor[feedback.tone], fontFamily: fontForText(feedback.text, 'regular') }]}>
          {feedback.text}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.xxs,
    alignItems: 'flex-start',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xxs,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: semanticColors.border,
    backgroundColor: semanticColors.surfaceRaised,
  },
  pressed: {
    opacity: 0.8,
  },
  buttonLabel: {
    ...typography.label,
    color: semanticColors.textSecondary,
  },
  feedback: {
    ...typography.caption,
    textAlign: 'right',
  },
});
