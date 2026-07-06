import { useEffect, useState } from 'react';

import { useAuthStore } from '@/store/authStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { normalizeAccountName } from '@/features/auth/types/helpers';
import { isUsernameTaken } from '@/features/auth/services/usernameService';
import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';

import { updateProfile } from '../services/profileService';
import { sendChangePasswordEmail } from '../services/changePasswordService';
import { deleteAccount } from '../services/deleteAccountService';

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

            saveProfile: async () => {
                if (!hasChanges) {
                    return;
                }
                if (usernameStatus === 'taken') {
                    Toast.show({
                        type: 'error',
                        text1: 'Nombre de cuenta no disponible',
                    });
                    return;
                }

                Alert.alert(
                    'Guardar cambios',
                    '¿Deseas guardar los cambios del perfil?',
                    [
                        {
                            text: 'Cancelar',
                            style: 'cancel',
                        },
                        {
                            text: 'Guardar',
                            onPress: async () => {

                                try {

                                    setLoading(true);
                                    let finalAvatar = selectedAvatarId;

                                    if (avatarType === 'custom' && customAvatarUri) {
                                        const { saveAvatarLocally } = require('../utils/avatarStorage');

                                        finalAvatar = await saveAvatarLocally(customAvatarUri);
                                    }
                                    await updateProfile({

                                        uid: auth.uid!,

                                        currentDisplayName: auth.displayName,
                                        newDisplayName: displayName,

                                        currentAccountName: auth.accountName,
                                        newAccountName: accountName,

                                        currentAvatar: auth.avatar,
                                        newAvatar: finalAvatar,
                                    });

                                    await refreshAuth();

                                    Toast.show({
                                        type: 'success',
                                        text1: 'Perfil actualizado',
                                    });
                                    navigation.navigate('Dashboard');
                                } catch (e: any) {

                                    if (e.message === 'USERNAME_TAKEN') {

                                        Toast.show({
                                            type: 'error',
                                            text1: 'Ese nombre ya está ocupado',
                                        });

                                        return;
                                    }

                                    Toast.show({
                                        type: 'error',
                                        text1: 'No se pudo actualizar el perfil',
                                    });

                                } finally {

                                    setLoading(false);

                                }

                            },
                        },
                    ],
                );

            },

            changePassword: () => {

                Alert.alert(
                    'Cambiar contraseña',
                    'Se enviará un correo a tu dirección actual para cambiar la contraseña.\n\n¿Deseas continuar?',
                    [
                        {
                            text: 'Cancelar',
                            style: 'cancel',
                        },
                        {
                            text: 'Enviar correo',
                            onPress: async () => {

                                try {

                                    setLoading(true);

                                    await sendChangePasswordEmail();

                                    Toast.show({
                                        type: 'success',
                                        text1: 'Correo enviado',
                                        text2: 'Revisa tu bandeja de entrada.',
                                    });
                                    navigation.navigate('Dashboard');

                                } catch {

                                    Toast.show({
                                        type: 'error',
                                        text1: 'No se pudo enviar el correo',
                                    });

                                } finally {

                                    setLoading(false);

                                }

                            },
                        },
                    ],
                );

            },

            deleteAccount: () => {

                Alert.alert(
                    'Eliminar cuenta',
                    'Esta acción ocultará tu cuenta y podrás recuperarla más adelante.\n\n¿Deseas continuar?',
                    [
                        {
                            text: 'Cancelar',
                            style: 'cancel',
                        },
                        {
                            text: 'Eliminar',
                            style: 'destructive',

                            onPress: async () => {

                                try {

                                    setLoading(true);

                                    await deleteAccount(
                                        auth.uid!,
                                        auth.accountName,
                                    );

                                    Toast.show({
                                        type: 'success',
                                        text1: 'Cuenta eliminada',
                                    });

                                } catch {

                                    Toast.show({
                                        type: 'error',
                                        text1: 'No se pudo eliminar la cuenta',
                                    });

                                } finally {

                                    setLoading(false);

                                }

                            },

                        },
                    ],
                );

            },
        },

    };

}