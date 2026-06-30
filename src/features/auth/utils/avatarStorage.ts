import * as FileSystem from 'expo-file-system/legacy';

export const LOCAL_AVATARS_DIR =
    FileSystem.documentDirectory + 'custom_avatars/';

async function ensureDirExists() {
    const dirInfo = await FileSystem.getInfoAsync(LOCAL_AVATARS_DIR);

    if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(LOCAL_AVATARS_DIR, {
            intermediates: true,
        });
    }
}

export async function saveAvatarLocally(uri: string): Promise<string> {
    await ensureDirExists();

    const filename = `avatar_${Date.now()}.jpg`;
    const destinationUri = LOCAL_AVATARS_DIR + filename;

    await FileSystem.copyAsync({
        from: uri,
        to: destinationUri,
    });

    return filename;
}

export function getLocalAvatarUri(filename: string): string {
    return LOCAL_AVATARS_DIR + filename;
}