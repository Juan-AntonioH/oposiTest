import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { getAuthFlowState } from '@/features/auth/controllers/authFlowController';

export function AuthGate({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<'loading' | string>('loading');

    useEffect(() => {
        const check = async () => {
            const result = await getAuthFlowState();
            setState(result);
        };

        check();
    }, []);

    if (state === 'loading') {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator />
            </View>
        );
    }

    // 🔥 aquí decides flujo global
    if (state === 'unauthenticated') {
        return null; // navega a Login
    }

    if (state === 'unverified') {
        return null; // navega a Authenticator
    }

    return <>{children}</>;
}