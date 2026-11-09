import { orderedLessons } from '@/content/lessons';
import type { Exercise, Lesson } from '@/types/lesson';
import type { ProfileProgress } from '@/types/profile';
import { shuffle } from '@/utils/shuffle';

const REVIEW_EXERCISE_LIMIT = 15;

export function exerciseKeys(exercise: Exercise): string[] {
  switch (exercise.type) {
    case 'choice':
      return [exercise.audio ?? exercise.prompt];
    case 'translation':
      return [exercise.choices[exercise.answer]];
    case 'matching':
      return exercise.pairs.map((pair) => pair.en);
    case 'ordering':
      return [exercise.sentence];
  }
}

export function openMistakeWordIds(progress: ProfileProgress): string[] {
  return [...new Set(progress.mistakeHistory.map((record) => record.wordId))];
}

export function buildReviewLesson(
  openWordIds: string[],
): { lesson: Lesson; coveredWordIds: string[] } | null {
  const wanted = new Set(openWordIds);
  const matches = orderedLessons
    .flatMap((entry) => entry.lesson.exercises)
    .filter((exercise) => exerciseKeys(exercise).some((key) => wanted.has(key)));
  if (matches.length === 0) return null;

  const exercises = shuffle(matches).slice(0, REVIEW_EXERCISE_LIMIT);
  const coveredWordIds = [
    ...new Set(exercises.flatMap(exerciseKeys).filter((key) => wanted.has(key))),
  ];
  return {
    lesson: { id: 'review', title: 'مرور اشتباهات', words: [], grammar: null, exercises },
    coveredWordIds,
  };
}
