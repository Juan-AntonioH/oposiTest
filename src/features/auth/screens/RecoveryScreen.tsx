import React from 'react';
import {
    View,
    ScrollView,
    ActivityIndicator,
    Text,
    Pressable,
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import { ScreenLayout } from '@/shared/layouts/ScreenLayout';
import { AuthCard } from '../components/AuthCard';
import { AuthInput } from '../components/AuthInput';
import { EmailRequirements } from '../components/EmailRequirements';

import { CustomButton } from '@/shared/components/Button/CustomButton';

import { colors } from '@/core/theme';
import { styles } from '../styles/Auth.styles';

import { usePasswordRecovery } from '../hooks/usePasswordRecovery';
import { useNavigation } from '@react-navigation/native';

export function RecoveryScreen() {
    const {
        email,
        setEmail,

        loading,

        timeLeft,

        isEmailValid,
        isBlocked,

        sendRecovery,
    } = usePasswordRecovery();

    const isButtonDisabled =
        !isEmailValid ||
        isBlocked ||
        loading;
    const navigation = useNavigation<any>();
    return (
        <ScreenLayout
            title="Recuperar Contraseña"
            showSidebar={false}
        >
            <View style={styles.backButtonContainer}>
                <Pressable
                    style={styles.backButton}
                    onPress={() => navigation.goBack()} // ← Te regresa automáticamente a la pantalla anterior (Login)
                >
                    <Text style={styles.backButtonText}>← Volver</Text>
                </Pressable>
            </View>
            {/* OVERLAY */}
            {loading && (
                <View
                    style={{
                        position: 'absolute',
                        top: 100,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 999,
                    }}
                >
                    <ActivityIndicator
                        size="large"
                        color="#fff"
                    />

                    <Text
                        style={{
                            color: '#fff',
                            marginTop: 12,
                        }}
                    >
                        Enviando correo...
                    </Text>
                </View>
            )}

            <ScrollView
                contentContainerStyle={[
                    styles.scrollContent,
                    styles.localScroll,
                ]}
                showsVerticalScrollIndicator={false}
            >
                {/* ICONO */}
                <View style={styles.iconContainer}>
                    <MaterialIcons
                        name="key"
                        size={32}
                        color={colors.white}
                    />
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
                        error={
                            email.length > 0 &&
                            !isEmailValid
                        }
                    />

                    <EmailRequirements email={email} />

                    <CustomButton
                        title={
                            isBlocked
                                ? `Reenviar en ${timeLeft}s`
                                : 'Recuperar contraseña'
                        }
                        onPress={sendRecovery}
                        disabled={isButtonDisabled}
                        variant="warning"
                    />

                </AuthCard>
            </ScrollView>

        </ScreenLayout>
    );
}