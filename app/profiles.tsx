import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Crown, Plus } from 'lucide-react-native';
import { fonts, semanticColors, spacing, typography } from '@/constants/theme';
import { useProfiles } from '@/context/ProfileContext';
import { GradientBackground } from '@/components/ui/GradientBackground';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { ProfileCard } from '@/components/profiles/ProfileCard';
import { Mascot } from '@/components/mascot/Mascot';

export default function ProfilesScreen() {
  const { ready, loadFailed, profiles, activeProfile, selectProfile } = useProfiles();

  const openProfile = (id: string) => {
    selectProfile(id);
    router.replace('/(tabs)/home');
  };

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.brand}>
          <Crown size={32} color={semanticColors.accent} fill={semanticColors.accent} strokeWidth={1.5} />
          <Text style={styles.logo}>nonnon</Text>
        </View>

        <Text style={styles.heading}>انتخاب کاربر</Text>

        <View style={styles.mascot}>
          <Mascot width={120} />
        </View>

        {loadFailed ? (
          <Text style={styles.error}>بارگذاری پروفایل‌ها انجام نشد. برنامه را دوباره باز کنید.</Text>
        ) : null}

        {ready && !loadFailed && profiles.length === 0 ? (
          <Text style={styles.empty}>هنوز پروفایلی ساخته نشده است.</Text>
        ) : null}

        <View style={styles.list}>
          {profiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              selected={profile.id === activeProfile?.id}
              onPress={() => openProfile(profile.id)}
              onEdit={() => router.push({ pathname: '/profile-editor', params: { id: profile.id } })}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <PrimaryButton
            label="ساخت پروفایل جدید"
            disabled={!ready}
            icon={<Plus size={22} color={semanticColors.onPrimary} strokeWidth={2.5} />}
            onPress={() => router.push('/profile-editor')}
          />
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    gap: spacing.md,
  },
  brand: {
    alignItems: 'center',
    gap: spacing.xxs,
  },
  logo: {
    fontFamily: fonts.extraBold,
    fontSize: 40,
    lineHeight: 46,
    color: semanticColors.primary,
    textShadowColor: 'rgba(255, 201, 60, 0.5)',
    textShadowRadius: 12,
    textShadowOffset: { width: 0, height: 0 },
  },
  heading: {
    ...typography.title,
    fontFamily: 'Vazirmatn-Bold',
    color: semanticColors.textPrimary,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  mascot: {
    alignItems: 'center',
  },
  error: {
    ...typography.caption,
    color: semanticColors.danger,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  empty: {
    ...typography.body,
    color: semanticColors.textSecondary,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  list: {
    gap: spacing.xs,
  },
  footer: {
    marginTop: spacing.xs,
  },
});
