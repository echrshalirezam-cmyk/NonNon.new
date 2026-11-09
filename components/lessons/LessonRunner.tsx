import { useEffect, useMemo, useRef, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import * as Speech from 'expo-speech';
import { spacing } from '@/constants/theme';
import type { Exercise, ExerciseOutcome, GrammarNote, Lesson, LessonAttempt, Word } from '@/types/lesson';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { FeedbackBar } from '@/components/lessons/FeedbackBar';
import { GrammarStep } from '@/components/lessons/GrammarStep';
import { VocabularyStep } from '@/components/lessons/VocabularyStep';
import { ChoiceExercise } from '@/components/lessons/exercises/ChoiceExercise';
import { MatchingExercise } from '@/components/lessons/exercises/MatchingExercise';
import { OrderingExercise } from '@/components/lessons/exercises/OrderingExercise';

type LessonRunnerProps = {
  lesson: Lesson;
  busy: boolean;
  onComplete: (attempt: LessonAttempt) => void;
};

type Step =
  | { kind: 'vocabulary'; words: Word[] }
  | { kind: 'grammar'; note: GrammarNote }
  | { kind: 'exercise'; exercise: Exercise };

const emptyTally: LessonAttempt = { correct: 0, wrong: 0, seconds: 0, mistakeKeys: [] };

function buildSteps(lesson: Lesson): Step[] {
  const steps: Step[] = [];
  if (lesson.words.length > 0) steps.push({ kind: 'vocabulary', words: lesson.words });
  if (lesson.grammar) steps.push({ kind: 'grammar', note: lesson.grammar });
  for (const exercise of lesson.exercises) steps.push({ kind: 'exercise', exercise });
  return steps;
}

export function LessonRunner({ lesson, busy, onComplete }: LessonRunnerProps) {
  const steps = useMemo(() => buildSteps(lesson), [lesson]);
  const [stepIndex, setStepIndex] = useState(0);
  const [outcome, setOutcome] = useState<ExerciseOutcome | null>(null);
  const [tally, setTally] = useState<LessonAttempt>(emptyTally);
  const startedAt = useRef(Date.now());

  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  const step = steps[stepIndex];
  const isLast = stepIndex === steps.length - 1;

  function handleAnswered(result: ExerciseOutcome) {
    if (outcome || busy) return;
    setOutcome(result);
    setTally((current) => ({
      ...current,
      correct: current.correct + (result.correct ? 1 : 0),
      wrong: current.wrong + (result.correct ? 0 : 1),
      mistakeKeys: [...current.mistakeKeys, ...result.mistakeKeys],
    }));
  }

  function handleContinue() {
    if (busy || !step || steps.length === 0) return;
    if (!isLast) {
      setStepIndex((current) => current + 1);
      setOutcome(null);
      return;
    }
    onComplete({ ...tally, seconds: Math.round((Date.now() - startedAt.current) / 1000) });
  }

  function renderExercise(exercise: Exercise) {
    switch (exercise.type) {
      case 'choice':
      case 'translation':
        return <ChoiceExercise key={stepIndex} exercise={exercise} onAnswered={handleAnswered} />;
      case 'matching':
        return <MatchingExercise key={stepIndex} pairs={exercise.pairs} onAnswered={handleAnswered} />;
      case 'ordering':
        return (
          <OrderingExercise
            key={stepIndex}
            sentence={exercise.sentence}
            hint={exercise.hint}
            onAnswered={handleAnswered}
          />
        );
    }
  }

  function renderStep() {
    if (!step) return null;
    if (step.kind === 'vocabulary') {
      return <VocabularyStep words={step.words} onNext={handleContinue} />;
    }
    if (step.kind === 'grammar') {
      return <GrammarStep note={step.note} onNext={handleContinue} />;
    }
    return renderExercise(step.exercise);
  }

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <ProgressBar progress={steps.length === 0 ? 1 : (stepIndex + 1) / steps.length} height={8} />
      {renderStep()}
      {outcome ? (
        <FeedbackBar
          outcome={outcome}
          continueLabel={isLast ? 'پایان درس' : 'ادامه'}
          busy={busy}
          onContinue={handleContinue}
        />
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.lg,
    gap: spacing.sm,
  },
});
