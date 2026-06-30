import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { getAuthFlowState } from '@/features/auth/controllers/authFlowController';

import { Navigation } from './index';

export function AuthGate() {
    const [state, setState] = useState<
        'loading' | 'unauthenticated' | 'unverified' | 'authenticated'
    >('loading');

    useEffect(() => {
        const init = async () => {
            const result = await getAuthFlowState();
            setState(result);
        };

        init();
    }, []);

    if (state === 'loading') {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator />
            </View>
        );
    }

    // 👇 IMPORTANTE: seguimos usando TU navigation existente
    return (
        <NavigationContainer>
            <Navigation />
        </NavigationContainer>
    );
}