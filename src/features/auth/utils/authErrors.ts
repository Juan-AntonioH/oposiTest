import Toast from 'react-native-toast-message';

export function handleAuthError(error: any) {
    const code = error?.code || error?.message;

    switch (code) {
        case 'auth/user-not-found':
        case 'USER_NOT_FOUND':
            Toast.show({
                type: 'error',
                text1: 'Usuario no encontrado',
                text2: 'Revisa tu email o nombre de usuario',
            });
            break;

        case 'auth/wrong-password':
        case 'auth/invalid-credential':
            Toast.show({
                type: 'error',
                text1: 'Contraseña incorrecta',
                text2: 'Inténtalo de nuevo',
            });
            break;

        case 'PROFILE_NOT_FOUND':
            Toast.show({
                type: 'error',
                text1: 'Perfil no encontrado',
            });
            break;

        default:
            Toast.show({
                type: 'error',
                text1: 'Error de inicio de sesión',
                text2: 'Inténtalo más tarde',
            });
            break;
    }
}