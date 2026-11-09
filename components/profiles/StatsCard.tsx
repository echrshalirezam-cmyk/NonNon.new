import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius, semanticColors, spacing, typography } from '@/constants/theme';
import type { ProfileStats } from '@/utils/stats';
import { GlowCard } from '@/components/ui/GlowCard';

type StatsCardProps = {
  stats: ProfileStats;
};

export function StatsCard({ stats }: StatsCardProps) {
  const tiles = [
    { label: 'درس‌های کامل', value: String(stats.lessonsCompleted) },
    { label: 'درصد درستی', value: `${stats.accuracyPercent}%` },
    { label: 'دقیقه مطالعه', value: String(stats.studyMinutes) },
    { label: 'اشتباهات باز', value: String(stats.openMistakes) },
    { label: 'روز پشت‌سرهم', value: String(stats.streak) },
    { label: 'دستاوردها', value: `${stats.achievementsUnlocked} از ${stats.achievementsTotal}` },
  ];

  return (
    <GlowCard style={styles.card}>
      <Text style={styles.title}>آمار پیشرفت</Text>
      <View style={styles.grid}>
        {tiles.map((tile) => (
          <View key={tile.label} style={styles.tile}>
            <Text style={styles.value}>{tile.value}</Text>
            <Text style={styles.label}>{tile.label}</Text>
          </View>
        ))}
      </View>
    </GlowCard>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.sm,
    padding: spacing.sm,
  },
  title: {
    ...typography.bodyStrong,
    fontFamily: fonts.persianBold,
    color: semanticColors.textPrimary,
    textAlign: 'right',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  tile: {
    width: '31%',
    flexGrow: 1,
    alignItems: 'center',
    gap: spacing.xxs,
    paddingVertical: spacing.xs,
    borderRadius: radius.md,
    backgroundColor: semanticColors.surfaceRaised,
  },
  value: {
    ...typography.bodyStrong,
    fontFamily: fonts.persianBold,
    color: colors.gold[400],
  },
  label: {
    ...typography.caption,
    color: semanticColors.textSecondary,
    textAlign: 'center',
  },
});
