import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { BadgeCheck, RefreshCw } from 'lucide-react-native';
import { semanticColors, spacing, typography } from '@/constants/theme';
import { useProfiles } from '@/context/ProfileContext';
import type { LessonAttempt } from '@/types/lesson';
import { buildReviewLesson, openMistakeWordIds } from '@/utils/mistakeReview';
import { GradientBackground } from '@/components/ui/GradientBackground';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { GlowCard } from '@/components/ui/GlowCard';
import { LessonRunner } from '@/components/lessons/LessonRunner';

export default function ReviewScreen() {
  const { activeProfile, recordReview } = useProfiles();
  const [session] = useState(() =>
    activeProfile ? buildReviewLesson(openMistakeWordIds(activeProfile.progress)) : null,
  );
  const [summary, setSummary] = useState<LessonAttempt | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!activeProfile) return null;

  const header = <ScreenHeader title="مرور اشتباهات" onBack={() => router.back()} />;

  if (!session) {
    return (
      <GradientBackground>
        {header}
        <EmptyState
          icon={BadgeCheck}
          title="اشتباهی برای مرور نیست"
          description="وقتی در درس‌ها اشتباه کنید، اینجا برای تمرین دوباره نمایش داده می‌شوند."
        />
      </GradientBackground>
    );
  }

  if (summary) {
    return (
      <GradientBackground>
        {header}
        <GlowCard style={styles.summary}>
          <RefreshCw size={48} color={semanticColors.primary} strokeWidth={1.8} />
          <Text style={styles.summaryTitle}>مرور تمام شد</Text>
          <Text style={styles.summaryText}>{`${summary.correct} پاسخ درست • ${summary.wrong} پاسخ نادرست`}</Text>
          <PrimaryButton label="بازگشت به درس‌ها" onPress={() => router.back()} />
        </GlowCard>
      </GradientBackground>
    );
  }

  async function handleComplete(attempt: LessonAttempt) {
    setError(null);
    const result = await recordReview(session!.coveredWordIds, attempt.mistakeKeys);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setSummary(attempt);
  }

  return (
    <GradientBackground>
      <View style={styles.header}>{header}</View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <LessonRunner lesson={session.lesson} busy={false} onComplete={handleComplete} />
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
  summary: {
    alignItems: 'center',
    gap: spacing.sm,
    margin: spacing.sm,
    padding: spacing.md,
  },
  summaryTitle: {
    ...typography.title,
    color: semanticColors.textPrimary,
  },
  summaryText: {
    ...typography.body,
    color: semanticColors.textSecondary,
  },
});
