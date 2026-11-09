import { colors } from '@/constants/theme';

export type CefrCode = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export type CefrLevelInfo = {
  code: CefrCode;
  name: string;
  color: string;
};

export const cefrCodes: CefrCode[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export const cefrLevelByCode: Record<CefrCode, CefrLevelInfo> = {
  A1: { code: 'A1', name: 'مقدماتی', color: colors.levels.A1 },
  A2: { code: 'A2', name: 'پایه', color: colors.levels.A2 },
  B1: { code: 'B1', name: 'متوسط', color: colors.levels.B1 },
  B2: { code: 'B2', name: 'بالا', color: colors.levels.B2 },
  C1: { code: 'C1', name: 'پیشرفته', color: colors.levels.C1 },
  C2: { code: 'C2', name: 'حرفه‌ای', color: colors.levels.C2 },
};
