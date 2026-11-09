import type { Exercise, GrammarNote, Word } from '@/types/lesson';

type Pair = [string, string];

export const w = (en: string, fa: string, ipa: string): Word => ({ en, fa, ipa });

export const grammar = (title: string, rule: string, examples: Pair[]): GrammarNote => ({
  title,
  rule,
  examples: examples.map(([en, fa]) => ({ en, fa })),
});

export const choice = (prompt: string, choices: string[], answer: number): Exercise => ({
  type: 'choice',
  prompt,
  choices,
  answer,
});

export const listen = (choices: string[], answer: number, audio: string): Exercise => ({
  type: 'choice',
  prompt: 'به صدا گوش کنید و معنی آن را انتخاب کنید',
  choices,
  answer,
  audio,
});

export const translate = (prompt: string, choices: string[], answer: number): Exercise => ({
  type: 'translation',
  prompt,
  choices,
  answer,
});

export const matching = (pairs: Pair[]): Exercise => ({
  type: 'matching',
  pairs: pairs.map(([en, fa]) => ({ en, fa })),
});

export const ordering = (sentence: string, hint: string): Exercise => ({
  type: 'ordering',
  sentence,
  hint,
});
