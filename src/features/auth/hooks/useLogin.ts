import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { authFacade } from '../services/authFacade';
import { RootStackParamList } from '@/navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export function useLogin() {
    const navigation = useNavigation<Nav>();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (identifier: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
            await authFacade.login(identifier, password);

            navigation.reset({
                index: 0,
                routes: [{ name: 'Dashboard' }],
            });
        } catch (err: any) {
            if (err.message === 'EMAIL_NOT_VERIFIED') {
                return;
            }

            if (err.message === 'USER_BANNED') {
                setError('Tu cuenta está bloqueada');
                return;
            }

            if (err.message === 'USER_DELETED') {
                setError('Usuario eliminado');
                return;
            }

            setError('Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    return {
        login,
        loading,
        error,
    };
}