import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';

import { sendChangePasswordEmail } from '../../services/changePasswordService';

export function useChangePassword({
    setLoading,
    navigation,
}: {
    setLoading: (value: boolean) => void;
    navigation: {
        navigate: (screen: 'Dashboard') => void;
    };
}) {

    const changePassword = () => {

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

                            navigation.navigate(
                                'Dashboard'
                            );

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
    };

    return {
        changePassword,
    };
}