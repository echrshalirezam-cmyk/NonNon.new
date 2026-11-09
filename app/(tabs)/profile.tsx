import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Activity, Crown, LogOut, Mic, Pencil, Volume2 } from 'lucide-react-native';
import { colors, radius, semanticColors, spacing, typography } from '@/constants/theme';
import { fontForText } from '@/utils/fontForText';
import { dateKey } from '@/utils/dateKeys';
import { computeStats } from '@/utils/stats';
import { useProfiles } from '@/context/ProfileContext';
import { useAudioSettings } from '@/hooks/useAudioSettings';
import { GradientBackground } from '@/components/ui/GradientBackground';
import { GlowCard } from '@/components/ui/GlowCard';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { ListRow } from '@/components/ui/ListRow';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { ProfileAvatar } from '@/components/profiles/ProfileAvatar';
import { StatsCard } from '@/components/profiles/StatsCard';

export default function SettingsScreen() {
  const { activeProfile, updateAudioSettings, clearActiveProfile } = useProfiles();
  const audio = useAudioSettings();
  const stats = useMemo(
    () => (activeProfile ? computeStats(activeProfile.progress, dateKey(new Date())) : null),
    [activeProfile],
  );

  if (!activeProfile || !stats) return null;

  const handleLogout = async () => {
    const result = await clearActiveProfile();
    if (result.ok) router.replace('/profiles');
  };

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="تنظیمات" />

        <GlowCard style={styles.profileCard}>
          <ProfileAvatar avatarId={activeProfile.avatarId} size={64} />
          <View style={styles.profileTexts}>
            <Text style={[styles.profileName, { fontFamily: fontForText(activeProfile.name, 'bold') }]}>
              {activeProfile.name}
            </Text>
            <View style={styles.levelRow}>
              <Crown size={16} color={semanticColors.accent} fill={semanticColors.accent} strokeWidth={1.5} />
              <Text style={[styles.levelText, { fontFamily: fontForText(activeProfile.progress.learningLevel, 'semiBold') }]}>
                {`سطح ${activeProfile.progress.learningLevel}`}
              </Text>
            </View>
          </View>
        </GlowCard>

        <StatsCard stats={stats} />

        <View style={styles.section}>
          <ListRow
            icon={Pencil}
            label="ویرایش پروفایل"
            onPress={() => router.push({ pathname: '/profile-editor', params: { id: activeProfile.id } })}
          />
          <ListRow
            icon={Volume2}
            label="صداها"
            switchValue={audio.enabled}
            onSwitchChange={(enabled) => updateAudioSettings({ ...audio, enabled })}
          />
          <ListRow icon={Mic} label="صدا و تلفظ" onPress={() => router.push('/audio-settings')} />
          <ListRow icon={Activity} label="عیب‌یابی میکروفون" onPress={() => router.push('/diagnostics')} />
        </View>

        <PrimaryButton
          label="خروج از حساب کاربری"
          icon={<LogOut size={20} color={colors.neutral[0]} strokeWidth={2.2} />}
          onPress={handleLogout}
        />
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
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.sm,
  },
  profileTexts: {
    flex: 1,
    alignItems: 'flex-end',
    gap: spacing.xxs,
  },
  profileName: {
    ...typography.heading,
    color: semanticColors.textPrimary,
  },
  levelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
  },
  levelText: {
    ...typography.caption,
    color: semanticColors.textSecondary,
  },
  section: {
    borderRadius: radius.lg,
    backgroundColor: semanticColors.surface,
    borderWidth: 1,
    borderColor: semanticColors.border,
    overflow: 'hidden',
  },
});
