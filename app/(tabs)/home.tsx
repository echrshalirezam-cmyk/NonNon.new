import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { BookOpen, Gift, Heart, Settings, Star, Trophy, Coins, Dumbbell } from 'lucide-react-native';
import { colors, fonts, semanticColors, spacing } from '@/constants/theme';
import { useProfiles } from '@/context/ProfileContext';
import { GradientBackground } from '@/components/ui/GradientBackground';
import { StatPill } from '@/components/ui/StatPill';
import { MascotGreetingCard } from '@/components/home/MascotGreetingCard';
import { LearningPathCard } from '@/components/home/LearningPathCard';
import { ActionTile } from '@/components/home/ActionTile';

const homeGradient = [colors.navy[950], colors.navy[900], colors.royal[800], colors.navy[800]] as const;

export default function HomeScreen() {
  const { activeProfile } = useProfiles();
  if (!activeProfile) return null;
  const { progress } = activeProfile;

  return (
    <GradientBackground stops={homeGradient} locations={[0, 0.45, 0.75, 1]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Settings"
            onPress={() => router.navigate('/(tabs)/profile')}
            style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
          >
            <Settings size={22} color={semanticColors.textPrimary} strokeWidth={2} />
          </Pressable>
          <Text style={styles.logo}>NonNon</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Leaderboard"
            onPress={() => router.navigate('/(tabs)/leaderboard')}
            style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
          >
            <Trophy size={22} color={semanticColors.accent} fill={semanticColors.accent} strokeWidth={1.5} />
          </Pressable>
        </View>

        <View style={styles.stats}>
          <StatPill
            icon={<Heart size={18} color={semanticColors.heart} fill={semanticColors.heart} strokeWidth={1.5} />}
            value={String(progress.hearts)}
          />
          <StatPill
            icon={<Star size={18} color={colors.gold[400]} fill={colors.gold[400]} strokeWidth={1.5} />}
            value={progress.xp.toLocaleString('en-US')}
          />
          <StatPill
            icon={<Coins size={18} color={semanticColors.coin} strokeWidth={2} />}
            value={String(progress.coins)}
          />
        </View>

        <MascotGreetingCard name={activeProfile.name} message="آماده یادگیری هستی؟" />

        <LearningPathCard
          title="مسیر یادگیری"
          subtitle={`سطح ${progress.learningLevel}`}
          onPress={() => router.navigate('/(tabs)/lessons')}
        />

        <View style={styles.grid}>
          <ActionTile
            icon={BookOpen}
            label="درس‌ها"
            colorStart={colors.royal[500]}
            colorEnd={colors.royal[800]}
            onPress={() => router.navigate('/(tabs)/lessons')}
          />
          <ActionTile
            icon={Dumbbell}
            label="تمرین‌ها"
            colorStart={colors.royal[600]}
            colorEnd={colors.navy[700]}
            onPress={() => router.navigate('/(tabs)/lessons')}
          />
          <ActionTile
            icon={Trophy}
            label="رتبه‌بندی"
            colorStart={colors.gold[400]}
            colorEnd={colors.gold[600]}
            onPress={() => router.navigate('/(tabs)/leaderboard')}
          />
          <ActionTile
            icon={Gift}
            label="پاداش‌ها"
            colorStart={colors.royal[400]}
            colorEnd={colors.royal[700]}
            onPress={() => router.navigate('/(tabs)/rewards')}
          />
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    gap: spacing.sm,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: -spacing.sm,
    marginTop: -spacing.md,
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.md,
    paddingBottom: spacing.xs,
    backgroundColor: 'rgba(6, 13, 36, 0.85)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 201, 60, 0.35)',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: semanticColors.surfaceRaised,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  logo: {
    fontFamily: fonts.extraBold,
    fontSize: 34,
    lineHeight: 40,
    color: semanticColors.primary,
    textShadowColor: 'rgba(255, 201, 60, 0.5)',
    textShadowRadius: 10,
    textShadowOffset: { width: 0, height: 0 },
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
});
