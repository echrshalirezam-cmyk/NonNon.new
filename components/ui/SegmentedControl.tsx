import { Pressable, StyleSheet, Text, View } from 'react-native';
import { radius, semanticColors, spacing, typography } from '@/constants/theme';
import { fontForText } from '@/utils/fontForText';

type SegmentedControlProps<T extends string> = {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
};

export function SegmentedControl<T extends string>({ options, value, onChange }: SegmentedControlProps<T>) {
  return (
    <View style={styles.track}>
      {options.map((option) => {
        const active = option.value === value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => onChange(option.value)}
            style={[styles.segment, active && styles.segmentActive]}
          >
            <Text
              style={[
                styles.label,
                { fontFamily: fontForText(option.label, 'bold') },
                active && styles.labelActive,
              ]}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    gap: spacing.xxs,
    padding: spacing.xxs,
    borderRadius: radius.pill,
    backgroundColor: semanticColors.surface,
  },
  segment: {
    flex: 1,
    minHeight: 40,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentActive: {
    backgroundColor: semanticColors.primary,
  },
  label: {
    ...typography.caption,
    color: semanticColors.textSecondary,
  },
  labelActive: {
    color: semanticColors.onPrimary,
  },
});
