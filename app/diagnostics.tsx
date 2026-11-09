import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { ExpoSpeechRecognitionModule } from 'expo-speech-recognition';
import { Activity, CheckCircle2, Mic, MicOff, XCircle, Volume2 } from 'lucide-react-native';
import { colors, radius, semanticColors, spacing, typography } from '@/constants/theme';
import { fontForText } from '@/utils/fontForText';
import { listenForWord, type ListenResult } from '@/utils/pronunciation';
import { GradientBackground } from '@/components/ui/GradientBackground';
import { GlowCard } from '@/components/ui/GlowCard';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PrimaryButton } from '@/components/ui/PrimaryButton';

type CheckStatus = 'idle' | 'checking' | 'pass' | 'fail';

type CheckRow = {
  id: string;
  label: string;
  status: CheckStatus;
  detail: string;
};

type Subscription = { remove: () => void };

const initialChecks: CheckRow[] = [
  { id: 'module', label: 'ماژول تشخیص گفتار', status: 'idle', detail: 'بررسی در دسترس بودن ماژول' },
  { id: 'recognition', label: 'سرویس تشخیص گفتار', status: 'idle', detail: 'بررسی در دسترس بودن سرویس' },
  { id: 'permission', label: 'دسترسی میکروفون', status: 'idle', detail: 'بررسی یا درخواست دسترسی' },
  { id: 'recording', label: 'ضبط صدا', status: 'idle', detail: 'بررسی امکان ضبط' },
  { id: 'ondevice', label: 'تشخیص آفلاین', status: 'idle', detail: 'بررسی تشخیص روی دستگاه' },
];

export default function DiagnosticsScreen() {
  const [checks, setChecks] = useState<CheckRow[]>(initialChecks);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [listenResult, setListenResult] = useState<ListenResult | null>(null);
  const [speechState, setSpeechState] = useState<string>('نامشخص');

  useEffect(() => {
    runChecks();
    let sub: Subscription | null = null;
    try {
      sub = ExpoSpeechRecognitionModule.addListener('end', () => setListening(false));
    } catch {
      // listener not available on this platform
    }
    return () => {
      sub?.remove();
    };
  }, []);

  function updateCheck(id: string, status: CheckStatus, detail: string) {
    setChecks((prev) => prev.map((c) => (c.id === id ? { ...c, status, detail } : c)));
  }

  async function runChecks() {
    setChecks(initialChecks.map((c) => ({ ...c, status: 'checking' })));

    let moduleAvailable = false;
    try {
      moduleAvailable = typeof ExpoSpeechRecognitionModule?.start === 'function';
      updateCheck('module', moduleAvailable ? 'pass' : 'fail', moduleAvailable ? 'ماژول بارگذاری شد' : 'ماژول در دسترس نیست');
    } catch {
      updateCheck('module', 'fail', 'خطا در بارگذاری ماژول');
    }

    let recognitionAvailable = false;
    try {
      recognitionAvailable = moduleAvailable && ExpoSpeechRecognitionModule.isRecognitionAvailable();
      updateCheck('recognition', recognitionAvailable ? 'pass' : 'fail', recognitionAvailable ? 'سرویس در دسترس است' : 'سرویس در دسترس نیست');
    } catch {
      updateCheck('recognition', 'fail', 'خطا در بررسی سرویس');
    }

    try {
      const current = await ExpoSpeechRecognitionModule.getPermissionsAsync();
      if (current.granted) {
        updateCheck('permission', 'pass', 'دسترسی داده شده است');
      } else {
        updateCheck('permission', 'checking', 'در حال درخواست دسترسی…');
        const requested = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
        updateCheck('permission', requested.granted ? 'pass' : 'fail', requested.granted ? 'دسترسی داده شد' : 'دسترسی رد شد');
      }
    } catch {
      updateCheck('permission', 'fail', 'خطا در بررسی دسترسی');
    }

    try {
      const recording = moduleAvailable && ExpoSpeechRecognitionModule.supportsRecording();
      updateCheck('recording', recording ? 'pass' : 'fail', recording ? 'ضبط پشتیبانی می‌شود' : 'ضبط پشتیبانی نمی‌شود');
    } catch {
      updateCheck('recording', 'fail', 'خطا در بررسی ضبط');
    }

    try {
      const onDevice = moduleAvailable && ExpoSpeechRecognitionModule.supportsOnDeviceRecognition();
      updateCheck('ondevice', onDevice ? 'pass' : 'fail', onDevice ? 'تشخیص آفلاین در دسترس است' : 'تشخیص آفلاین در دسترس نیست');
    } catch {
      updateCheck('ondevice', 'fail', 'خطا در بررسی تشخیص آفلاین');
    }
  }

  async function handleListen() {
    if (listening) return;
    setListening(true);
    setTranscript(null);
    setListenResult(null);
    try {
      const state = await ExpoSpeechRecognitionModule.getStateAsync();
      setSpeechState(translateState(state));
    } catch {
      setSpeechState('نامشخص');
    }
    const result = await listenForWord();
    setListenResult(result);
    if (result.ok) setTranscript(result.transcript);
    setListening(false);
  }

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="عیب‌یابی میکروفون" onBack={() => router.back()} />

        <GlowCard style={styles.card}>
          <View style={styles.cardHeader}>
            <Activity size={20} color={semanticColors.primary} strokeWidth={2} />
            <Text style={[styles.cardTitle, { fontFamily: fontForText('بررسی‌های سیستم', 'bold') }]}>بررسی‌های سیستم</Text>
          </View>
          <View style={styles.checkList}>
            {checks.map((check) => (
              <CheckRowItem key={check.id} check={check} />
            ))}
          </View>
          <PrimaryButton label="اجرای مجدد بررسی‌ها" onPress={runChecks} disabled={checks.some((c) => c.status === 'checking')} />
        </GlowCard>

        <GlowCard style={styles.card}>
          <View style={styles.cardHeader}>
            <Mic size={20} color={semanticColors.primary} strokeWidth={2} />
            <Text style={[styles.cardTitle, { fontFamily: fontForText('تست ضبط گفتار', 'bold') }]}>تست ضبط گفتار</Text>
          </View>
          <Text style={styles.hint}>دکمه را بزنید و یک کلمه انگلیسی بگویید.</Text>
          <PrimaryButton
            label={listening ? 'در حال شنیدن…' : 'شروع تست'}
            icon={<Mic size={20} color={colors.neutral[0]} strokeWidth={2.2} />}
            onPress={handleListen}
            disabled={listening}
          />
          {speechState !== 'نامشخص' ? (
            <View style={styles.stateRow}>
              <Text style={styles.stateLabel}>وضعیت تشخیص:</Text>
              <Text style={[styles.stateValue, { fontFamily: fontForText(speechState, 'semiBold') }]}>{speechState}</Text>
            </View>
          ) : null}
          {transcript ? (
            <View style={styles.resultBox}>
              <Volume2 size={18} color={semanticColors.info} strokeWidth={2} />
              <Text style={[styles.resultText, { fontFamily: fontForText(transcript, 'regular') }]}>{`شنیده شد: "${transcript}"`}</Text>
            </View>
          ) : null}
          {listenResult && !listenResult.ok ? (
            <View style={[styles.resultBox, styles.resultBoxFail]}>
              <XCircle size={18} color={semanticColors.danger} strokeWidth={2} />
              <Text style={[styles.resultText, { fontFamily: fontForText(describeResult(listenResult), 'regular') }]}>
                {describeResult(listenResult)}
              </Text>
            </View>
          ) : null}
          {listenResult && listenResult.ok ? (
            <View style={[styles.resultBox, styles.resultBoxOk]}>
              <CheckCircle2 size={18} color={semanticColors.success} strokeWidth={2} />
              <Text style={[styles.resultText, { fontFamily: fontForText('تشخیص گفتار کار کرد.', 'regular') }]}>تشخیص گفتار کار کرد.</Text>
            </View>
          ) : null}
        </GlowCard>
      </ScrollView>
    </GradientBackground>
  );
}

