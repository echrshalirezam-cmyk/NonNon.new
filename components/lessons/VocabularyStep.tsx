import { StyleSheet, Text, View } from 'react-native';
import { semanticColors, spacing, typography } from '@/constants/theme';
import type { Word } from '@/types/lesson';
import { GlowCard } from '@/components/ui/GlowCard';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SpeakButton } from '@/components/lessons/SpeakButton';
import { PronunciationPractice } from '@/components/lessons/PronunciationPractice';
import { fontForText } from '@/utils/fontForText';

type VocabularyStepProps = {
  words: Word[];
  onNext: () => void;
};

export function VocabularyStep({ words, onNext }: VocabularyStepProps) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.intro}>واژه‌های این درس را بشنوید و تکرار کنید.</Text>
      <GlowCard style={styles.card}>
        {words.map((word, index) => (
          <View key={word.en} style={[styles.row, index > 0 && styles.divider]}>
            <SpeakButton text={word.en} />
            <View style={styles.texts}>
              <Text style={styles.en}>{word.en}</Text>
              <Text style={styles.ipa}>{word.ipa}</Text>
              <PronunciationPractice word={word.en} />
            </View>
            <Text style={[styles.fa, { fontFamily: fontForText(word.fa, 'bold') }]}>{word.fa}</Text>
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
  intro: {
    ...typography.body,
    color: semanticColors.textSecondary,
    textAlign: 'right',
  },
  card: {
    padding: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    minHeight: 64,
    paddingHorizontal: spacing.xs,
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: semanticColors.border,
  },
  texts: {
    flex: 1,
  },
  en: {
    ...typography.bodyStrong,
    color: semanticColors.textPrimary,
  },
  ipa: {
    ...typography.caption,
    color: semanticColors.textMuted,
  },
  fa: {
    ...typography.bodyStrong,
    color: semanticColors.textPrimary,
    textAlign: 'right',
  },
});
