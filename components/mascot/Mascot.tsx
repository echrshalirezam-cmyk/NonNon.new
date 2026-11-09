import { Image } from 'react-native';

const eagleSource = require('../../assets/images/mascot/eagle-mascot.png');

const ASPECT_HEIGHT_RATIO = 420 / 400;

type MascotProps = {
  width: number;
};

export function Mascot({ width }: MascotProps) {
  return (
    <Image
      source={eagleSource}
      style={{ width, height: width * ASPECT_HEIGHT_RATIO }}
      resizeMode="contain"
    />
  );
}
