import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Star } from 'lucide-react-native';
import { colors, fonts, glow, radius, semanticColors, spacing, typography } from '@/constants/theme';
import { cefrLevelByCode } from '@/constants/levels';
import { fontForText } from '@/utils/fontForText';
import { useProfiles } from '@/context/ProfileContext';
import { GradientBackground } from '@/components/ui/GradientBackground';
import { GlowCard } from '@/components/ui/GlowCard';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { ProfileAvatar } from '@/components/profiles/ProfileAvatar';

export default function LeaderboardScreen() {
  const { profiles, activeProfile } = useProfiles();
  const ranked = [...profiles].sort((a, b) => b.progress.xp - a.progress.xp);

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="رتبه‌بندی" />
        <Text style={styles.subtitle}>امتیاز پروفایل‌های همین دستگاه</Text>

        {ranked.map((profile, index) => {
          const isActive = profile.id === activeProfile?.id;
          const level = cefrLevelByCode[profile.progress.learningLevel];
          return (
            <GlowCard key={profile.id} style={[styles.row, isActive && styles.activeRow]}>
              <Text style={[styles.rank, index === 0 && styles.firstRank]}>{index + 1}</Text>
              <ProfileAvatar avatarId={profile.avatarId} size={48} />
              <View style={styles.texts}>
                <Text style={[styles.name, { fontFamily: fontForText(profile.name, 'bold') }]} numberOfLines={1}>
                  {profile.name}
                </Text>
                <Text style={styles.meta}>{`سطح ${level.code} • ${profile.progress.dailyStreak} روز پشت‌سرهم`}</Text>
              </View>
              <View style={styles.xpBox}>
                <Star size={16} color={colors.gold[400]} fill={colors.gold[400]} strokeWidth={1.5} />
                <Text style={styles.xp}>{profile.progress.xp.toLocaleString('en-US')}</Text>
              </View>
            </GlowCard>
          );
        })}
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    gap: spacing.sm,
  },
  subtitle: {
    ...typography.caption,
    color: semanticColors.textSecondary,
    textAlign: 'right',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.sm,
  },
  activeRow: {
    borderWidth: 1,
    borderColor: semanticColors.primary,
    shadowColor: glow.shadowColor,
    shadowOpacity: 0.5,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
  },
  rank: {
    width: 28,
    textAlign: 'center',
    fontFamily: fonts.extraBold,
    fontSize: 18,
    color: semanticColors.textSecondary,
  },
  firstRank: {
    color: semanticColors.accent,
  },
  texts: {
    flex: 1,
    alignItems: 'flex-end',
    gap: spacing.xxs,
  },
  name: {
    ...typography.bodyStrong,
    color: semanticColors.textPrimary,
  },
  meta: {
    ...typography.caption,
    color: semanticColors.textSecondary,
  },
  xpBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xxs,
    borderRadius: radius.pill,
    backgroundColor: semanticColors.surfaceRaised,
  },
  xp: {
    ...typography.label,
    fontFamily: fonts.persianBold,
    color: semanticColors.textPrimary,
  },
});
