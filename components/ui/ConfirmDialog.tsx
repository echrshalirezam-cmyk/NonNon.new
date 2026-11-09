import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, semanticColors, spacing, typography } from '@/constants/theme';
import { fontForText } from '@/utils/fontForText';
import { PrimaryButton } from '@/components/ui/PrimaryButton';

type ConfirmDialogProps = {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  visible,
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onCancel} accessibilityLabel={cancelLabel} />
        <View style={styles.dialog} accessibilityViewIsModal>
          <Text style={[styles.title, { fontFamily: fontForText(title, 'bold') }]}>{title}</Text>
          <Text style={[styles.message, { fontFamily: fontForText(message, 'regular') }]}>{message}</Text>
          <View style={styles.actions}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={cancelLabel}
              onPress={onCancel}
              style={({ pressed }) => [styles.cancel, pressed && styles.pressed]}
            >
              <Text style={[styles.cancelLabel, { fontFamily: fontForText(cancelLabel, 'bold') }]}>{cancelLabel}</Text>
            </Pressable>
            <PrimaryButton label={confirmLabel} onPress={onConfirm} style={styles.confirm} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(7, 4, 18, 0.72)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.sm,
  },
  dialog: {
    width: '100%',
    maxWidth: 420,
    padding: spacing.md,
    gap: spacing.sm,
    borderRadius: radius.lg,
    backgroundColor: semanticColors.surface,
    borderWidth: 1.5,
    borderColor: semanticColors.borderGlow,
  },
  title: {
    ...typography.heading,
    color: semanticColors.textPrimary,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  message: {
    ...typography.body,
    color: semanticColors.textSecondary,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  cancel: {
    flex: 1,
    minHeight: 56,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.neutral[500],
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelLabel: {
    ...typography.bodyStrong,
    color: semanticColors.textPrimary,
  },
  confirm: {
    flex: 1,
  },
  pressed: {
    opacity: 0.8,
  },
});
