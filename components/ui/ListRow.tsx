import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { ChevronRight, type LucideIcon } from 'lucide-react-native';
import { colors, radius, semanticColors, spacing, typography } from '@/constants/theme';
import { fontForText } from '@/utils/fontForText';

type ListRowProps = {
  icon: LucideIcon;
  label: string;
  value?: string;
  onPress?: () => void;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
};

export function ListRow({ icon: Icon, label, value, onPress, switchValue, onSwitchChange }: ListRowProps) {
  const hasSwitch = switchValue !== undefined && onSwitchChange !== undefined;

  const content = (
    <>
      <View style={styles.iconWrap}>
        <Icon size={20} color={semanticColors.primary} strokeWidth={2} />
      </View>
      <Text style={[styles.label, { fontFamily: fontForText(label, 'semiBold') }]}>{label}</Text>
      {value ? <Text style={[styles.value, { fontFamily: fontForText(value, 'regular') }]}>{value}</Text> : null}
      {hasSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: colors.navy[600], true: semanticColors.primary }}
          thumbColor={colors.neutral[0]}
        />
      ) : onPress ? (
        <ChevronRight size={20} color={semanticColors.textMuted} strokeWidth={2} />
      ) : null}
    </>
  );

  if (onPress && !hasSwitch) {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [styles.row, pressed && styles.pressed]}
      >
        {content}
      </Pressable>
    );
  }

  return <View style={styles.row}>{content}</View>;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    minHeight: 56,
    paddingHorizontal: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: semanticColors.border,
  },
  pressed: {
    backgroundColor: semanticColors.surfaceRaised,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: semanticColors.surfaceRaised,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    ...typography.bodyStrong,
    color: semanticColors.textPrimary,
    flex: 1,
  },
  value: {
    ...typography.caption,
    color: semanticColors.textSecondary,
  },
});
