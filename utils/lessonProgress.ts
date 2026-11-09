import type { CefrCode } from '@/constants/levels';
import { orderedLessons } from '@/content/lessons';
import type { LessonAttempt } from '@/types/lesson';
import type { LessonRecord, MistakeRecord, ProfileProgress } from '@/types/profile';
import { COINS_PER_CORRECT, markActivity, refreshDaily, unlockedAchievementIds } from '@/utils/progressRules';
import { dateKey } from '@/utils/dateKeys';

const XP_PER_CORRECT = 5;
const PERFECT_BONUS_XP = 10;
const HISTORY_LIMIT = 100;
const MISTAKE_LIMIT = 200;

export type LessonStatus = 'completed' | 'unlocked' | 'locked';

function indexOfLesson(lessonId: string): number {
  return orderedLessons.findIndex((entry) => entry.lesson.id === lessonId);
}

export function getLessonStatus(lessonId: string, completed: string[]): LessonStatus {
  if (completed.includes(lessonId)) return 'completed';
  const index = indexOfLesson(lessonId);
  if (index < 0) return 'locked';
  if (index === 0) return 'unlocked';
  return completed.includes(orderedLessons[index - 1].lesson.id) ? 'unlocked' : 'locked';
}

export function getLevelProgress(level: CefrCode, completed: string[]): { done: number; total: number } {
  const lessons = orderedLessons.filter((entry) => entry.level === level);
  const done = lessons.filter((entry) => completed.includes(entry.lesson.id)).length;
  return { done, total: lessons.length };
}

function getLearningLevel(completed: string[], fallback: CefrCode): CefrCode {
  const next = orderedLessons.find((entry) => !completed.includes(entry.lesson.id));
  return next ? next.level : fallback;
}

export function calculateXp(correct: number, wrong: number): number {
  return correct * XP_PER_CORRECT + (wrong === 0 ? PERFECT_BONUS_XP : 0);
}

export function applyLessonResult(
  progress: ProfileProgress,
  lessonId: string,
  attempt: LessonAttempt,
  completedAt: string,
): { progress: ProfileProgress; xpAwarded: number } {
  const today = dateKey(new Date(completedAt));
  const base = refreshDaily(progress, today);
  const firstCompletion = !base.completedLessons.includes(lessonId);
  const xpAwarded = firstCompletion ? calculateXp(attempt.correct, attempt.wrong) : 0;
  const completedLessons = firstCompletion ? [...base.completedLessons, lessonId] : base.completedLessons;

  const record: LessonRecord = {
    lessonId,
    completedAt,
    correctCount: attempt.correct,
    wrongCount: attempt.wrong,
    seconds: attempt.seconds,
  };
  const mistakes: MistakeRecord[] = attempt.mistakeKeys.map((wordId) => ({
    wordId,
    lessonId,
    answeredAt: completedAt,
  }));

  const active = markActivity(base, today);
  const next: ProfileProgress = {
    ...active,
    xp: active.xp + xpAwarded,
    coins: active.coins + attempt.correct * COINS_PER_CORRECT,
    hearts: Math.max(0, active.hearts - attempt.wrong),
    completedLessons,
    learningLevel: getLearningLevel(completedLessons, base.learningLevel),
    lessonHistory: [...base.lessonHistory, record].slice(-HISTORY_LIMIT),
    mistakeHistory: [...base.mistakeHistory, ...mistakes].slice(-MISTAKE_LIMIT),
  };
  return {
    xpAwarded,
    progress: { ...next, achievements: unlockedAchievementIds(next) },
  };
}
