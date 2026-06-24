import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Modal } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { ScreenLayout } from '@/shared/layouts/ScreenLayout';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, radius, spacing } from '@/core/theme';
import { styles } from '../styles/Auth.styles';
import { useAuthStore } from '@/store/authStore';
import { RootStackParamList } from '@/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
type RouteParams = {
    Authenticator: {
        email: string;
    };
};

type AuthenticatorScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Authenticator'>;

export function AuthenticatorScreen() {
    const loginGlobal = useAuthStore((state) => state.login);
    const navigation = useNavigation<AuthenticatorScreenNavigationProp>();
    const route = useRoute<RouteProp<RouteParams, 'Authenticator'>>();

    // Obtenemos el correo enviado o ponemos uno por defecto si se entra directo
    const userEmail = route.params?.email || 'qwe@qqe.e';

    // Guardamos cada dígito por separado en un array de 6 posiciones
    const [code, setCode] = useState(['', '', '', '', '', '']);

    // Referencias para controlar el foco automático de los inputs
    const inputsRef = useRef<Array<TextInput | null>>([]);

    // 👈 Estados para controlar la ventana emergente (Modal)
    const [showModal, setShowModal] = useState(false);
    const [modalConfig, setModalConfig] = useState({
        title: '',
        message: '',
        icon: 'check-circle' as keyof typeof MaterialIcons.glyphMap
    });
    // Comprobar si los 6 dígitos están llenos
    const isCodeComplete = code.every(digit => digit !== '');

    const handleChangeText = (text: string, index: number) => {
        const newCode = [...code];
        // Solo tomamos el último carácter ingresado
        newCode[index] = text.slice(-1);
        setCode(newCode);

        // Si escribió un número y no es el último cuadro, avanza al siguiente
        if (text && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        // Si presiona borrar y el cuadro actual está vacío, retrocede al anterior
        if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    // 👈 ACCIÓN 1: AL PULSAR VERIFICAR
    const handleVerify = () => {
        const fullCode = code.join('');
        console.log('Verificando código:', fullCode);

        // Configuramos los textos de éxito de cuenta
        setModalConfig({
            title: '¡Cuenta verificada!',
            message: 'Tu perfil se ha creado con éxito. Redirigiendo al panel...',
            icon: 'verified-user'
        });
        setShowModal(true);

        // Esperamos 2.5 segundos viendo el mensaje bonito antes de saltar
        setTimeout(() => {
            setShowModal(false);
            loginGlobal();
            navigation.navigate('Dashboard');
        }, 2500);
    };
    // 👈 ACCIÓN 2: AL PULSAR REENVIAR
    const handleResendCode = () => {
        console.log('Reenviando código a:', userEmail);

        // Configuramos los textos de reenvío de código
        setModalConfig({
            title: '¡Código reenviado!',
            message: 'Revisa de nuevo tu bandeja de entrada o la carpeta de spam.',
            icon: 'mark-email-read'
        });
        setShowModal(true);

        // Este solo se cierra a los 3 segundos y te deja en la misma pantalla
        setTimeout(() => {
            setShowModal(false);
        }, 3000);
    };
    return (
        <ScreenLayout title="Verificación">
            <View style={styles.authenticatorContainer}>
                <View style={styles.authenticatorCard}>

                    {/* Icono de Correo Azul */}
                    <View style={styles.iconContainer}>
                        <MaterialIcons name="email" size={32} color="#ffffff" />
                    </View>

                    <Text style={styles.title}>Verifica tu cuenta</Text>

                    <Text style={styles.subtitle}>
                        Hemos enviado un código de 6 dígitos a{'\n'}
                        <Text style={styles.emailText}>{userEmail}</Text>
                    </Text>

                    {/* Fila de 6 Inputs para el Código */}
                    <View style={styles.codeContainer}>
                        {code.map((digit, index) => (
                            <TextInput
                                key={index}
                                ref={(el) => { inputsRef.current[index] = el; }}
                                style={styles.codeInput}
                                value={digit}
                                onChangeText={(text) => handleChangeText(text, index)}
                                onKeyPress={(e) => handleKeyPress(e, index)}
                                keyboardType="number-pad"
                                maxLength={1}
                                textAlign="center"
                            />
                        ))}
                    </View>

                    {/* Botón Dinámico */}
                    <Pressable
                        style={[
                            styles.button,
                            isCodeComplete ? styles.buttonActive : styles.buttonDisabled
                        ]}
                        disabled={!isCodeComplete}
                        onPress={handleVerify}
                    >
                        <Text style={styles.buttonText}>Verificar</Text>
                    </Pressable>

                    {/* TEXTO DE REENVIAR CON ACCIÓN TÁCTIL */}
                    <Text style={styles.resendText}>
                        ¿No recibiste el código?{' '}
                        <Text style={styles.resendLink} onPress={handleResendCode}>
                            Reenviar
                        </Text>
                    </Text>

                </View>
            </View>
            {/* ==========================================================================
               VENTANA EMERGENTE DINÁMICA (MUESTRA TEXTOS SEGÚN LA CONFIGURACIÓN)
               ========================================================================== */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>

                        {/* Icono dinámico que cambia de forma y color según la acción */}
                        <View style={styles.iconWrapper}>
                            <MaterialIcons
                                name={modalConfig.icon as any}
                                size={36}
                                color={modalConfig.icon === 'verified-user' ? '#0EA5E9' : '#10B981'}
                            />
                        </View>

                        {/* Título dinámico */}
                        <Text style={styles.modalTitle}>{modalConfig.title}</Text>

                        {/* Mensaje dinámico */}
                        <Text style={styles.modalMessage}>{modalConfig.message}</Text>

                    </View>
                </View>
            </Modal>
        </ScreenLayout>
    );
}