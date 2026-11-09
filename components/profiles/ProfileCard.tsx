import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ChevronRight, Crown, Pencil } from 'lucide-react-native';
import { colors, glow, radius, semanticColors, spacing, typography } from '@/constants/theme';
import { fontForText } from '@/utils/fontForText';
import { ProfileAvatar } from '@/components/profiles/ProfileAvatar';
import type { Profile } from '@/types/profile';

type ProfileCardProps = {
  profile: Profile;
  selected: boolean;
  onPress: () => void;
  onEdit: () => void;
};

export function ProfileCard({ profile, selected, onPress, onEdit }: ProfileCardProps) {
  return (
    <View style={styles.row}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ selected }}
        accessibilityLabel={profile.name}
        onPress={onPress}
        style={({ pressed }) => [styles.card, selected && styles.cardSelected, pressed && styles.pressed]}
      >
        <ProfileAvatar avatarId={profile.avatarId} size={56} />
        <View style={styles.texts}>
          <Text style={[styles.name, { fontFamily: fontForText(profile.name, 'bold') }]}>{profile.name}</Text>
          <Text style={[styles.meta, { fontFamily: fontForText(profile.progress.learningLevel, 'regular') }]}>
            {`سطح ${profile.progress.learningLevel}`}
          </Text>
        </View>
        {selected ? (
          <Crown size={24} color={semanticColors.accent} fill={semanticColors.accent} strokeWidth={1.5} />
        ) : (
          <ChevronRight size={22} color={colors.neutral[300]} strokeWidth={2} />
        )}
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`ویرایش ${profile.name}`}
        onPress={onEdit}
        hitSlop={8}
        style={({ pressed }) => [styles.editButton, pressed && styles.pressed]}
      >
        <Pencil size={18} color={semanticColors.textPrimary} strokeWidth={2} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.xs,
    paddingRight: spacing.sm,
    borderRadius: radius.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  cardSelected: {
    borderColor: semanticColors.borderGlow,
    backgroundColor: 'rgba(255, 201, 60, 0.18)',
    shadowColor: glow.shadowColor,
    shadowOpacity: glow.shadowOpacity,
    shadowRadius: glow.shadowRadius,
    shadowOffset: glow.shadowOffset,
    elevation: glow.elevation,
  },
  editButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: semanticColors.surfaceRaised,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.85,
  },
  texts: {
    flex: 1,
    gap: spacing.xxs,
  },
  name: {
    ...typography.heading,
    color: semanticColors.textPrimary,
  },
  meta: {
    ...typography.caption,
    color: semanticColors.textSecondary,
  },
});
