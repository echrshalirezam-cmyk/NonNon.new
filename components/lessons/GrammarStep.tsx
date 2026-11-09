import { StyleSheet, Text, View } from 'react-native';
import { semanticColors, spacing, typography } from '@/constants/theme';
import type { GrammarNote } from '@/types/lesson';
import { GlowCard } from '@/components/ui/GlowCard';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SpeakButton } from '@/components/lessons/SpeakButton';
import { fontForText } from '@/utils/fontForText';

type GrammarStepProps = {
  note: GrammarNote;
  onNext: () => void;
};

export function GrammarStep({ note, onNext }: GrammarStepProps) {
  return (
    <View style={styles.wrap}>
      <GlowCard style={styles.card}>
        <Text style={[styles.title, { fontFamily: fontForText(note.title, 'bold') }]}>{note.title}</Text>
        <Text style={[styles.rule, { fontFamily: fontForText(note.rule, 'regular') }]}>{note.rule}</Text>
      </GlowCard>
      <GlowCard style={styles.card}>
        {note.examples.map((example, index) => (
          <View key={example.en} style={[styles.example, index > 0 && styles.divider]}>
            <SpeakButton text={example.en} size={36} />
            <View style={styles.texts}>
              <Text style={styles.en}>{example.en}</Text>
              <Text style={[styles.fa, { fontFamily: fontForText(example.fa, 'regular') }]}>{example.fa}</Text>
            </View>
          </View>
        ))}
      </GlowCard>
      <PrimaryButton label="ادامه" onPress={onNext} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.sm,
  },
  card: {
    gap: spacing.xs,
  },
  title: {
    ...typography.heading,
    color: semanticColors.textPrimary,
    textAlign: 'right',
  },
  rule: {
    ...typography.body,
    color: semanticColors.textSecondary,
    textAlign: 'right',
  },
  example: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.xs,
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: semanticColors.border,
  },
  texts: {
    flex: 1,
    gap: 2,
  },
  en: {
    ...typography.bodyStrong,
    color: semanticColors.textPrimary,
  },
  fa: {
    ...typography.caption,
    color: semanticColors.textSecondary,
    textAlign: 'right',
  },
});
