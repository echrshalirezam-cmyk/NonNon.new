import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { semanticColors, spacing, typography } from '@/constants/theme';
import type { Exercise, ExerciseOutcome } from '@/types/lesson';
import { GlowCard } from '@/components/ui/GlowCard';
import { ChoiceButton, type ChoiceState } from '@/components/lessons/ChoiceButton';
import { SpeakButton } from '@/components/lessons/SpeakButton';
import { useAudioSettings } from '@/hooks/useAudioSettings';
import { speakText } from '@/utils/speech';
import { fontForText } from '@/utils/fontForText';

type ChoiceExerciseData = Extract<Exercise, { type: 'choice' | 'translation' }>;

type ChoiceExerciseProps = {
  exercise: ChoiceExerciseData;
  onAnswered: (outcome: ExerciseOutcome) => void;
};

export function ChoiceExercise({ exercise, onAnswered }: ChoiceExerciseProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const settings = useAudioSettings();
  const audio = exercise.type === 'choice' ? exercise.audio : undefined;
  const answered = selected !== null;

  useEffect(() => {
    if (audio) speakText(audio, settings, () => undefined);
    // Autoplay runs once per exercise; the speaker button handles replays.
  }, [audio]);

  function stateFor(index: number): ChoiceState {
    if (!answered) return 'idle';
    if (index === exercise.answer) return 'correct';
    return index === selected ? 'wrong' : 'idle';
  }

  function handlePress(index: number) {
    if (answered) return;
    setSelected(index);
    const correct = index === exercise.answer;
    const correctAnswer = exercise.choices[exercise.answer];
    const itemKey = audio ?? (exercise.type === 'translation' ? correctAnswer : exercise.prompt);
    onAnswered({
      correct,
      mistakeKeys: correct ? [] : [itemKey],
      correctAnswer,
      audioText: exercise.type === 'translation' ? correctAnswer : undefined,
    });
  }

  return (
    <View style={styles.wrap}>
      <GlowCard style={styles.card}>
        <View style={styles.promptRow}>
          {audio ? <SpeakButton text={audio} /> : null}
          <Text style={[styles.prompt, { fontFamily: fontForText(exercise.prompt, 'bold') }]}>
            {exercise.prompt}
          </Text>
        </View>
      </GlowCard>
      <View style={styles.choices}>
        {exercise.choices.map((label, index) => (
          <ChoiceButton
            key={index}
            label={label}
            state={stateFor(index)}
            disabled={answered}
            onPress={() => handlePress(index)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.sm,
  },
  card: {
    padding: spacing.sm,
  },
  promptRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  prompt: {
    ...typography.heading,
    flex: 1,
    color: semanticColors.textPrimary,
    textAlign: 'right',
  },
  choices: {
    gap: spacing.xs,
  },
});
