import React, { useState, useEffect } from 'react'; // 1️⃣ Añadimos useEffect
import { View, ScrollView, StyleSheet, Pressable, Text, Alert } from 'react-native';
import { styles } from '../styles/Auth.styles';
import { colors } from '@/core/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ScreenLayout } from '@/shared/layouts/ScreenLayout';
import { AuthCard } from '../components/AuthCard';
import { AuthInput } from '../components/AuthInput';
import { EmailRequirements } from '../components/EmailRequirements';
import { RootStackParamList } from '@/navigation';
import { MaterialIcons } from '@expo/vector-icons';

type RecoveryScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Recovery'>;

export function RecoveryScreen() {
    const navigation = useNavigation<RecoveryScreenNavigationProp>();

    const [email, setEmail] = useState('');
    // 2️⃣ Estados para controlar los segundos restantes y si el temporizador está activo
    const [timeLeft, setTimeLeft] = useState(0);
    const [isTimerActive, setIsTimerActive] = useState(false);
    // --- LÓGICA DE VALIDACIÓN EXTRAÍDA SIMPLIFICADA ---
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // 3️⃣ Efecto que maneja la cuenta atrás segundo a segundo
    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null;

        if (isTimerActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsTimerActive(false); // Al llegar a 0, reactivamos todo
        }

        return () => {
            if (interval) clearInterval(interval); // Limpieza al desmontar
        };
    }, [isTimerActive, timeLeft]);

    const handleRegisterSubmit = () => {
        // Aquí ejecutas tu servicio/store de registro enviando los datos organizados
        const payload = {
            email,
        };

        console.log('Enviando recuperación de cuenta:', payload);
        Alert.alert('Recuperación de contraseña', `Solicitud enviada para recuperar la contraseña de: ${payload.email}`);

        setTimeLeft(60);
        setIsTimerActive(true);
    };

    const isButtonDisabled = !isEmailValid || isTimerActive;

    return (
        <ScreenLayout
            title="Recuperar Contraseña"
            showSidebar={true}
        >
            <ScrollView
                contentContainerStyle={[styles.scrollContent, styles.localScroll]}
                showsVerticalScrollIndicator={false}
            >
                {/* BOTÓN VOLVER */}
                <View style={styles.backButtonContainer}>
                    <Pressable
                        style={styles.backButton}
                        onPress={() => navigation.goBack()} // ← Te regresa automáticamente a la pantalla anterior (Login)
                    >
                        <Text style={styles.backButtonText}>← Volver</Text>
                    </Pressable>
                </View>
                {/* ICON HEADER */}
                <View style={styles.iconContainer}>
                    <MaterialIcons name="key" size={32} color={colors.white} />
                </View>
                <AuthCard title="Crear Cuenta Nueva">
                    {/* INPUT DE EMAIL MÁS LIMPIO */}
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
                    {/* REQUISITOS DEL EMAIL DEBAJO */}
                    <EmailRequirements email={email} />
                    {/* 6️⃣ Modificación dinámica de estilos y texto del botón */}
                    <Pressable
                        style={[
                            styles.submitButton,
                            isButtonDisabled
                                ? styles.disabledButton
                                : { backgroundColor: colors.warning || '#c76e02' }
                        ]}
                        onPress={handleRegisterSubmit}
                        disabled={isButtonDisabled}
                    >
                        <Text style={styles.submitButtonText}>
                            {isTimerActive
                                ? `Reenviar en ${timeLeft}s`
                                : 'Recuperar Contraseña'
                            }
                        </Text>
                    </Pressable>
                </AuthCard>
            </ScrollView>
        </ScreenLayout>
    );
}