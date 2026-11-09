import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { controlSize, semanticColors, spacing, typography } from '@/constants/theme';
import { fontForText } from '@/utils/fontForText';

type ScreenHeaderProps = {
  title: string;
  onBack?: () => void;
  trailing?: React.ReactNode;
};

export function ScreenHeader({ title, onBack, trailing }: ScreenHeaderProps) {
  return (
    <View style={styles.row}>
      <View style={styles.slot}>
        {onBack ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={onBack}
            style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
          >
            <ArrowLeft size={22} color={semanticColors.textPrimary} strokeWidth={2.2} />
          </Pressable>
        ) : null}
      </View>
      <Text style={[styles.title, { fontFamily: fontForText(title, 'bold') }]} numberOfLines={1}>
        {title}
      </Text>
      <View style={[styles.slot, styles.slotEnd]}>{trailing}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: controlSize.icon + spacing.xs,
  },
  slot: {
    minWidth: controlSize.icon,
    height: controlSize.icon,
    justifyContent: 'center',
  },
  slotEnd: {
    alignItems: 'flex-end',
  },
  iconButton: {
    width: controlSize.icon,
    height: controlSize.icon,
    borderRadius: controlSize.icon / 2,
    backgroundColor: semanticColors.surfaceRaised,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  title: {
    ...typography.heading,
    color: semanticColors.textPrimary,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: spacing.xs,
  },
});
