import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Coins, Gift } from 'lucide-react-native';
import { colors, fonts, glow, radius, semanticColors, spacing, typography } from '@/constants/theme';
import { GlowCard } from '@/components/ui/GlowCard';
import { PrimaryButton } from '@/components/ui/PrimaryButton';

type DailyRewardCardProps = {
  amount: number;
  claimed: boolean;
  onClaim: () => void;
};

export function DailyRewardCard({ amount, claimed, onClaim }: DailyRewardCardProps) {
  return (
    <GlowCard style={styles.card}>
      <LinearGradient
        colors={[colors.gold[300], colors.gold[500]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.giftCircle}
      >
        <Gift size={56} color={semanticColors.onPrimary} strokeWidth={1.8} />
      </LinearGradient>

      <Text style={styles.title}>جایزه روزانه!</Text>

      <View style={styles.amountRow}>
        <Coins size={22} color={semanticColors.coin} strokeWidth={2} />
        <Text style={styles.amount}>{`+${amount} سکه`}</Text>
      </View>

      {claimed ? (
        <View style={styles.claimedBadge}>
          <Text style={styles.claimedText}>دریافت شد</Text>
        </View>
      ) : (
        <PrimaryButton label="دریافت جایزه" onPress={onClaim} style={styles.button} />
      )}
    </GlowCard>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
  },
  giftCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: glow.shadowColor,
    shadowOpacity: 0.6,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },
  title: {
    ...typography.title,
    fontFamily: fonts.persianBold,
    color: semanticColors.textPrimary,
    writingDirection: 'rtl',
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  amount: {
    ...typography.heading,
    fontFamily: fonts.persianBold,
    color: semanticColors.coin,
  },
  button: {
    alignSelf: 'stretch',
  },
  claimedBadge: {
    alignSelf: 'stretch',
    minHeight: 56,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: semanticColors.surfaceRaised,
  },
  claimedText: {
    ...typography.bodyStrong,
    fontFamily: fonts.persianBold,
    color: semanticColors.textSecondary,
  },
});
