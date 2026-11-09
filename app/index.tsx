import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useProfiles } from '@/context/ProfileContext';

export default function StartupDiagnosticsScreen() {
  const { ready, loadFailed, profiles, activeProfile } = useProfiles();
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const startedAt = Date.now();
    const timer = setInterval(() => {
      setSeconds(Math.floor((Date.now() - startedAt) / 1000));
    }, 500);
    return () => clearInterval(timer);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.panel}>
        <Text style={styles.eyebrow}>NONNON • STARTUP CHECK</Text>
        <Text style={styles.title}>صفحه‌ی عیب‌یابی شروع برنامه</Text>
        <Text style={styles.description}>
          این صفحه موقتاً جایگزین انیمیشن آغازین شده تا مشخص شود برنامه تا کدام مرحله اجرا می‌شود.
        </Text>

        <StatusRow label="اجرای کد React Native" value="انجام شد؛ این صفحه نمایش داده شده" ok />
        <StatusRow label="زمان سپری‌شده" value={seconds + ' ثانیه'} />
        <StatusRow label="بارگذاری پروفایل‌ها" value={ready ? (loadFailed ? 'پایان با خطا' : 'پایان یافت') : 'هنوز در حال بارگذاری'} ok={ready && !loadFailed} />
        <StatusRow label="تعداد پروفایل‌ها" value={String(profiles.length)} />
        <StatusRow label="پروفایل فعال" value={activeProfile?.name ?? 'هیچ پروفایل فعالی انتخاب نشده'} />

        {loadFailed ? (
          <Text style={styles.warning}>
            بارگذاری اطلاعات پروفایل با خطا یا وقفه مواجه شده است. دکمه‌ی ورود به پروفایل‌ها را امتحان کنید.
          </Text>
        ) : null}

        <Pressable style={styles.primaryButton} onPress={() => router.replace('/profiles')}>
          <Text style={styles.primaryText}>رفتن به صفحه‌ی پروفایل‌ها</Text>
        </Pressable>

        <Pressable
          style={[styles.secondaryButton, !activeProfile && styles.disabledButton]}
          disabled={!activeProfile}
          onPress={() => router.replace('/(tabs)/home')}
        >
          <Text style={styles.secondaryText}>رفتن مستقیم به صفحه‌ی اصلی</Text>
        </Pressable>

        <Text style={styles.footer}>
          لطفاً از همین صفحه یک اسکرین‌شات بفرست. اگر باز هم فقط تصویر عقاب دیده شود، یعنی اجرای JavaScript به این صفحه نرسیده است.
        </Text>
      </View>
    </ScrollView>
  );
}

function StatusRow({ label, value, ok }: { label: string; value: string; ok?: boolean }) {
  return (
    <View style={styles.row}>
      <View style={[styles.dot, ok ? styles.dotOk : styles.dotWait]} />
      <View style={styles.rowText}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#060D24',
  },
  panel: {
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
    borderRadius: 22,
    padding: 22,
    backgroundColor: '#101D3D',
    borderWidth: 1,
    borderColor: '#34466F',
    gap: 14,
  },
  eyebrow: {
    color: '#F5C65B',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: '800',
    textAlign: 'right',
  },
  description: {
    color: '#C5D0E8',
    fontSize: 14,
    lineHeight: 23,
    textAlign: 'right',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: '#26385F',
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginTop: 5,
  },
  dotOk: { backgroundColor: '#42D69A' },
  dotWait: { backgroundColor: '#F5C65B' },
  rowText: { flex: 1, gap: 3 },
  label: {
    color: '#9EAFD2',
    fontSize: 12,
    textAlign: 'right',
  },
  value: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'right',
  },
  warning: {
    color: '#FFD38A',
    backgroundColor: '#49351E',
    padding: 12,
    borderRadius: 10,
    textAlign: 'right',
    lineHeight: 22,
  },
  primaryButton: {
    marginTop: 8,
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#D6A83D',
  },
  primaryText: { color: '#10182D', fontSize: 15, fontWeight: '800' },
  secondaryButton: {
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#7488B5',
  },
  disabledButton: { opacity: 0.35 },
  secondaryText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  footer: {
    marginTop: 4,
    color: '#9EAFD2',
    fontSize: 12,
    lineHeight: 20,
    textAlign: 'right',
  },
});
