import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { BookOpen, Heart, Lock } from 'lucide-react-native';
import { semanticColors, spacing, typography } from '@/constants/theme';
import { findLesson } from '@/content/lessons';
import { useProfiles } from '@/context/ProfileContext';
import { GradientBackground } from '@/components/ui/GradientBackground';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { LessonRunner } from '@/components/lessons/LessonRunner';
import { getLessonStatus } from '@/utils/lessonProgress';
import type { LessonAttempt } from '@/types/lesson';

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { activeProfile, recordLessonResult } = useProfiles();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!activeProfile) return <Redirect href="/profiles" />;

  const entry = findLesson(id ?? '');
  if (!entry) {
    return (
      <GradientBackground>
        <ScreenHeader title="درس" onBack={() => router.back()} />
        <EmptyState icon={BookOpen} title="درس پیدا نشد" description="این درس در دسترس نیست." />
      </GradientBackground>
    );
  }

  const { lesson } = entry;
  const status = getLessonStatus(lesson.id, activeProfile.progress.completedLessons);

  if (status === 'locked') {
    return (
      <GradientBackground>
        <ScreenHeader title={lesson.title} onBack={() => router.back()} />
        <EmptyState
          icon={Lock}
          title="این درس قفل است"
          description="ابتدا درس قبلی را کامل کنید."
        />
      </GradientBackground>
    );
  }

  if (activeProfile.progress.hearts <= 0) {
    return (
      <GradientBackground>
        <ScreenHeader title={lesson.title} onBack={() => router.back()} />
        <EmptyState
          icon={Heart}
          title="قلب‌هایت تمام شده"
          description="برای ادامه درس یک قلب بخر یا فردا دوباره امتحان کن."
        />
        <View style={styles.shopButton}>
          <PrimaryButton label="رفتن به پاداش‌ها" onPress={() => router.replace('/(tabs)/rewards')} />
        </View>
      </GradientBackground>
    );
  }

  async function handleComplete(attempt: LessonAttempt) {
    setSaving(true);
    setError(null);
    const result = await recordLessonResult(lesson.id, attempt);
    if (!result.ok) {
      setError(result.error);
      setSaving(false);
      return;
    }
    router.replace({
      pathname: '/lesson-result',
      params: {
        lessonId: lesson.id,
        xp: String(result.xpAwarded),
        correct: String(attempt.correct),
        wrong: String(attempt.wrong),
        seconds: String(attempt.seconds),
      },
    });
  }

  return (
    <GradientBackground>
      <View style={styles.header}>
        <ScreenHeader title={lesson.title} onBack={() => router.back()} />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <LessonRunner key={lesson.id} lesson={lesson} busy={saving} onComplete={handleComplete} />
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.md,
    paddingBottom: spacing.xs,
  },
  error: {
    ...typography.caption,
    color: semanticColors.danger,
    textAlign: 'right',
    paddingHorizontal: spacing.sm,
  },
  shopButton: {
    paddingHorizontal: spacing.sm,
  },
});
