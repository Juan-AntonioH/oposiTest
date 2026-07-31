import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useAuthStore } from '@/store/authStore';

export function useAuthFlowController() {
    const status = useAuthStore((s) => s.status);

    const navigation = useNavigation();

    useEffect(() => {
        if (status === 'authenticated') {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Dashboard' as never }],
            });
        }

        if (status === 'unauthenticated') {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' as never }],
            });
        }

        if (status === 'unverified') {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Authenticator' as never }],
            });
        }
    }, [status]);
}