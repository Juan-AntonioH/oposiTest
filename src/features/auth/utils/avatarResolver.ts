import * as FileSystem from 'expo-file-system/legacy';
import { PRESET_AVATARS } from '@/features/auth/constants/avatars';
import { getLocalAvatarUri } from './avatarStorage';

export function isCustomAvatar(value?: string) {
  return !!value && value.startsWith('avatar_');
}

export async function resolveAvatar(avatar?: string | null) {
  if (!avatar) {
    return PRESET_AVATARS[0].image;
  }

  // 1️⃣ Primero intentamos buscarlo como ARCHIVO LOCAL CUSTOM
  const uri = getLocalAvatarUri(avatar);
  const fileInfo = await FileSystem.getInfoAsync(uri);

  if (fileInfo.exists) {
    return { uri };
  }

  // 2️⃣ Si el archivo no existe localmente, comprobamos si es un PRESET clásico
  // (Por ejemplo: "avatar_01", "avatar_02", etc.)
  if (avatar.startsWith('avatar_')) {
    const preset = PRESET_AVATARS.find(a => a.id === avatar);
    if (preset) {
      return preset.image;
    }
  }

  // 3️⃣ Fallback final si no se encuentra en ningún sitio
  return PRESET_AVATARS[0].image;
}
