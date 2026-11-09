import { Pressable, StyleSheet, Text, type PressableProps, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, controlSize, glow, radius, semanticColors, spacing, typography } from '@/constants/theme';
import { fontForText } from '@/utils/fontForText';

type PrimaryButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  label: string;
  icon?: React.ReactNode;
  style?: ViewStyle;
};

export function PrimaryButton({ label, icon, style, disabled, ...rest }: PrimaryButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={disabled}
      style={({ pressed }) => [styles.pressable, pressed && styles.pressed, disabled && styles.disabled, style]}
      {...rest}
    >
      <LinearGradient
        colors={[colors.gold[300], colors.gold[500]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <Text style={[styles.label, { fontFamily: fontForText(label, 'bold') }]}>{label}</Text>
        {icon}
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    minHeight: controlSize.button,
    borderRadius: radius.pill,
    shadowColor: glow.shadowColor,
    shadowOpacity: glow.shadowOpacity,
    shadowRadius: glow.shadowRadius,
    shadowOffset: glow.shadowOffset,
    elevation: glow.elevation,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.5,
  },
  gradient: {
    minHeight: controlSize.button,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  label: {
    ...typography.heading,
    color: semanticColors.onPrimary,
  },
});
