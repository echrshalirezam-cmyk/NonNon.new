import { StyleSheet, Text, View } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';
import { semanticColors, spacing, typography } from '@/constants/theme';
import { GlowCard } from '@/components/ui/GlowCard';

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <GlowCard style={styles.card}>
      <View style={styles.iconWrap}>
        <Icon size={32} color={semanticColors.primary} strokeWidth={2} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </GlowCard>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.xs,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: semanticColors.surfaceRaised,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.heading,
    color: semanticColors.textPrimary,
    textAlign: 'center',
  },
  description: {
    ...typography.caption,
    color: semanticColors.textSecondary,
    textAlign: 'center',
  },
});
