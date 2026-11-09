import { StyleSheet, View, type ViewProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/theme';

type GradientStops = readonly [string, string, ...string[]];

const defaultStops: GradientStops = [colors.navy[900], colors.navy[800], colors.royal[800]];

type GradientBackgroundProps = ViewProps & {
  stops?: GradientStops;
  locations?: readonly number[];
};

export function GradientBackground({ style, children, stops = defaultStops, locations, ...rest }: GradientBackgroundProps) {
  return (
    <View style={[styles.root, style]} {...rest}>
      <LinearGradient
        colors={stops}
        locations={locations as [number, number, ...number[]] | undefined}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.navy[900],
  },
});
