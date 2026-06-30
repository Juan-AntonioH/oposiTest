import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';

import { sendRecoveryEmail } from '../services/passwordRecoveryService';
import { handleAuthError } from '../utils/authErrors';

export function usePasswordRecovery() {
    const [email, setEmail] = useState('');

    const [timeLeft, setTimeLeft] = useState(0);
    const [loading, setLoading] = useState(false);

    const isEmailValid =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const isBlocked = timeLeft > 0;

    // ======================
    // TIMER
    // ======================
    useEffect(() => {
        if (timeLeft <= 0) return;

        const interval = setInterval(() => {
            setTimeLeft((t) => t - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft]);

    // ======================
    // ENVIAR RECUPERACIÓN
    // ======================
    const sendRecovery = async () => {
        if (!isEmailValid || isBlocked || loading) return;

        try {
            setLoading(true);

            await sendRecoveryEmail(email);

            Toast.show({
                type: 'success',
                text1: 'Correo enviado',
                text2: 'Revisa tu bandeja de entrada.',
            });

            setTimeLeft(60);
        } catch (error) {
            handleAuthError(error);
        } finally {
            setLoading(false);
        }
    };

    return {
        email,
        setEmail,

        timeLeft,
        loading,

        isEmailValid,
        isBlocked,

        sendRecovery,
    };
}