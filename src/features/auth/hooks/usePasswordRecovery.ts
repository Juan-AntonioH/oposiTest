import { useEffect, useState } from 'react';
import { sendRecoveryEmail } from '../services/passwordRecoveryService';

export function usePasswordRecovery() {
    const [email, setEmail] = useState('');

    const [timeLeft, setTimeLeft] = useState(0);
    const [loading, setLoading] = useState(false);

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
    // ACTION
    // ======================
    const sendRecovery = async () => {
        if (!isEmailValid || isBlocked) return;

        try {
            setLoading(true);

            await sendRecoveryEmail(email);

            setTimeLeft(60); // cooldown PRO
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