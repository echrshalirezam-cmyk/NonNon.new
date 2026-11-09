import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { radius, semanticColors, spacing, typography } from '@/constants/theme';
import type { ExerciseOutcome } from '@/types/lesson';
import { GlowCard } from '@/components/ui/GlowCard';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { shuffle } from '@/utils/shuffle';
import { fontForText } from '@/utils/fontForText';

type OrderingExerciseProps = {
  sentence: string;
  hint: string;
  onAnswered: (outcome: ExerciseOutcome) => void;
};

function shuffledIndexes(length: number): number[] {
  const indexes = Array.from({ length }, (_, index) => index);
  const shuffled = shuffle(indexes);
  const unchanged = shuffled.every((value, index) => value === index);
  return length > 1 && unchanged ? [...shuffled.slice(1), shuffled[0]] : shuffled;
}

export function OrderingExercise({ sentence, hint, onAnswered }: OrderingExerciseProps) {
  const tokens = sentence.split(' ');
  const [bank] = useState(() => shuffledIndexes(tokens.length));
  const [picked, setPicked] = useState<number[]>([]);
  const [result, setResult] = useState<boolean | null>(null);

  const available = bank.filter((index) => !picked.includes(index));
  const checked = result !== null;

  function handleCheck() {
    if (checked || picked.length !== tokens.length) return;
    const built = picked.map((index) => tokens[index]).join(' ');
    const correct = built === sentence;
    setResult(correct);
    onAnswered({ correct, mistakeKeys: correct ? [] : [sentence], correctAnswer: sentence, audioText: sentence });
  }

  return (
    <View style={styles.wrap}>
      <GlowCard style={styles.card}>
        <Text style={styles.instruction}>جمله را با کلمه‌های زیر به ترتیب درست بچینید.</Text>
        <Text style={[styles.hint, { fontFamily: fontForText(hint, 'regular') }]}>{`معنی: ${hint}`}</Text>
      </GlowCard>

      <View style={styles.answerArea}>
        {picked.length === 0 ? <Text style={styles.placeholder}>کلمه‌ها اینجا قرار می‌گیرند</Text> : null}
        {picked.map((tokenIndex, position) => (
          <WordChip
            key={`${tokenIndex}-${position}`}
            label={tokens[tokenIndex]}
            tone={result === null ? 'idle' : result ? 'correct' : 'wrong'}
            disabled={checked}
            onPress={() => setPicked(picked.filter((_, current) => current !== position))}
          />
        ))}
      </View>

      <View style={styles.bank}>
        {available.map((tokenIndex) => (
          <WordChip
            key={tokenIndex}
            label={tokens[tokenIndex]}
            tone="idle"
            disabled={checked}
            onPress={() => setPicked([...picked, tokenIndex])}
          />
        ))}
      </View>

      <PrimaryButton
        label="بررسی"
        onPress={handleCheck}
        disabled={checked || picked.length !== tokens.length}
      />
    </View>
  );
}

type WordChipProps = {
  label: string;
  tone: 'idle' | 'correct' | 'wrong';
  disabled: boolean;
  onPress: () => void;
};

const chipTone = {
  idle: { borderColor: semanticColors.border, backgroundColor: semanticColors.surfaceRaised },
  correct: { borderColor: semanticColors.success, backgroundColor: semanticColors.successTint },
  wrong: { borderColor: semanticColors.danger, backgroundColor: semanticColors.dangerTint },
} as const;

function WordChip({ label, tone, disabled, onPress }: WordChipProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.chip, chipTone[tone], pressed && !disabled && styles.pressed]}
    >
      <Text style={[styles.chipLabel, { fontFamily: fontForText(label, 'bold') }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.sm,
  },
  card: {
    padding: spacing.sm,
    gap: spacing.xxs,
  },
  instruction: {
    ...typography.bodyStrong,
    color: semanticColors.textPrimary,
    textAlign: 'right',
  },
  hint: {
    ...typography.caption,
    color: semanticColors.textSecondary,
    textAlign: 'right',
  },
  answerArea: {
    minHeight: 72,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: spacing.xs,
    padding: spacing.xs,
    borderRadius: radius.md,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: semanticColors.border,
  },
  placeholder: {
    ...typography.caption,
    color: semanticColors.textMuted,
  },
  bank: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  chip: {
    minHeight: 44,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    paddingHorizontal: spacing.sm,
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.8,
  },
  chipLabel: {
    ...typography.bodyStrong,
    color: semanticColors.textPrimary,
  },
});
