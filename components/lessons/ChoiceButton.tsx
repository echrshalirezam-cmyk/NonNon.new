import { Pressable, StyleSheet, Text } from 'react-native';
import { Check, X } from 'lucide-react-native';
import { radius, semanticColors, spacing, typography } from '@/constants/theme';
import { fontForText } from '@/utils/fontForText';

export type ChoiceState = 'idle' | 'correct' | 'wrong';

type ChoiceButtonProps = {
  label: string;
  state: ChoiceState;
  disabled?: boolean;
  onPress: () => void;
};

const toneStyles = {
  idle: { borderColor: semanticColors.border, backgroundColor: semanticColors.surface },
  correct: { borderColor: semanticColors.success, backgroundColor: semanticColors.successTint },
  wrong: { borderColor: semanticColors.danger, backgroundColor: semanticColors.dangerTint },
} as const;

export function ChoiceButton({ label, state, disabled, onPress }: ChoiceButtonProps) {
  const tone = toneStyles[state];
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled, selected: state !== 'idle' }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.button, tone, pressed && !disabled && styles.pressed]}
    >
      <Text style={[styles.label, { fontFamily: fontForText(label, 'bold') }]}>{label}</Text>
      {state === 'correct' ? <Check size={20} color={semanticColors.success} strokeWidth={2.5} /> : null}
      {state === 'wrong' ? <X size={20} color={semanticColors.danger} strokeWidth={2.5} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 56,
    borderRadius: radius.md,
    borderWidth: 1.5,
    paddingHorizontal: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.xs,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  label: {
    ...typography.bodyStrong,
    flexShrink: 1,
    color: semanticColors.textPrimary,
  },
});
