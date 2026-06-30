import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ScreenLayout } from '@/shared/layouts/ScreenLayout';
import { RootStackParamList } from '@/navigation/types';
import { auth } from '@/core/config/firebase';
import { sendEmailVerification } from 'firebase/auth';

import { useAuthStore } from '@/store/authStore';


type Nav = NativeStackNavigationProp<RootStackParamList, 'Authenticator'>;
// type Route = RouteProp<RootStackParamList, 'Authenticator'>;

export function AuthenticatorScreen() {
    const navigation = useNavigation<Nav>();
    const email = useAuthStore((s) => s.email);

    const [loading, setLoading] = useState(false);
    const [cooldown, setCooldown] = useState(0);
    const [checking, setChecking] = useState(false);

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const refreshAuth = useAuthStore((s) => s.refreshAuth);
    // =========================
    // ENVIAR EMAIL VERIFICACIÓN
    // =========================
    const sendVerification = async () => {
        const user = auth.currentUser;
        if (!user) return;

        setLoading(true);

        try {
            await sendEmailVerification(user);
            setCooldown(60);
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // COOLDOWN REENVIOS
    // =========================
    useEffect(() => {
        if (cooldown <= 0) return;

        const interval = setInterval(() => {
            setCooldown((c) => c - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [cooldown]);

    // =========================
    // POLLING VERIFICACIÓN
    // =========================
    useEffect(() => {
        intervalRef.current = setInterval(async () => {
            const user = auth.currentUser;
            if (!user) return;

            await user.reload();

            if (user.emailVerified) {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }

                setChecking(true);

                await refreshAuth();
            }
        }, 3000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const canResend = cooldown === 0 && !loading;
    if (checking) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white'
            }}>
                <ActivityIndicator size="large" />
                <Text style={{ marginTop: 10 }}>
                    Verificando email...
                </Text>
            </View>
        );
    }
    return (
        <ScreenLayout title="Verifica tu cuenta" showSidebar={false}>

            <View style={{ padding: 20, gap: 20 }}>

                <Text style={{ textAlign: 'center', fontSize: 16 }}>
                    Hemos enviado un email de verificación a:
                </Text>

                <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                    {email}
                </Text>

                {checking && (
                    <View style={{ alignItems: 'center' }}>
                        <ActivityIndicator />
                        <Text>Comprobando verificación...</Text>
                    </View>
                )}

                <Pressable
                    onPress={sendVerification}
                    disabled={!canResend}
                    style={{
                        backgroundColor: canResend ? '#2563eb' : '#ccc',
                        padding: 12,
                        borderRadius: 8,
                    }}
                >
                    <Text style={{ color: 'white', textAlign: 'center' }}>
                        {cooldown > 0
                            ? `Reenviar en ${cooldown}s`
                            : 'Reenviar email'}
                    </Text>
                </Pressable>

                {loading && <ActivityIndicator />}

                <Text style={{ textAlign: 'center', fontSize: 12 }}>
                    No cierres esta pantalla hasta verificar tu cuenta
                </Text>

            </View>

        </ScreenLayout>
    );
}