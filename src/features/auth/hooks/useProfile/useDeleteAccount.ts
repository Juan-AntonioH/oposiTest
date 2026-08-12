import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';

import { deleteAccount } from '../../services/deleteAccountService';

export function useDeleteAccount({
    setLoading,
    auth,
}: {
    setLoading: (value: boolean) => void;
    auth: {
        uid: string | null;
        accountName: string;
    };
}) {

    const deleteAccountAction = () => {

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
    };

    return {
        deleteAccount: deleteAccountAction,
    };
}