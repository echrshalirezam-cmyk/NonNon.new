import { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Nunito_400Regular, Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';
import {
  Vazirmatn_400Regular,
  Vazirmatn_500Medium,
  Vazirmatn_700Bold,
} from '@expo-google-fonts/vazirmatn';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { semanticColors } from '@/constants/theme';
import { ProfileProvider } from '@/context/ProfileContext';

export default function RootLayout() {
  useFrameworkReady();

  // Explicitly dismiss Android's native launch screen as soon as the root mounts.
  // Font loading must never keep the native eagle splash visible.
  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hideAsync().catch(() => undefined);
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  useFonts({
    'Nunito-Regular': Nunito_400Regular,
    'Nunito-SemiBold': Nunito_600SemiBold,
    'Nunito-Bold': Nunito_700Bold,
    'Nunito-ExtraBold': Nunito_800ExtraBold,
    'Vazirmatn-Regular': Vazirmatn_400Regular,
    'Vazirmatn-Medium': Vazirmatn_500Medium,
    'Vazirmatn-Bold': Vazirmatn_700Bold,
  });


  return (
    <ProfileProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: semanticColors.background },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="profiles" />
        <Stack.Screen name="profile-editor" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="lesson/[id]" />
        <Stack.Screen name="audio-settings" />
        <Stack.Screen name="diagnostics" />
        <Stack.Screen name="lesson-result" />
        <Stack.Screen name="review" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />
    </ProfileProvider>
  );
}
