import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

import { saveAvatarLocally } from '@/features/auth/utils/avatarStorage';

export function useAvatarPicker(initialAvatar = 'avatar_01') {
    const [selectedAvatarId, setSelectedAvatarId] = useState(initialAvatar);
    const [customAvatarUri, setCustomAvatarUri] = useState<string | null>(null);

    const handlePickImage = async () => {
        const permission =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            return;
        }

        const result =
            await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.9,
            });

        if (result.canceled) {
            return;
        }

        const imageUri = result.assets[0].uri;

        // Solo para mostrar la vista previa inmediatamente
        setCustomAvatarUri(imageUri);

        // Lo guardamos permanentemente
        const filename = await saveAvatarLocally(imageUri);

        // Este será el valor que se guardará en Firestore
        setSelectedAvatarId(`custom:${filename}`);
    };

    return {
        selectedAvatarId,
        customAvatarUri,

        setSelectedAvatarId,
        setCustomAvatarUri,

        handlePickImage,
    };
}