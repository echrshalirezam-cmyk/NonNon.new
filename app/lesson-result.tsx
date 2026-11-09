import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BookOpen, Check, Clock, Star, X } from 'lucide-react-native';
import { colors, fonts, glow, semanticColors, spacing } from '@/constants/theme';
import { findLesson } from '@/content/lessons';
import { GradientBackground } from '@/components/ui/GradientBackground';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { EmptyState } from '@/components/ui/EmptyState';
import { Mascot } from '@/components/mascot/Mascot';
import { ResultStatRow } from '@/components/lesson/ResultStatRow';

function formatSeconds(total: number): string {
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export default function LessonResultScreen() {
  const params = useLocalSearchParams<{
    lessonId?: string;
    xp?: string;
    correct?: string;
    wrong?: string;
    seconds?: string;
  }>();

  const entry = params.lessonId ? findLesson(params.lessonId) : null;
  const xp = Number(params.xp);
  const correct = Number(params.correct);
  const wrong = Number(params.wrong);
  const seconds = Number(params.seconds);
  const valid =
    entry !== null &&
    [xp, correct, wrong, seconds].every((value) => Number.isFinite(value) && value >= 0);

  if (!entry || !valid) {
    return (
      <GradientBackground>
        <ScreenHeader title="نتیجه درس" />
        <EmptyState icon={BookOpen} title="نتیجه‌ای پیدا نشد" description="به فهرست درس‌ها برگردید." />
        <PrimaryButton label="بازگشت به درس‌ها" onPress={() => router.replace('/(tabs)/lessons')} />
      </GradientBackground>
    );
  }

  const ribbonText = wrong === 0 ? 'عالیه!' : 'خوب بود!';

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="نتیجه درس" />

        <View style={styles.hero}>
          <Mascot width={160} />
        </View>

        <LinearGradient
          colors={[colors.gold[300], colors.gold[500]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.ribbon}
        >
          <Text style={styles.ribbonText}>{ribbonText}</Text>
        </LinearGradient>

        <Text style={styles.lessonTitle}>{entry.lesson.title}</Text>

        <View style={styles.xpBlock}>
          <Text style={styles.xpLabel}>امتیاز دریافتی:</Text>
          <View style={styles.xpRow}>
            <Star size={32} color={colors.gold[400]} fill={colors.gold[400]} strokeWidth={1.5} />
            <Text style={styles.xpValue}>{`+${xp}`}</Text>
          </View>
          {xp === 0 ? <Text style={styles.xpNote}>این درس قبلاً کامل شده بود و امتیازی اضافه نشد.</Text> : null}
        </View>

        <View style={styles.stats}>
          <ResultStatRow
            icon={<Check size={18} color={semanticColors.success} strokeWidth={3} />}
            label="درست"
            value={String(correct)}
          />
          <ResultStatRow
            icon={<X size={18} color={semanticColors.danger} strokeWidth={3} />}
            label="نادرست"
            value={String(wrong)}
          />
          <ResultStatRow
            icon={<Clock size={18} color={colors.levels.A2} strokeWidth={2.5} />}
            label="زمان"
            value={formatSeconds(seconds)}
          />
        </View>

        <PrimaryButton label="ادامه" onPress={() => router.replace('/(tabs)/lessons')} />
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    gap: spacing.md,
    alignItems: 'stretch',
  },
  hero: {
    alignItems: 'center',
  },
  ribbon: {
    alignSelf: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
    borderRadius: 12,
    marginTop: -spacing.md,
    shadowColor: glow.shadowColor,
    shadowOpacity: glow.shadowOpacity,
    shadowRadius: glow.shadowRadius,
    shadowOffset: glow.shadowOffset,
    elevation: glow.elevation,
  },
  ribbonText: {
    fontFamily: fonts.persianBold,
    fontSize: 28,
    lineHeight: 36,
    color: semanticColors.onPrimary,
  },
  lessonTitle: {
    fontFamily: fonts.persianMedium,
    fontSize: 16,
    lineHeight: 24,
    color: semanticColors.textSecondary,
    textAlign: 'center',
  },
  xpBlock: {
    alignItems: 'center',
    gap: spacing.xxs,
  },
  xpLabel: {
    fontFamily: fonts.persianMedium,
    fontSize: 16,
    lineHeight: 24,
    color: semanticColors.textSecondary,
  },
  xpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  xpValue: {
    fontFamily: fonts.extraBold,
    fontSize: 48,
    lineHeight: 56,
    color: colors.gold[400],
  },
  xpNote: {
    fontFamily: fonts.persianMedium,
    fontSize: 14,
    lineHeight: 21,
    color: semanticColors.textMuted,
    textAlign: 'center',
  },
  stats: {
    gap: spacing.xs,
  },
});
