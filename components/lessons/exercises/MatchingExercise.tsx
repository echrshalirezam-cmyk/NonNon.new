import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { radius, semanticColors, spacing, typography } from '@/constants/theme';
import type { ExerciseOutcome } from '@/types/lesson';
import { GlowCard } from '@/components/ui/GlowCard';
import { shuffle } from '@/utils/shuffle';
import { fontForText } from '@/utils/fontForText';

type Pair = { en: string; fa: string };

type MatchingExerciseProps = {
  pairs: Pair[];
  onAnswered: (outcome: ExerciseOutcome) => void;
};

type TileState = 'idle' | 'selected' | 'matched';

const tileTone: Record<TileState, { borderColor: string; backgroundColor: string }> = {
  idle: { borderColor: semanticColors.border, backgroundColor: semanticColors.surface },
  selected: { borderColor: semanticColors.primary, backgroundColor: semanticColors.surfaceRaised },
  matched: { borderColor: semanticColors.success, backgroundColor: semanticColors.successTint },
};

export function MatchingExercise({ pairs, onAnswered }: MatchingExerciseProps) {
  const [leftOrder] = useState(() => shuffle(pairs));
  const [rightOrder] = useState(() => shuffle(pairs));
  const [selectedEn, setSelectedEn] = useState<string | null>(null);
  const [matchedEn, setMatchedEn] = useState<string[]>([]);
  const [mistakeKeys, setMistakeKeys] = useState<string[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function finish(finalMistakes: string[]) {
    setDone(true);
    onAnswered({
      correct: finalMistakes.length === 0,
      mistakeKeys: finalMistakes,
      correctAnswer: pairs.map((pair) => `${pair.en} = ${pair.fa}`).join('، '),
    });
  }

  function handleLeft(en: string) {
    if (done || matchedEn.includes(en)) return;
    setSelectedEn(en);
    setNotice(null);
  }

  function handleRight(fa: string) {
    if (done) return;
    const pair = pairs.find((item) => item.fa === fa);
    if (!pair || matchedEn.includes(pair.en)) return;
    if (!selectedEn) {
      setNotice('ابتدا یک واژه انگلیسی را انتخاب کنید.');
      return;
    }
    if (pair.en === selectedEn) {
      const nextMatched = [...matchedEn, pair.en];
      setMatchedEn(nextMatched);
      setSelectedEn(null);
      setNotice(null);
      if (nextMatched.length === pairs.length) finish(mistakeKeys);
      return;
    }
    setMistakeKeys([...mistakeKeys, selectedEn]);
    setSelectedEn(null);
    setNotice('این جفت درست نیست. دوباره امتحان کنید.');
  }

  const matchedFa = pairs.filter((pair) => matchedEn.includes(pair.en)).map((pair) => pair.fa);

  return (
    <View style={styles.wrap}>
      <GlowCard style={styles.card}>
        <Text style={styles.instruction}>هر واژه انگلیسی را به معنی درستش وصل کنید.</Text>
      </GlowCard>
      <View style={styles.columns}>
        <View style={styles.column}>
          {leftOrder.map((pair) => {
            const state: TileState = matchedEn.includes(pair.en)
              ? 'matched'
              : selectedEn === pair.en
                ? 'selected'
                : 'idle';
            return (
              <MatchTile
                key={pair.en}
                label={pair.en}
                state={state}
                onPress={() => handleLeft(pair.en)}
              />
            );
          })}
        </View>
        <View style={styles.column}>
          {rightOrder.map((pair) => (
            <MatchTile
              key={pair.fa}
              label={pair.fa}
              state={matchedFa.includes(pair.fa) ? 'matched' : 'idle'}
              onPress={() => handleRight(pair.fa)}
            />
          ))}
        </View>
      </View>
      {notice ? <Text style={styles.notice}>{notice}</Text> : null}
    </View>
  );
}

type MatchTileProps = {
  label: string;
  state: TileState;
  onPress: () => void;
};

function MatchTile({ label, state, onPress }: MatchTileProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={state === 'matched'}
      onPress={onPress}
      style={({ pressed }) => [styles.tile, tileTone[state], pressed && state !== 'matched' && styles.pressed]}
    >
      <Text style={[styles.tileLabel, { fontFamily: fontForText(label, 'bold') }]} numberOfLines={2}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.sm,
  },
  card: {
    padding: spacing.sm,
  },
  instruction: {
    ...typography.bodyStrong,
    color: semanticColors.textPrimary,
    textAlign: 'right',
  },
  columns: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  column: {
    flex: 1,
    gap: spacing.xs,
  },
  tile: {
    minHeight: 56,
    borderRadius: radius.md,
    borderWidth: 1.5,
    paddingHorizontal: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.85,
  },
  tileLabel: {
    ...typography.bodyStrong,
    color: semanticColors.textPrimary,
    textAlign: 'center',
  },
  notice: {
    ...typography.caption,
    color: semanticColors.textSecondary,
    textAlign: 'right',
  },
});
