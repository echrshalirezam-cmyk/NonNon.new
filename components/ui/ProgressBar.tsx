import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radius } from '@/constants/theme';

type ProgressBarProps = {
  progress: number;
  height?: number;
};

export function ProgressBar({ progress, height = 10 }: ProgressBarProps) {
  const clamped = Math.min(1, Math.max(0, progress));

  return (
    <View style={[styles.track, { height, borderRadius: height / 2 }]}>
      <LinearGradient
        colors={[colors.gold[300], colors.gold[500]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.fill, { width: `${clamped * 100}%`, borderRadius: height / 2 }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  fill: {
    height: '100%',
  },
});
