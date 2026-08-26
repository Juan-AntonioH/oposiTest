import { useEffect, useState } from 'react';

import { useAuthStore } from '@/store/authStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { normalizeAccountName } from '@/features/auth/types/helpers';
import { isUsernameTaken } from '@/features/auth/services/usernameService';
import { Alert } from 'react-native';
import { useSaveProfile } from './useSaveProfile';
import { useChangePassword } from './useChangePassword';
import { useDeleteAccount } from './useDeleteAccount';

export function useProfile() {
    type Nav = NativeStackNavigationProp<RootStackParamList>;

    const navigation = useNavigation<Nav>();
    const refreshAuth = useAuthStore((s) => s.refreshAuth);

    const auth = useAuthStore();

    const [loading, setLoading] = useState(false);

    const [displayName, setDisplayName] = useState('');
    const [accountName, setAccountName] = useState('');
    const [email, setEmail] = useState('');

    const [selectedAvatarId, setSelectedAvatarId] = useState('');
    const [customAvatarUri, setCustomAvatarUri] = useState<string | null>(null);
    const handlePickImage = async () => {
        try {
            const ImagePicker = require('expo-image-picker');

            const permission =
                await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (!permission.granted) {
                Alert.alert(
                    'Permiso requerido',
                    'Debes permitir el acceso a la galería.'
                );
                return;
            }

            const result =
                await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 0.6,
                });

            if (!result.canceled && result.assets.length > 0) {
                setAvatarType('custom');
                setCustomAvatarUri(result.assets[0].uri);
            }

        } catch (error) {
            console.error(error);
        }
    };
    type AvatarType = 'preset' | 'custom';
    const [avatarType, setAvatarType] = useState<AvatarType>('preset');
    const handleSelectAvatar = (id: string) => {
        setAvatarType('preset');
        setSelectedAvatarId(id);
        setCustomAvatarUri(null);
    };
    const [usernameStatus, setUsernameStatus] = useState<
        'idle' | 'checking' | 'available' | 'taken'
    >('idle');
    const hasAvatarChanges =
        avatarType === 'custom'
            ? customAvatarUri !== null
            : selectedAvatarId !== auth.avatar;

    const hasChanges =
        displayName !== auth.displayName ||
        normalizeAccountName(accountName) !== auth.accountName ||
        hasAvatarChanges;

    useEffect(() => {

        setDisplayName(auth.displayName);
        setAccountName(auth.accountName);
        setEmail(auth.email ?? '');

        setSelectedAvatarId(auth.avatar);
        setCustomAvatarUri(null);
        setAvatarType('preset');


    }, []);

    // comprobar username
    useEffect(() => {

        const normalized = normalizeAccountName(accountName);

        if (!normalized) {
            setUsernameStatus('idle');
            return;
        }

        // si es el mismo que ya tiene
        if (normalized === auth.accountName) {
            setUsernameStatus('available');
            return;
        }

        const timer = setTimeout(async () => {

            setUsernameStatus('checking');

            const exists = await isUsernameTaken(normalized);

            setUsernameStatus(
                exists ? 'taken' : 'available'
            );

        }, 300);

        return () => clearTimeout(timer);

    }, [accountName]);

    const { saveProfile } = useSaveProfile({
        hasChanges,
        usernameStatus,
        setLoading,

        selectedAvatarId,
        avatarType,
        customAvatarUri,

        auth,
        displayName,
        accountName,

        refreshAuth,
        navigation,
    });

    const { changePassword } = useChangePassword({
        setLoading,
        navigation,
    });

    const { deleteAccount } = useDeleteAccount({
        setLoading,
        auth,
    });

    return {

        state: {
            loading,

            displayName,
            accountName,
            email,

            selectedAvatarId,
            customAvatarUri,

            usernameStatus,

            hasChanges,
        },

        actions: {

            setDisplayName,
            setAccountName,
            setSelectedAvatarId: handleSelectAvatar,

            handlePickImage,

            saveProfile,

            changePassword,

            deleteAccount,
        },

    };

}