import {
  BadgeCheck,
  BookOpen,
  Flame,
  Footprints,
  RefreshCw,
  Star,
  Target,
  Zap,
  type LucideIcon,
} from 'lucide-react-native';
import type { ProfileProgress } from '@/types/profile';

export type AchievementDefinition = {
  id: string;
  title: string;
  icon: LucideIcon;
  target: number;
  metric: (progress: ProfileProgress) => number;
};

export const achievementCatalog: AchievementDefinition[] = [
  {
    id: 'first-lesson',
    title: 'اولین قدم',
    icon: Footprints,
    target: 1,
    metric: (progress) => progress.completedLessons.length,
  },
  {
    id: 'lessons-5',
    title: 'پنج درس',
    icon: BookOpen,
    target: 5,
    metric: (progress) => progress.completedLessons.length,
  },
  {
    id: 'lessons-20',
    title: 'بیست درس',
    icon: Target,
    target: 20,
    metric: (progress) => progress.completedLessons.length,
  },
  {
    id: 'perfect-3',
    title: 'سه درس بی‌نقص',
    icon: BadgeCheck,
    target: 3,
    metric: (progress) =>
      progress.lessonHistory.filter((record) => record.wrongCount === 0 && record.correctCount > 0).length,
  },
  {
    id: 'xp-100',
    title: 'صد امتیاز',
    icon: Zap,
    target: 100,
    metric: (progress) => progress.xp,
  },
  {
    id: 'xp-1000',
    title: 'هزار امتیاز',
    icon: Star,
    target: 1000,
    metric: (progress) => progress.xp,
  },
  {
    id: 'streak-3',
    title: 'سه روز پشت‌سرهم',
    icon: Flame,
    target: 3,
    metric: (progress) => progress.dailyStreak,
  },
  {
    id: 'streak-7',
    title: 'یک هفته پشت‌سرهم',
    icon: Flame,
    target: 7,
    metric: (progress) => progress.dailyStreak,
  },
  {
    id: 'review-5',
    title: 'مرور کامل',
    icon: RefreshCw,
    target: 5,
    metric: (progress) => progress.reviewCount,
  },
];
