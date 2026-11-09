import type { ProfileProgress } from '@/types/profile';
import { achievementCatalog } from '@/constants/achievements';
import { openMistakeWordIds } from '@/utils/mistakeReview';
import { currentStreak } from '@/utils/progressRules';

export type ProfileStats = {
  lessonsCompleted: number;
  accuracyPercent: number;
  studyMinutes: number;
  openMistakes: number;
  streak: number;
  achievementsUnlocked: number;
  achievementsTotal: number;
};

export function computeStats(progress: ProfileProgress, today: string): ProfileStats {
  const correct = progress.lessonHistory.reduce((sum, record) => sum + record.correctCount, 0);
  const wrong = progress.lessonHistory.reduce((sum, record) => sum + record.wrongCount, 0);
  const seconds = progress.lessonHistory.reduce((sum, record) => sum + record.seconds, 0);
  const answered = correct + wrong;

  return {
    lessonsCompleted: progress.completedLessons.length,
    accuracyPercent: answered === 0 ? 0 : Math.round((correct / answered) * 100),
    studyMinutes: Math.round(seconds / 60),
    openMistakes: openMistakeWordIds(progress).length,
    streak: currentStreak(progress, today),
    achievementsUnlocked: progress.achievements.length,
    achievementsTotal: achievementCatalog.length,
  };
}
