import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Volume2, VolumeX } from 'lucide-react-native';
import { colors, semanticColors } from '@/constants/theme';
import { useAudioSettings } from '@/hooks/useAudioSettings';
import { speakText } from '@/utils/speech';

type SpeakButtonProps = {
  text: string;
  size?: number;
};

export function SpeakButton({ text, size = 44 }: SpeakButtonProps) {
  const settings = useAudioSettings();
  const [failed, setFailed] = useState(false);
  const iconSize = size * 0.5;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={failed ? `Audio unavailable for ${text}` : `Play ${text}`}
      onPress={() => {
        setFailed(false);
        speakText(text, settings, () => setFailed(true));
      }}
      style={({ pressed }) => [
        styles.button,
        { width: size, height: size, borderRadius: size / 2 },
        failed && styles.failed,
        pressed && styles.pressed,
      ]}
    >
      {failed ? (
        <VolumeX size={iconSize} color={semanticColors.textPrimary} strokeWidth={2.2} />
      ) : (
        <Volume2 size={iconSize} color={semanticColors.onPrimary} strokeWidth={2.2} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.royal[500],
  },
  failed: {
    backgroundColor: semanticColors.surfaceRaised,
    borderWidth: 1,
    borderColor: semanticColors.border,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.96 }],
  },
});
