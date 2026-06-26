import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from '@/features/auth/screens/LoginScreen';
import { RegisterScreen } from '@/features/auth/screens/RegisterScreen';
import { AuthenticatorScreen } from '@/features/auth/screens/AuthenticatorScreen';
import { RecoveryScreen } from '@/features/auth/screens/RecoveryScreen';
const Stack = createNativeStackNavigator();

export function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Authenticator" component={AuthenticatorScreen} />
            <Stack.Screen name="Recovery" component={RecoveryScreen} />
        </Stack.Navigator>
    );
}