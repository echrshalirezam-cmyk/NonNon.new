import { fonts } from '@/constants/theme';

type FontWeight = 'regular' | 'semiBold' | 'bold' | 'extraBold';

const PERSIAN_PATTERN = /[\u0600-\u06FF]/;

const englishFonts: Record<FontWeight, string> = {
  regular: fonts.regular,
  semiBold: fonts.semiBold,
  bold: fonts.bold,
  extraBold: fonts.extraBold,
};

const persianFonts: Record<FontWeight, string> = {
  regular: fonts.persianRegular,
  semiBold: fonts.persianMedium,
  bold: fonts.persianBold,
  extraBold: fonts.persianBold,
};

export function fontForText(text: string, weight: FontWeight): string {
  return PERSIAN_PATTERN.test(text) ? persianFonts[weight] : englishFonts[weight];
}
