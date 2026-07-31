import React from 'react';
import { RootStackParamList } from '@/navigation/types';
import { useAuthStore } from '@/store/authStore';

import { LoginScreen } from '@/features/auth/screens/LoginScreen';
import { RegisterScreen } from '@/features/auth/screens/RegisterScreen';
import { RecoveryScreen } from '@/features/auth/screens/RecoveryScreen';
import { AuthenticatorScreen } from '@/features/auth/screens/AuthenticatorScreen';
import { DashboardScreen } from '@/features/dashboard/screens/DashboardScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen } from '@/features/auth/screens/ProfileScreen';
import { OppositionsScreen } from '@/features/exam/screens/OppositionsScreen';
import { OppositionScreen } from '@/features/exam/screens/OppositionScreen';
import { ExamsScreen } from '@/features/exam/screens/ExamsScreen';
import { TestScreen } from '@/features/exam/screens/TestScreen';
import { ExamSummaryScreen } from '@/features/exam/screens/ExamSummaryScreen';
import { ExamReviewScreen } from '@/features/exam/screens/ExamReviewScreen';
import { QuestionFormScreen } from '@/features/admin/screens/QuestionFormScreen';
import { BlocksScreen } from '@/features/exam/screens/BlocksScreen';
import { ThemesScreen } from '@/features/exam/screens/ThemesScreen';
import { CustomTestScreen } from '@/features/exam/screens/CustomTestScreen';
import { QuestionsListScreen } from '@/features/admin/screens/QuestionsListScreen';
import { ExamHistoryScreen } from '@/features/exam/screens/ExamHistoryScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AuthRouter() {
    const status = useAuthStore((s) => s.status);
    
    // 🔓 NO LOGEADO
    if (status === 'unauthenticated') {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false, }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Recovery" component={RecoveryScreen} />
            </Stack.Navigator>
        );
    }

    // 📧 NO VERIFICADO
    if (status === 'unverified') {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false, }}>
                <Stack.Screen
                    name="Authenticator"
                    component={AuthenticatorScreen}
                />
            </Stack.Navigator>
        );
    }

    // 🔐 AUTHENTICATED
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false, }}>
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Oppositions" component={OppositionsScreen} />
            <Stack.Screen name="OppositionScreen" component={OppositionScreen} />
            <Stack.Screen name="ExamsScreen" component={ExamsScreen} />
            <Stack.Screen name="TestScreen" component={TestScreen} />
            <Stack.Screen name="ExamSummaryScreen" component={ExamSummaryScreen} />
            <Stack.Screen name='ExamReviewScreen' component={ExamReviewScreen} />
            <Stack.Screen name='QuestionFormScreen' component={QuestionFormScreen} />
            <Stack.Screen name='BlocksScreen' component={BlocksScreen} />
            <Stack.Screen name='ThemesScreen' component={ThemesScreen} />
            <Stack.Screen name='CustomTestScreen' component={CustomTestScreen} />
            <Stack.Screen name='QuestionsListScreen' component={QuestionsListScreen} />
            <Stack.Screen name='ExamHistoryScreen' component={ExamHistoryScreen} />
        </Stack.Navigator>
    );
}