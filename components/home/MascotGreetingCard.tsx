import { StyleSheet, Text, View } from 'react-native';
import { glow, radius, semanticColors, spacing, colors, fonts } from '@/constants/theme';
import { fontForText } from '@/utils/fontForText';
import { Mascot } from '@/components/mascot/Mascot';

type MascotGreetingCardProps = {
  name: string;
  message: string;
};

export function MascotGreetingCard({ name, message }: MascotGreetingCardProps) {
  return (
    <View style={styles.row}>
      <Mascot width={110} />
      <View style={styles.bubble}>
        <Text style={[styles.greeting, { fontFamily: fontForText(name, 'extraBold') }]}>{`سلام ${name}!`}</Text>
        <Text style={[styles.message, { fontFamily: fontForText(message, 'semiBold') }]}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  bubble: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xxs,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.lg,
    backgroundColor: colors.navy[700],
    borderWidth: 1.5,
    borderColor: colors.gold[400],
    shadowColor: glow.shadowColor,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    elevation: 5,
  },
  greeting: {
    fontFamily: fonts.extraBold,
    fontSize: 22,
    lineHeight: 28,
    color: semanticColors.primary,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  message: {
    fontSize: 15,
    lineHeight: 24,
    color: semanticColors.textSecondary,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
});
