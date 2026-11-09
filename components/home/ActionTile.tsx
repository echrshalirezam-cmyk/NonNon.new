import { Pressable, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import type { LucideIcon } from 'lucide-react-native';
import { colors, glow, radius, spacing } from '@/constants/theme';
import { fontForText } from '@/utils/fontForText';

type ActionTileProps = {
  icon: LucideIcon;
  label: string;
  colorStart: string;
  colorEnd: string;
  onPress: () => void;
};

export function ActionTile({ icon: Icon, label, colorStart, colorEnd, onPress }: ActionTileProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
    >
      <LinearGradient colors={[colorStart, colorEnd]} start={{ x: 0, y: 0 }} end={{ x: 0.5, y: 1 }} style={styles.tile}>
        <Icon size={40} color={colors.neutral[0]} strokeWidth={2} />
        <Text style={[styles.label, { fontFamily: fontForText(label, 'bold') }]}>{label}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    flexBasis: '48%',
    flexGrow: 1,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    shadowColor: glow.shadowColor,
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  tile: {
    minHeight: 104,
    borderRadius: radius.lg,
    padding: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  label: {
    fontSize: 16,
    lineHeight: 22,
    color: colors.neutral[0],
  },
});
