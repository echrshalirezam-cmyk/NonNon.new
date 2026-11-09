import type { CefrCode } from '@/constants/levels';

export type LessonRecord = {
  lessonId: string;
  completedAt: string;
  correctCount: number;
  wrongCount: number;
  seconds: number;
};

export type MistakeRecord = {
  wordId: string;
  lessonId: string;
  answeredAt: string;
};

export type ProfileProgress = {
  xp: number;
  coins: number;
  hearts: number;
  heartsDate: string | null;
  learningLevel: CefrCode;
  dailyStreak: number;
  lastActiveDate: string | null;
  lastRewardDate: string | null;
  reviewCount: number;
  completedLessons: string[];
  achievements: string[];
  lessonHistory: LessonRecord[];
  mistakeHistory: MistakeRecord[];
};

export type AudioSettings = {
  enabled: boolean;
  voiceId: string | null;
  rate: number;
};

export type Profile = {
  id: string;
  name: string;
  avatarId: string;
  createdAt: string;
  progress: ProfileProgress;
  audio?: AudioSettings;
};
