import { StyleSheet, Text, View } from 'react-native';
import { radius, semanticColors, spacing, typography } from '@/constants/theme';
import { fontForText } from '@/utils/fontForText';

type ResultStatRowProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

export function ResultStatRow({ icon, label, value }: ResultStatRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.iconWrap}>{icon}</View>
      <Text style={[styles.label, { fontFamily: fontForText(label, 'semiBold') }]}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    minHeight: 56,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: semanticColors.surface,
    borderWidth: 1,
    borderColor: semanticColors.border,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: semanticColors.surfaceRaised,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    ...typography.bodyStrong,
    flex: 1,
    color: semanticColors.textPrimary,
    textAlign: 'right',
  },
  value: {
    ...typography.bodyStrong,
    color: semanticColors.textPrimary,
  },
});
