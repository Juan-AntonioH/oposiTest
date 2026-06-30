import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/* SCREENS */
import { DashboardScreen } from '@/features/dashboard/screens/DashboardScreen';
import { OppositionsScreen } from '@/features/exam/screens/OppositionsScreen';

const Stack = createNativeStackNavigator();

export function AppNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="Oppositions" component={OppositionsScreen} />
        </Stack.Navigator>
    );
}