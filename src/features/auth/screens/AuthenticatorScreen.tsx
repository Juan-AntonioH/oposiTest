import React from 'react';
import { View, Text, Pressable } from 'react-native';

import { ScreenLayout } from '@/shared/layouts/ScreenLayout';
import { useEmailVerification } from '../hooks/useEmailVerification';
import { colors } from '@/core/theme';

export function AuthenticatorScreen() {
    const {
        loading,
        cooldown,
        resendEmail,
        verifyEmail,
    } = useEmailVerification();

    return (
        <ScreenLayout title="Verifica tu correo">

            <View style={{ padding: 20 }}>

                <Text style={{ marginBottom: 10 }}>
                    Te hemos enviado un correo de verificación
                </Text>

                <Text style={{ fontWeight: 'bold', marginBottom: 30 }}>
                    Revisa tu bandeja de entrada
                </Text>

                {/* CHECK */}
                <Pressable
                    onPress={verifyEmail}
                    disabled={loading}
                    style={{
                        backgroundColor: colors.primary,
                        padding: 14,
                        borderRadius: 10,
                        marginBottom: 20,
                    }}
                >
                    <Text style={{ color: 'white', textAlign: 'center' }}>
                        Ya he verificado mi cuenta
                    </Text>
                </Pressable>

                {/* RESEND */}
                <Pressable onPress={resendEmail}>
                    <Text style={{ color: cooldown > 0 ? '#999' : '#0284C7' }}>
                        {cooldown > 0
                            ? `Reenviar correo (${cooldown}s)`
                            : 'Reenviar correo'}
                    </Text>
                </Pressable>

            </View>

        </ScreenLayout>
    );
}