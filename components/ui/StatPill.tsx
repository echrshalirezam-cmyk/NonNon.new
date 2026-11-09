import { StyleSheet, Text, View } from 'react-native';
import { radius, semanticColors, spacing, typography } from '@/constants/theme';

type StatPillProps = {
  icon: React.ReactNode;
  value: string;
};

export function StatPill({ icon, value }: StatPillProps) {
  return (
    <View style={styles.pill}>
      {icon}
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(16, 28, 71, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255, 201, 60, 0.45)',
  },
  value: {
    ...typography.bodyStrong,
    color: semanticColors.textPrimary,
  },
});
