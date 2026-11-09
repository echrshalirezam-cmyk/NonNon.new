import { Check, Lock, Play } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { radius, semanticColors, spacing, typography } from '@/constants/theme';
import type { Lesson } from '@/types/lesson';
import type { LessonStatus } from '@/utils/lessonProgress';
import { fontForText } from '@/utils/fontForText';

type LessonRowProps = {
  label: string;
  lesson: Lesson;
  status: LessonStatus;
  onPress: () => void;
};

export function LessonRow({ label, lesson, status, onPress }: LessonRowProps) {
  const locked = status === 'locked';
  const completed = status === 'completed';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: locked }}
      disabled={locked}
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && !locked && styles.pressed, locked && styles.locked]}
    >
      <View style={[styles.badge, completed && styles.badgeDone]}>
        {completed ? (
          <Check size={18} color={semanticColors.success} strokeWidth={2.8} />
        ) : locked ? (
          <Lock size={16} color={semanticColors.textMuted} strokeWidth={2.4} />
        ) : (
          <Play size={16} color={semanticColors.onPrimary} fill={semanticColors.onPrimary} strokeWidth={2} />
        )}
      </View>
      <View style={styles.texts}>
        <Text style={[styles.title, { fontFamily: fontForText(lesson.title, 'bold') }]}>{lesson.title}</Text>
        <Text style={styles.meta}>{`درس ${label}`}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    minHeight: 64,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: semanticColors.surfaceRaised,
    borderWidth: 1,
    borderColor: semanticColors.border,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  locked: {
    opacity: 0.5,
  },
  badge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: semanticColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeDone: {
    backgroundColor: semanticColors.successTint,
    borderWidth: 1.5,
    borderColor: semanticColors.success,
  },
  texts: {
    flex: 1,
    gap: 2,
  },
  title: {
    ...typography.bodyStrong,
    color: semanticColors.textPrimary,
    textAlign: 'right',
  },
  meta: {
    ...typography.label,
    color: semanticColors.textMuted,
    textAlign: 'right',
  },
});
