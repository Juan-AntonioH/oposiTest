import { LOCAL_AVATARS_DIR } from "../utils/avatarStorage";

export function normalizeAccountName(name: string) {
    return name.toLowerCase().trim();
}
export function getLocalAvatarUri(filename: string): string {
    return `${LOCAL_AVATARS_DIR}${filename}`;
}