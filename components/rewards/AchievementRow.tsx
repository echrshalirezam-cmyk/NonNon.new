import { StyleSheet, Text, View } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';
import { colors, radius, semanticColors, spacing, typography } from '@/constants/theme';
import { fontForText } from '@/utils/fontForText';
import { GlowCard } from '@/components/ui/GlowCard';
import { ProgressBar } from '@/components/ui/ProgressBar';

type AchievementRowProps = {
  icon: LucideIcon;
  title: string;
  progressLabel: string;
  progress: number;
};

export function AchievementRow({ icon: Icon, title, progressLabel, progress }: AchievementRowProps) {
  return (
    <GlowCard style={styles.card}>
      <View style={styles.iconWrap}>
        <Icon size={24} color={colors.gold[400]} strokeWidth={2} />
      </View>
      <View style={styles.texts}>
        <View style={styles.header}>
          <Text style={[styles.title, { fontFamily: fontForText(title, 'bold') }]}>{title}</Text>
          <Text style={[styles.progressLabel, { fontFamily: fontForText(progressLabel, 'regular') }]}>
            {progressLabel}
          </Text>
        </View>
        <ProgressBar progress={progress} height={6} />
      </View>
    </GlowCard>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.sm,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: semanticColors.surfaceRaised,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texts: {
    flex: 1,
    gap: spacing.xs,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    ...typography.bodyStrong,
    color: semanticColors.textPrimary,
  },
  progressLabel: {
    ...typography.caption,
    color: semanticColors.textSecondary,
  },
});
