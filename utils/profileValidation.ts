import type { Profile } from '@/types/profile';

const MAX_NAME_LENGTH = 20;
const ALLOWED_NAME = /^[\p{L}\p{N} ._-]+$/u;

export function validateProfileName(rawName: string, profiles: Profile[], editingId?: string): string | null {
  const name = rawName.trim();
  if (name.length === 0) return 'نام پروفایل را وارد کنید';
  if (name.length > MAX_NAME_LENGTH) return `نام پروفایل نباید بیشتر از ${MAX_NAME_LENGTH} نویسه باشد`;
  if (!ALLOWED_NAME.test(name)) return 'نام فقط می‌تواند شامل حروف، عدد، فاصله و نشانه‌های . _ - باشد';

  const lowered = name.toLocaleLowerCase('en-US');
  const duplicate = profiles.some(
    (profile) => profile.id !== editingId && profile.name.trim().toLocaleLowerCase('en-US') === lowered,
  );
  if (duplicate) return 'پروفایلی با این نام از قبل وجود دارد';

  return null;
}
