import { cefrCodes, type CefrCode } from '@/constants/levels';
import { a1Sections } from '@/content/lessons/a1';
import type { Lesson, LessonSection } from '@/types/lesson';

export type LessonEntry = {
  lesson: Lesson;
  level: CefrCode;
  section: LessonSection;
};

const sectionsByLevel: Partial<Record<CefrCode, LessonSection[]>> = {
  A1: a1Sections,
};

export const orderedLessons: LessonEntry[] = cefrCodes.flatMap((level) =>
  (sectionsByLevel[level] ?? []).flatMap((section) =>
    section.lessons.map((lesson) => ({ lesson, level, section })),
  ),
);

export function getSections(level: CefrCode): LessonSection[] {
  return sectionsByLevel[level] ?? [];
}

export function findLesson(lessonId: string): LessonEntry | null {
  return orderedLessons.find((entry) => entry.lesson.id === lessonId) ?? null;
}
