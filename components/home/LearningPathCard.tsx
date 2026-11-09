import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import { colors, glow, radius, semanticColors, spacing, typography } from '@/constants/theme';
import { fontForText } from '@/utils/fontForText';

type LearningPathCardProps = {
  title: string;
  subtitle: string;
  onPress: () => void;
};

export function LearningPathCard({ title, subtitle, onPress }: LearningPathCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.texts}>
        <Text style={[styles.title, { fontFamily: fontForText(title, 'bold') }]}>{title}</Text>
        <Text style={[styles.subtitle, { fontFamily: fontForText(subtitle, 'semiBold') }]}>{subtitle}</Text>
      </View>
      <View style={styles.arrow}>
        <ArrowRight size={22} color={semanticColors.primary} strokeWidth={2.5} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    minHeight: 84,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.lg,
    backgroundColor: semanticColors.primary,
    borderWidth: 2,
    borderColor: colors.gold[200],
    shadowColor: glow.shadowColor,
    shadowOpacity: 0.5,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    elevation: 5,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  texts: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xxs,
  },
  title: {
    fontSize: 22,
    lineHeight: 28,
    color: colors.ink[900],
  },
  subtitle: {
    ...typography.bodyStrong,
    color: colors.ink[600],
  },
  arrow: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.navy[900],
    alignItems: 'center',
    justifyContent: 'center',
  },
});
