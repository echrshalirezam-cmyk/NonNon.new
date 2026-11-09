import { StyleSheet, Text, View } from 'react-native';
import { Check, X } from 'lucide-react-native';
import { radius, semanticColors, spacing, typography } from '@/constants/theme';
import type { ExerciseOutcome } from '@/types/lesson';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SpeakButton } from '@/components/lessons/SpeakButton';
import { fontForText } from '@/utils/fontForText';

type FeedbackBarProps = {
  outcome: ExerciseOutcome;
  continueLabel: string;
  busy: boolean;
  onContinue: () => void;
};

export function FeedbackBar({ outcome, continueLabel, busy, onContinue }: FeedbackBarProps) {
  const title = outcome.correct ? 'درست است!' : 'نادرست';
  const tone = outcome.correct ? semanticColors.success : semanticColors.danger;
  const tint = outcome.correct ? semanticColors.successTint : semanticColors.dangerTint;

  return (
    <View accessibilityLiveRegion="polite" style={[styles.card, { borderColor: tone, backgroundColor: tint }]}>
      <View style={styles.header}>
        {outcome.correct ? (
          <Check size={22} color={tone} strokeWidth={2.8} />
        ) : (
          <X size={22} color={tone} strokeWidth={2.8} />
        )}
        <Text style={[styles.title, { color: tone, fontFamily: fontForText(title, 'bold') }]}>{title}</Text>
      </View>
      {outcome.correct ? null : (
        <View style={styles.answerRow}>
          <Text style={[styles.answer, { fontFamily: fontForText(outcome.correctAnswer, 'regular') }]}>
            {`پاسخ درست: ${outcome.correctAnswer}`}
          </Text>
          {outcome.audioText ? <SpeakButton text={outcome.audioText} size={40} /> : null}
        </View>
      )}
      {outcome.correct && outcome.audioText ? <SpeakButton text={outcome.audioText} size={40} /> : null}
      <PrimaryButton label={continueLabel} onPress={onContinue} disabled={busy} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    borderWidth: 1.5,
    padding: spacing.sm,
    gap: spacing.xs,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  title: {
    ...typography.heading,
  },
  answerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  answer: {
    ...typography.body,
    flex: 1,
    color: semanticColors.textPrimary,
    textAlign: 'right',
  },
});
