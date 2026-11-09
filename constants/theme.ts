export const colors = {
  navy: {
    950: '#060D24',
    900: '#0A1433',
    800: '#101C47',
    700: '#172759',
    600: '#22336E',
  },
  royal: {
    300: '#8FB3FF',
    400: '#5A8DFF',
    500: '#2F6BFF',
    600: '#1F55E0',
    700: '#1842B3',
    800: '#122F82',
  },
  gold: {
    200: '#FFF0B3',
    300: '#FFDD66',
    400: '#FFC93C',
    500: '#F5B325',
    600: '#D99410',
    700: '#A86F0A',
  },
  success: { 300: '#6EE7B7', 500: '#34D399', 700: '#047857' },
  warning: { 300: '#FDE68A', 500: '#FBBF24', 700: '#B45309' },
  error: { 300: '#FCA5A5', 500: '#F87171', 700: '#B91C1C' },
  levels: {
    A1: '#34D399',
    A2: '#2F6BFF',
    B1: '#FFC93C',
    B2: '#F97316',
    C1: '#FF5C7A',
    C2: '#8FB3FF',
  },
  neutral: {
    0: '#FFFFFF',
    50: '#F4F7FF',
    100: '#E6ECFB',
    300: '#A9B8DD',
    500: '#7F8FB8',
    700: '#3A4A7A',
  },
  ink: {
    900: '#0F1D4A',
    600: '#4A5A86',
  },
} as const;

export const semanticColors = {
  background: colors.navy[900],
  surface: colors.navy[800],
  surfaceRaised: colors.navy[700],
  surfaceLight: colors.neutral[0],
  surfaceLightTint: colors.neutral[50],
  border: colors.navy[600],
  borderGlow: colors.gold[400],
  primary: colors.gold[400],
  primaryPressed: colors.gold[600],
  onPrimary: colors.navy[900],
  secondary: colors.royal[500],
  accent: colors.gold[400],
  heart: '#FF5C7A',
  coin: colors.gold[400],
  success: colors.success[500],
  danger: colors.error[500],
  successTint: '#0F3D2E',
  dangerTint: '#4A1A2A',
  info: colors.royal[400],
  textPrimary: colors.neutral[0],
  textSecondary: colors.neutral[300],
  textMuted: colors.neutral[500],
  textOnLight: colors.ink[900],
  textOnLightMuted: colors.ink[600],
  tabBar: colors.navy[950],
} as const;

export const fonts = {
  regular: 'Nunito-Regular',
  semiBold: 'Nunito-SemiBold',
  bold: 'Nunito-Bold',
  extraBold: 'Nunito-ExtraBold',
  persianRegular: 'Vazirmatn-Regular',
  persianMedium: 'Vazirmatn-Medium',
  persianBold: 'Vazirmatn-Bold',
} as const;

export const typography = {
  display: { fontFamily: fonts.extraBold, fontSize: 32, lineHeight: 38 },
  title: { fontFamily: fonts.bold, fontSize: 24, lineHeight: 29 },
  heading: { fontFamily: fonts.bold, fontSize: 20, lineHeight: 24 },
  body: { fontFamily: fonts.regular, fontSize: 16, lineHeight: 24 },
  bodyStrong: { fontFamily: fonts.semiBold, fontSize: 16, lineHeight: 24 },
  caption: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 21 },
  label: { fontFamily: fonts.bold, fontSize: 12, lineHeight: 18 },
} as const;

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
} as const;

export const radius = {
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  pill: 999,
} as const;

export const controlSize = {
  button: 56,
  icon: 40,
  tabBar: 72,
} as const;

export const glow = {
  borderWidth: 1.5,
  shadowColor: colors.gold[400],
  shadowOpacity: 0.45,
  shadowRadius: 14,
  shadowOffset: { width: 0, height: 0 },
  elevation: 6,
} as const;
