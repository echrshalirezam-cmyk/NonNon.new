export type AvatarOption = {
  id: string;
  kind: 'mascot' | 'user';
  tint: string;
};

export const avatarOptions: AvatarOption[] = [
  { id: 'mascot-pink', kind: 'mascot', tint: '#101C47' },
  { id: 'mascot-violet', kind: 'mascot', tint: '#122F82' },
  { id: 'mascot-teal', kind: 'mascot', tint: '#172759' },
  { id: 'user-blue', kind: 'user', tint: '#2F6BFF' },
  { id: 'user-gold', kind: 'user', tint: '#F5B325' },
  { id: 'user-green', kind: 'user', tint: '#34D399' },
];

export const defaultAvatarId = avatarOptions[0].id;

export function getAvatar(id: string): AvatarOption {
  return avatarOptions.find((avatar) => avatar.id === id) ?? avatarOptions[0];
}
