import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { colors, fonts, glow, semanticColors, spacing, typography } from '@/constants/theme';
import { GradientBackground } from '@/components/ui/GradientBackground';
import { useProfiles } from '@/context/ProfileContext';

const officialIcon = require('../assets/images/splash-icon.png');
const LOAD_DURATION_MS = 2600;

export default function SplashScreen() {
  const progress = useSharedValue(0);
  const mascotOpacity = useSharedValue(0);
  const mascotScale = useSharedValue(0.72);
  const mascotY = useSharedValue(28);
  const brandOpacity = useSharedValue(0);
  const brandY = useSharedValue(18);
  const loaderOpacity = useSharedValue(0);
  const [animationDone, setAnimationDone] = useState(false);
  const { ready, activeProfile } = useProfiles();

  useEffect(() => {
    let fallback: ReturnType<typeof setTimeout> | undefined;

    mascotOpacity.value = withDelay(100, withTiming(1, { duration: 520 }));
    mascotScale.value = withDelay(100, withSpring(1, { damping: 11, stiffness: 105, mass: 0.8 }));
    mascotY.value = withDelay(100, withSpring(0, { damping: 13, stiffness: 90 }));
    brandOpacity.value = withDelay(480, withTiming(1, { duration: 500 }));
    brandY.value = withDelay(480, withSpring(0, { damping: 15, stiffness: 100 }));
    loaderOpacity.value = withDelay(850, withTiming(1, { duration: 450 }));

    progress.value = withDelay(850, withTiming(1, { duration: LOAD_DURATION_MS }, (finished) => {
      if (finished) runOnJS(setAnimationDone)(true);
    }));

    // Navigation has a JS fallback in case an animation callback is interrupted.
    fallback = setTimeout(() => setAnimationDone(true), LOAD_DURATION_MS + 1800);
    return () => {
      if (fallback) clearTimeout(fallback);
    };
  }, [progress, mascotOpacity, mascotScale, mascotY, brandOpacity, brandY, loaderOpacity]);

  useEffect(() => {
    if (!animationDone || !ready) return;
    router.replace(activeProfile ? '/(tabs)/home' : '/profiles');
  }, [animationDone, ready, activeProfile]);

  const mascotStyle = useAnimatedStyle(() => ({
    opacity: mascotOpacity.value,
    transform: [{ translateY: mascotY.value }, { scale: mascotScale.value }],
  }));
  const brandStyle = useAnimatedStyle(() => ({
    opacity: brandOpacity.value,
    transform: [{ translateY: brandY.value }],
  }));
  const loaderStyle = useAnimatedStyle(() => ({ opacity: loaderOpacity.value }));
  const fillStyle = useAnimatedStyle(() => ({ width: `${progress.value * 100}%` }));

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
          <View style={styles.haloOuter} />
          <View style={styles.haloInner} />
          <Animated.Image source={officialIcon} style={[styles.splashIcon, mascotStyle]} resizeMode="contain" />
          <View style={[styles.sparkle, styles.sparkleTop]} />
          <View style={[styles.sparkle, styles.sparkleLeft]} />
          <View style={[styles.sparkle, styles.sparkleRight]} />
        </View>

        <Animated.View style={[styles.brand, brandStyle]}>
          <Text style={styles.logo}>NonNon</Text>
          <Text style={styles.tagline}>Learn English, Fly High!</Text>
        </Animated.View>

        <Animated.View style={[styles.loader, loaderStyle]}>
          <Text style={styles.loadingText}>آماده‌ی پرواز...</Text>
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
        </Animated.View>
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
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  haloOuter: {
    position: 'absolute',
    width: 292,
    height: 292,
    borderRadius: 146,
    borderWidth: 1,
    borderColor: 'rgba(255, 201, 60, 0.22)',
    backgroundColor: 'rgba(255, 201, 60, 0.035)',
  },
  haloInner: {
    position: 'absolute',
    width: 252,
    height: 252,
    borderRadius: 126,
    borderWidth: 1,
    borderColor: 'rgba(255, 201, 60, 0.35)',
  },
  splashIcon: {
    width: 250,
    height: 250,
    borderRadius: 48,
  },
  sparkle: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.gold[300],
    shadowColor: glow.shadowColor,
    shadowOpacity: 0.9,
    shadowRadius: 12,
    elevation: 5,
  },
  sparkleTop: { top: '20%', right: '29%' },
  sparkleLeft: { top: '48%', left: '15%', width: 6, height: 6 },
  sparkleRight: { bottom: '22%', right: '17%', width: 5, height: 5 },
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
    minHeight: 38,
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
