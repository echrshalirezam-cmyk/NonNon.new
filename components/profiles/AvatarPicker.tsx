import { Pressable, StyleSheet, View } from 'react-native';
import { avatarOptions } from '@/constants/avatars';
import { glow, semanticColors, spacing } from '@/constants/theme';
import { ProfileAvatar } from '@/components/profiles/ProfileAvatar';

type AvatarPickerProps = {
  selectedId: string;
  onSelect: (id: string) => void;
};

export function AvatarPicker({ selectedId, onSelect }: AvatarPickerProps) {
  return (
    <View style={styles.grid}>
      {avatarOptions.map((avatar) => {
        const selected = avatar.id === selectedId;
        return (
          <Pressable
            key={avatar.id}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            accessibilityLabel={`انتخاب آواتار ${avatar.id}`}
            onPress={() => onSelect(avatar.id)}
            style={({ pressed }) => [styles.option, selected && styles.optionSelected, pressed && styles.pressed]}
          >
            <ProfileAvatar avatarId={avatar.id} size={72} />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  option: {
    padding: spacing.xxs,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionSelected: {
    borderColor: semanticColors.borderGlow,
    shadowColor: glow.shadowColor,
    shadowOpacity: glow.shadowOpacity,
    shadowRadius: glow.shadowRadius,
    shadowOffset: glow.shadowOffset,
    elevation: glow.elevation,
  },
  pressed: {
    opacity: 0.85,
  },
});
