import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { colors, fonts, glow, semanticColors, spacing, typography } from '@/constants/theme';
import { GradientBackground } from '@/components/ui/GradientBackground';
import { useProfiles } from '@/context/ProfileContext';
const officialIcon = require('../assets/images/splash-icon.png');

const LOAD_DURATION_MS = 2400;

export default function SplashScreen() {
  const progress = useSharedValue(0);
  const [animationFinished, setAnimationFinished] = useState(false);
  const { ready, activeProfile } = useProfiles();

  useEffect(() => {
    progress.value = withTiming(1, { duration: LOAD_DURATION_MS }, (finished) => {
      if (finished) runOnJS(setAnimationFinished)(true);
    });
  }, [progress]);

  useEffect(() => {
    if (!animationFinished || !ready) return;
    router.replace(activeProfile ? '/(tabs)/home' : '/profiles');
  }, [animationFinished, ready, activeProfile]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <GradientBackground stops={[colors.navy[950], colors.navy[900], colors.royal[800]]}>
      <LinearGradient
        colors={['rgba(255, 201, 60, 0.22)', 'rgba(255, 201, 60, 0)']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.6 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.content}>
        <View style={styles.hero}>
          <Image source={officialIcon} style={styles.splashIcon} resizeMode="contain" />
        </View>

        <View style={styles.brand}>
          <Text style={styles.logo}>NonNon</Text>
          <Text style={styles.tagline}>Learn English, Fly High!</Text>
        </View>

        <View style={styles.loader}>
          <Text style={styles.loadingText}>Loading...</Text>
          <View style={styles.track}>
            <Animated.View style={[styles.fill, fillStyle]}>
              <LinearGradient
                colors={[colors.gold[300], colors.gold[500]]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFill}
              />
            </Animated.View>
          </View>
        </View>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  hero: {
    flex: 1,
    justifyContent: 'center',
  },
  splashIcon: {
    width: 260,
    height: 260,
    borderRadius: 48,
  },
  brand: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  logo: {
    fontFamily: fonts.extraBold,
    fontSize: 60,
    lineHeight: 66,
    color: semanticColors.primary,
    textShadowColor: 'rgba(255, 201, 60, 0.6)',
    textShadowRadius: 16,
    textShadowOffset: { width: 0, height: 0 },
  },
  tagline: {
    fontFamily: fonts.extraBold,
    fontSize: 20,
    lineHeight: 28,
    color: semanticColors.textPrimary,
    textAlign: 'center',
  },
  loader: {
    width: 200,
    alignItems: 'center',
    gap: spacing.xs,
  },
  loadingText: {
    ...typography.label,
    color: semanticColors.textSecondary,
  },
  track: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  fill: {
    height: '100%',
    borderRadius: 4,
    overflow: 'hidden',
    shadowColor: glow.shadowColor,
    shadowOpacity: glow.shadowOpacity,
    shadowRadius: 8,
    shadowOffset: glow.shadowOffset,
  },
});
