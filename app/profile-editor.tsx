import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Trash2 } from 'lucide-react-native';
import { controlSize, radius, semanticColors, spacing, typography } from '@/constants/theme';
import { defaultAvatarId } from '@/constants/avatars';
import { fontForText } from '@/utils/fontForText';
import { useProfiles, type ActionResult } from '@/context/ProfileContext';
import type { Profile } from '@/types/profile';
import { GradientBackground } from '@/components/ui/GradientBackground';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { AvatarPicker } from '@/components/profiles/AvatarPicker';

export default function ProfileEditorScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { ready, profiles } = useProfiles();

  if (!ready) {
    return <GradientBackground />;
  }

  const existing = id ? profiles.find((profile) => profile.id === id) : undefined;
  if (id && !existing) {
    return (
      <GradientBackground>
        <ScreenHeader title="ویرایش پروفایل" onBack={goBack} />
        <Text style={styles.notFound}>این پروفایل پیدا نشد.</Text>
      </GradientBackground>
    );
  }

  return <ProfileForm key={existing?.id ?? 'new'} existing={existing} canDelete={profiles.length > 1} />;
}

function goBack() {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace('/profiles');
  }
}

type ProfileFormProps = {
  existing: Profile | undefined;
  canDelete: boolean;
};

function ProfileForm({ existing, canDelete }: ProfileFormProps) {
  const { profiles, createProfile, updateProfile, deleteProfile } = useProfiles();
  const [name, setName] = useState(existing?.name ?? '');
  const [avatarId, setAvatarId] = useState(existing?.avatarId ?? defaultAvatarId);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const handleResult = (result: ActionResult) => {
    if (result.ok) {
      goBack();
    } else {
      setError(result.error);
    }
  };

  const save = async () => {
    if (saving) return;
    setSaving(true);
    const input = { name, avatarId };
    const result = existing ? await updateProfile(existing.id, input) : await createProfile(input);
    setSaving(false);
    handleResult(result);
  };

  const confirmDelete = async () => {
    if (!existing) return;
    setConfirmingDelete(false);
    const result = await deleteProfile(existing.id);
    if (result.ok) {
      router.replace('/profiles');
    } else {
      setError(result.error);
    }
  };

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <ScreenHeader title={existing ? 'ویرایش پروفایل' : 'ساخت پروفایل'} onBack={goBack} />

        <View style={styles.section}>
          <Text style={styles.label}>نام کاربری</Text>
          <TextInput
            value={name}
            onChangeText={(text) => {
              setName(text);
              setError(null);
            }}
            placeholder="مثلاً مینا"
            placeholderTextColor={semanticColors.textMuted}
            maxLength={20}
            returnKeyType="done"
            onSubmitEditing={save}
            accessibilityLabel="نام کاربری"
            style={[styles.input, { fontFamily: fontForText(name, 'semiBold') }]}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>انتخاب آواتار</Text>
          <AvatarPicker selectedId={avatarId} onSelect={setAvatarId} />
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <PrimaryButton
          label={existing ? 'ذخیره تغییرات' : 'ساخت پروفایل'}
          disabled={saving}
          onPress={save}
        />

        {existing ? (
          canDelete ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="حذف پروفایل"
              onPress={() => setConfirmingDelete(true)}
              style={({ pressed }) => [styles.deleteButton, pressed && styles.pressed]}
            >
              <Trash2 size={20} color={semanticColors.danger} strokeWidth={2.2} />
              <Text style={[styles.deleteLabel, { fontFamily: fontForText('حذف پروفایل', 'bold') }]}>حذف پروفایل</Text>
            </Pressable>
          ) : (
            <Text style={styles.hint}>این آخرین پروفایل است. برای حذف آن، ابتدا یک پروفایل جدید بسازید.</Text>
          )
        ) : null}

        {existing && canDelete ? (
          <ConfirmDialog
            visible={confirmingDelete}
            title="حذف پروفایل؟"
            message={`پیشرفت، سکه‌ها و امتیازهای «${existing.name}» برای همیشه حذف می‌شوند.`}
            confirmLabel="حذف"
            cancelLabel="انصراف"
            onConfirm={confirmDelete}
            onCancel={() => setConfirmingDelete(false)}
          />
        ) : null}
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    gap: spacing.md,
  },
  notFound: {
    ...typography.body,
    color: semanticColors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
  section: {
    gap: spacing.xs,
  },
  label: {
    ...typography.bodyStrong,
    color: semanticColors.textPrimary,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  input: {
    minHeight: controlSize.button,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: semanticColors.border,
    backgroundColor: semanticColors.surface,
    color: semanticColors.textPrimary,
    fontSize: 18,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  error: {
    ...typography.caption,
    color: semanticColors.danger,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  deleteButton: {
    minHeight: controlSize.button,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: semanticColors.danger,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  deleteLabel: {
    ...typography.bodyStrong,
    color: semanticColors.danger,
  },
  pressed: {
    opacity: 0.8,
  },
  hint: {
    ...typography.caption,
    color: semanticColors.textSecondary,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
});
