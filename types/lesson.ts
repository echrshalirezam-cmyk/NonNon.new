import type { CefrCode } from '@/constants/levels';

export type Word = {
  en: string;
  fa: string;
  ipa: string;
};

export type GrammarNote = {
  title: string;
  rule: string;
  examples: { en: string; fa: string }[];
};

export type Exercise =
  | { type: 'choice'; prompt: string; choices: string[]; answer: number; audio?: string }
  | { type: 'translation'; prompt: string; choices: string[]; answer: number }
  | { type: 'matching'; pairs: { en: string; fa: string }[] }
  | { type: 'ordering'; sentence: string; hint: string };

export type Lesson = {
  id: string;
  title: string;
  words: Word[];
  grammar: GrammarNote | null;
  exercises: Exercise[];
};

export type LessonSection = {
  id: string;
  level: CefrCode;
  index: number;
  title: string;
  lessons: Lesson[];
};

export type ExerciseOutcome = {
  correct: boolean;
  mistakeKeys: string[];
  correctAnswer: string;
  audioText?: string;
};

export type LessonAttempt = {
  correct: number;
  wrong: number;
  seconds: number;
  mistakeKeys: string[];
};
