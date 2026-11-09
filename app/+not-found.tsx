import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { fonts, semanticColors, spacing, typography } from '@/constants/theme';
import { GradientBackground } from '@/components/ui/GradientBackground';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <GradientBackground>
        <View style={styles.container}>
          <Text style={styles.title}>This page doesn't exist.</Text>
          <Link href="/" style={styles.link}>
            <Text style={styles.linkText}>Go to home screen</Text>
          </Link>
        </View>
      </GradientBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
  },
  title: {
    ...typography.heading,
    color: semanticColors.textPrimary,
  },
  link: {
    marginTop: spacing.sm,
    paddingVertical: spacing.xs,
  },
  linkText: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: semanticColors.primary,
  },
});
