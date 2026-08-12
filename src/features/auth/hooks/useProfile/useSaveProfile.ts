import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';

import { updateProfile } from '../../services/profileService';

export function useSaveProfile({
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
}: {
    hasChanges: boolean;
    usernameStatus:
    | 'idle'
    | 'checking'
    | 'available'
    | 'taken';

    setLoading: (value: boolean) => void;

    selectedAvatarId: string;
    avatarType: 'preset' | 'custom';
    customAvatarUri: string | null;

    auth: {
        uid: string | null;
        displayName: string;
        accountName: string;
        avatar: string;
    };

    displayName: string;
    accountName: string;

    refreshAuth: () => Promise<void>;

    navigation: {
        navigate: (screen: 'Dashboard') => void;
    };
}) {

    const saveProfile = async () => {

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

                            let finalAvatar =
                                selectedAvatarId;

                            if (
                                avatarType === 'custom' &&
                                customAvatarUri
                            ) {

                                const {
                                    saveAvatarLocally,
                                } = require(
                                    '../utils/avatarStorage'
                                );

                                finalAvatar =
                                    await saveAvatarLocally(
                                        customAvatarUri
                                    );
                            }

                            await updateProfile({

                                uid: auth.uid!,

                                currentDisplayName:
                                    auth.displayName,

                                newDisplayName:
                                    displayName,

                                currentAccountName:
                                    auth.accountName,

                                newAccountName:
                                    accountName,

                                currentAvatar:
                                    auth.avatar,

                                newAvatar:
                                    finalAvatar,

                            });

                            await refreshAuth();

                            Toast.show({
                                type: 'success',
                                text1: 'Perfil actualizado',
                            });

                            navigation.navigate(
                                'Dashboard'
                            );

                        } catch (e: any) {

                            if (
                                e.message ===
                                'USERNAME_TAKEN'
                            ) {

                                Toast.show({
                                    type: 'error',
                                    text1:
                                        'Ese nombre ya está ocupado',
                                });

                                return;
                            }

                            Toast.show({
                                type: 'error',
                                text1:
                                    'No se pudo actualizar el perfil',
                            });

                        } finally {

                            setLoading(false);

                        }
                    },
                },
            ],
        );
    };

    return {
        saveProfile,
    };
}