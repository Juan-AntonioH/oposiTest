import React from 'react';
import { View, ScrollView, Pressable, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { ScreenLayout } from '@/shared/layouts/ScreenLayout';
import { AuthCard } from '../components/AuthCard';
import { AuthInput } from '../components/AuthInput';
import { EmailRequirements } from '../components/EmailRequirements';

import { colors } from '@/core/theme';
import { styles } from '../styles/Auth.styles';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';

import { usePasswordRecovery } from '../hooks/usePasswordRecovery';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Recovery'>;

export function RecoveryScreen() {
    const navigation = useNavigation<Nav>();

    const {
        email,
        setEmail,
        timeLeft,
        isEmailValid,
        isBlocked,
        sendRecovery,
    } = usePasswordRecovery();

    const isButtonDisabled = !isEmailValid || isBlocked;

    return (
        <ScreenLayout title="Recuperar Contraseña">

            <ScrollView
                contentContainerStyle={[styles.scrollContent, styles.localScroll]}
                showsVerticalScrollIndicator={false}
            >

                {/* BOTÓN VOLVER */}
                <View style={styles.backButtonContainer}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <Text style={styles.backButtonText}>← Volver</Text>
                    </Pressable>
                </View>

                {/* ICONO */}
                <View style={styles.iconContainer}>
                    <MaterialIcons name="key" size={32} color={colors.white} />
                </View>

                <AuthCard title="Recuperar contraseña">

                    <AuthInput
                        label="Correo electrónico"
                        icon="email"
                        value={email}
                        onChangeText={setEmail}
                        placeholder="tu@email.com"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        error={email.length > 0 && !isEmailValid}
                    />

                    <EmailRequirements email={email} />

                    <Pressable
                        style={[
                            styles.submitButton,
                            isButtonDisabled
                                ? styles.disabledButton
                                : { backgroundColor: colors.warning || '#c76e02' },
                        ]}
                        onPress={sendRecovery}
                        disabled={isButtonDisabled}
                    >
                        <Text style={styles.submitButtonText}>
                            {isBlocked
                                ? `Reenviar en ${timeLeft}s`
                                : 'Recuperar Contraseña'}
                        </Text>
                    </Pressable>

                </AuthCard>
            </ScrollView>

        </ScreenLayout>
    );
}