function describeResult(result: Extract<ListenResult, { ok: false }>): string {
  const messages: Record<Exclude<ListenResult, { ok: true }>['reason'], string> = {
    unsupported: 'تشخیص گفتار روی این دستگاه در دسترس نیست.',
    denied: 'دسترسی میکروفون داده نشد. تنظیمات دستگاه را بررسی کنید.',
    silent: 'صدایی شنیده نشد. دوباره تلاش کنید.',
    failed: 'تشخیص گفتار با خطا مواجه شد.',
  };
  return messages[result.reason];
}

function translateState(state: string): string {
  const map: Record<string, string> = {
    inactive: 'غیرفعال',
    starting: 'در حال شروع',
    recognizing: 'در حال تشخیص',
    stopping: 'در حال توقف',
  };
  return map[state] ?? state;
}

function CheckRowItem({ check }: { check: CheckRow }) {
  const icon = () => {
    switch (check.status) {
      case 'pass':
        return <CheckCircle2 size={22} color={semanticColors.success} strokeWidth={2} />;
      case 'fail':
        return <XCircle size={22} color={semanticColors.danger} strokeWidth={2} />;
      case 'checking':
        return <Activity size={20} color={semanticColors.accent} strokeWidth={2} />;
      default:
        return <MicOff size={20} color={semanticColors.textMuted} strokeWidth={2} />;
    }
  };

  return (
    <View style={styles.checkRow}>
      {icon()}
      <View style={styles.checkTexts}>
        <Text style={[styles.checkLabel, { fontFamily: fontForText(check.label, 'semiBold') }]}>{check.label}</Text>
        <Text style={[styles.checkDetail, { fontFamily: fontForText(check.detail, 'regular') }]}>{check.detail}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    gap: spacing.md,
  },
  card: {
    gap: spacing.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  cardTitle: {
    ...typography.heading,
    color: semanticColors.textPrimary,
  },
  checkList: {
    gap: spacing.xs,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  checkTexts: {
    flex: 1,
    alignItems: 'flex-end',
    gap: 2,
  },
  checkLabel: {
    ...typography.bodyStrong,
    color: semanticColors.textPrimary,
    textAlign: 'right',
  },
  checkDetail: {
    ...typography.caption,
    color: semanticColors.textSecondary,
    textAlign: 'right',
  },
  hint: {
    ...typography.caption,
    color: semanticColors.textMuted,
    textAlign: 'right',
  },
  stateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.xs,
  },
  stateLabel: {
    ...typography.caption,
    color: semanticColors.textSecondary,
  },
  stateValue: {
    ...typography.bodyStrong,
    color: semanticColors.info,
  },
  resultBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.md,
    backgroundColor: semanticColors.surfaceRaised,
  },
  resultBoxOk: {
    backgroundColor: semanticColors.successTint,
  },
  resultBoxFail: {
    backgroundColor: semanticColors.dangerTint,
  },
  resultText: {
    ...typography.caption,
    flex: 1,
    color: semanticColors.textPrimary,
    textAlign: 'right',
  },
});
