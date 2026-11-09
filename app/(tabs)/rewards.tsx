import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Coins, Heart } from 'lucide-react-native';
import { colors, fonts, semanticColors, spacing, typography } from '@/constants/theme';
import { achievementCatalog } from '@/constants/achievements';
import { HEART_PRICE, MAX_HEARTS, previewDailyReward } from '@/utils/progressRules';
import { dateKey } from '@/utils/dateKeys';
import { useProfiles, type ActionResult } from '@/context/ProfileContext';
import { GradientBackground } from '@/components/ui/GradientBackground';
import { GlowCard } from '@/components/ui/GlowCard';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { StatPill } from '@/components/ui/StatPill';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { DailyRewardCard } from '@/components/rewards/DailyRewardCard';
import { AchievementRow } from '@/components/rewards/AchievementRow';

type RewardTab = 'daily' | 'achievements';

export default function RewardsScreen() {
  const { activeProfile, claimDailyReward, buyHeart } = useProfiles();
  const [tab, setTab] = useState<RewardTab>('daily');
  const [error, setError] = useState<string | null>(null);

  if (!activeProfile) return null;

  const { progress } = activeProfile;
  const today = dateKey(new Date());
  const claimed = progress.lastRewardDate === today;
  const amount = previewDailyReward(progress, today);

  async function run(action: () => Promise<ActionResult>) {
    setError(null);
    const result = await action();
    if (!result.ok) setError(result.error);
  }

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader
          title="پاداش‌ها"
          trailing={
            <StatPill
              icon={<Coins size={18} color={semanticColors.coin} strokeWidth={2} />}
              value={String(progress.coins)}
            />
          }
        />

        <SegmentedControl<RewardTab>
          options={[
            { value: 'daily', label: 'روزانه' },
            { value: 'achievements', label: 'دستاوردها' },
          ]}
          value={tab}
          onChange={(next) => {
            setError(null);
            setTab(next);
          }}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        {tab === 'daily' ? (
          <>
            <DailyRewardCard amount={amount} claimed={claimed} onClaim={() => run(claimDailyReward)} />
            <GlowCard style={styles.heartCard}>
              <View style={styles.heartRow}>
                <Heart size={28} color={semanticColors.heart} fill={semanticColors.heart} strokeWidth={1.5} />
                <View style={styles.heartTexts}>
                  <Text style={styles.heartTitle}>قلب‌های شما</Text>
                  <Text style={styles.heartCount}>{`${progress.hearts} از ${MAX_HEARTS}`}</Text>
                </View>
              </View>
              <PrimaryButton
                label={`خرید یک قلب (${HEART_PRICE} سکه)`}
                onPress={() => run(buyHeart)}
              />
            </GlowCard>
          </>
        ) : (
          <View style={styles.achievements}>
            {achievementCatalog.map((item) => {
              const value = item.metric(progress);
              const done = progress.achievements.includes(item.id) || value >= item.target;
              return (
                <AchievementRow
                  key={item.id}
                  icon={item.icon}
                  title={item.title}
                  progressLabel={done ? 'کامل شد' : `${Math.min(value, item.target)} از ${item.target}`}
                  progress={done ? 1 : Math.min(value, item.target) / item.target}
                />
              );
            })}
          </View>
        )}
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
  },
  error: {
    ...typography.caption,
    color: semanticColors.danger,
    textAlign: 'right',
  },
  heartCard: {
    gap: spacing.sm,
    padding: spacing.md,
  },
  heartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  heartTexts: {
    flex: 1,
    alignItems: 'flex-end',
  },
  heartTitle: {
    ...typography.bodyStrong,
    fontFamily: fonts.persianBold,
    color: semanticColors.textPrimary,
  },
  heartCount: {
    ...typography.caption,
    color: colors.neutral[300],
  },
  achievements: {
    gap: spacing.xs,
  },
});
