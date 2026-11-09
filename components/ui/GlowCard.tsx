import { StyleSheet, View, type ViewProps } from 'react-native';
import { glow, radius, semanticColors, spacing } from '@/constants/theme';

export function GlowCard({ style, children, ...rest }: ViewProps) {
  return (
    <View style={[styles.card, style]} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: semanticColors.surface,
    borderRadius: radius.lg,
    borderWidth: glow.borderWidth,
    borderColor: semanticColors.borderGlow,
    padding: spacing.sm,
    shadowColor: glow.shadowColor,
    shadowOpacity: glow.shadowOpacity,
    shadowRadius: glow.shadowRadius,
    shadowOffset: glow.shadowOffset,
    elevation: glow.elevation,
  },
});
