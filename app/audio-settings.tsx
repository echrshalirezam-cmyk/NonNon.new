import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Check } from 'lucide-react-native';
import { radius, semanticColors, spacing, typography } from '@/constants/theme';
import { PREVIEW_TEXT, SPEED_OPTIONS } from '@/constants/audio';
import { useProfiles } from '@/context/ProfileContext';
import { useAudioSettings } from '@/hooks/useAudioSettings';
import { GradientBackground } from '@/components/ui/GradientBackground';
import { GlowCard } from '@/components/ui/GlowCard';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { loadEnglishVoices, speakText, type EnglishVoice } from '@/utils/speech';
import type { AudioSettings } from '@/types/profile';
import { fontForText } from '@/utils/fontForText';

type VoiceItem = { id: string | null; name: string };

const DEFAULT_ITEM: VoiceItem = { id: null, name: 'صدای پیش‌فرض دستگاه' };

export default function AudioSettingsScreen() {
  const { activeProfile, updateAudioSettings } = useProfiles();
  const settings = useAudioSettings();
  const [voices, setVoices] = useState<EnglishVoice[] | null>(null);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [previewFailed, setPreviewFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadEnglishVoices()
      .then((list) => {
        if (!cancelled) setVoices(list);
      })
      .catch(() => {
        if (!cancelled) {
          setVoices([]);
          setVoiceError('فهرست صداها روی این دستگاه در دسترس نیست.');
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!activeProfile) return null;

  async function save(next: AudioSettings) {
    setSaveError(null);
    const result = await updateAudioSettings(next);
    if (!result.ok) setSaveError(result.error);
  }

  function preview() {
    setPreviewFailed(false);
    speakText(PREVIEW_TEXT, settings, () => setPreviewFailed(true));
  }

  const items: VoiceItem[] = [DEFAULT_ITEM, ...(voices ?? [])];
  const footer = voices === null ? 'در حال بارگذاری صداها…' : voiceError ?? (voices.length === 0 ? 'صدای انگلیسی دیگری روی این دستگاه نیست. صدای پیش‌فرض استفاده می‌شود.' : null);

  return (
    <GradientBackground>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id ?? 'default'}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        initialNumToRender={12}
        windowSize={5}
        ListHeaderComponent={
          <View style={styles.header}>
            <ScreenHeader title="صدا و تلفظ" onBack={() => router.back()} />

            <GlowCard style={styles.card}>
              <Text style={styles.sectionTitle}>سرعت گفتار</Text>
              <View style={styles.speedRow}>
                {SPEED_OPTIONS.map((option) => {
                  const selected = settings.rate === option.rate;
                  return (
                    <Pressable
                      key={option.rate}
                      accessibilityRole="button"
                      accessibilityState={{ selected }}
                      onPress={() => save({ ...settings, rate: option.rate })}
                      style={({ pressed }) => [styles.speedChip, selected && styles.speedChipActive, pressed && styles.pressed]}
                    >
                      <Text style={[styles.speedLabel, selected && styles.speedLabelActive, { fontFamily: fontForText(option.label, 'bold') }]}>
                        {option.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
              <PrimaryButton label="پخش نمونه" onPress={preview} />
              {previewFailed ? (
                <Text style={styles.errorText}>پخش صدا روی این دستگاه انجام نشد.</Text>
              ) : null}
            </GlowCard>

            <Text style={styles.sectionTitle}>انتخاب صدا</Text>
            {saveError ? <Text style={styles.errorText}>{saveError}</Text> : null}
          </View>
        }
        renderItem={({ item }) => {
          const selected = (settings.voiceId ?? null) === item.id;
          return (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => save({ ...settings, voiceId: item.id })}
              style={({ pressed }) => [styles.voiceRow, selected && styles.voiceRowActive, pressed && styles.pressed]}
            >
              <Text style={[styles.voiceName, { fontFamily: fontForText(item.name, 'semiBold') }]} numberOfLines={1}>
                {item.name}
              </Text>
              {selected ? <Check size={18} color={semanticColors.success} strokeWidth={3} /> : null}
            </Pressable>
          );
        }}
        ListFooterComponent={footer ? <Text style={styles.footer}>{footer}</Text> : null}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  header: {
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  card: {
    gap: spacing.sm,
  },
  sectionTitle: {
    ...typography.bodyStrong,
    color: semanticColors.textPrimary,
    textAlign: 'right',
  },
  speedRow: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  speedChip: {
    flex: 1,
    minHeight: 44,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: semanticColors.border,
    backgroundColor: semanticColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  speedChipActive: {
    borderColor: semanticColors.primary,
    backgroundColor: semanticColors.surfaceRaised,
  },
  speedLabel: {
    ...typography.bodyStrong,
    color: semanticColors.textSecondary,
  },
  speedLabelActive: {
    color: semanticColors.textPrimary,
  },
  voiceRow: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: semanticColors.surface,
    borderWidth: 1,
    borderColor: semanticColors.border,
  },
  voiceRowActive: {
    borderColor: semanticColors.success,
  },
  voiceName: {
    ...typography.body,
    flex: 1,
    color: semanticColors.textPrimary,
    textAlign: 'right',
    marginRight: spacing.xs,
  },
  separator: {
    height: spacing.xs,
  },
  pressed: {
    opacity: 0.85,
  },
  errorText: {
    ...typography.caption,
    color: semanticColors.danger,
    textAlign: 'right',
  },
  footer: {
    ...typography.caption,
    color: semanticColors.textMuted,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});
