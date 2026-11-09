import { Redirect, Tabs } from 'expo-router';
import { BookOpen, Gift, House, Trophy, UserRound } from 'lucide-react-native';
import { colors, fonts, semanticColors } from '@/constants/theme';
import { useProfiles } from '@/context/ProfileContext';

export default function TabLayout() {
  const { ready, activeProfile } = useProfiles();

  if (!ready) return null;
  if (!activeProfile) return <Redirect href="/profiles" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: semanticColors.primary,
        tabBarInactiveTintColor: semanticColors.textMuted,
        tabBarStyle: {
          backgroundColor: semanticColors.tabBar,
          borderTopColor: colors.navy[600],
          borderTopWidth: 1,
          height: 72,
          paddingTop: 8,
          paddingBottom: 12,
        },
        tabBarLabelStyle: {
          fontFamily: fonts.persianMedium,
          fontSize: 11,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'خانه',
          tabBarIcon: ({ color, size }) => <House color={color} size={size} strokeWidth={2} />,
        }}
      />
      <Tabs.Screen
        name="lessons"
        options={{
          title: 'درس‌ها',
          tabBarIcon: ({ color, size }) => <BookOpen color={color} size={size} strokeWidth={2} />,
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'رتبه‌بندی',
          tabBarIcon: ({ color, size }) => <Trophy color={color} size={size} strokeWidth={2} />,
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          title: 'پاداش‌ها',
          tabBarIcon: ({ color, size }) => <Gift color={color} size={size} strokeWidth={2} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'حساب کاربری',
          tabBarIcon: ({ color, size }) => <UserRound color={color} size={size} strokeWidth={2} />,
        }}
      />
    </Tabs>
  );
}
