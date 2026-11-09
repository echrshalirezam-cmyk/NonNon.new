import { Image, StyleSheet, View } from 'react-native';
import { User } from 'lucide-react-native';
import { colors } from '@/constants/theme';
import { getAvatar } from '@/constants/avatars';

const eagleFaceSource = require('../../assets/images/mascot/eagle-face.png');

type ProfileAvatarProps = {
  avatarId: string;
  size?: number;
};

export function ProfileAvatar({ avatarId, size = 56 }: ProfileAvatarProps) {
  const avatar = getAvatar(avatarId);
  const circle = { width: size, height: size, borderRadius: size / 2, backgroundColor: avatar.tint };

  if (avatar.kind === 'user') {
    return (
      <View style={[styles.circle, circle]}>
        <User size={size * 0.5} color={colors.neutral[0]} strokeWidth={2} />
      </View>
    );
  }

  return (
    <View style={[styles.circle, circle]}>
      <Image source={eagleFaceSource} style={{ width: size, height: size }} resizeMode="cover" />
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.gold[400],
  },
});
