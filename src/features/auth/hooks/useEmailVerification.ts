import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '@/navigation';

import {
    sendVerificationEmail,
    checkEmailVerified,
} from '../services/authService';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Authenticator'>;

export function useEmailVerification() {
    const navigation = useNavigation<Nav>();

    const [loading, setLoading] = useState(false);
    const [verified, setVerified] = useState(false);
    const [cooldown, setCooldown] = useState(0);

    // -----------------------------
    // COOLDOWN TIMER
    // -----------------------------
    useEffect(() => {
        if (cooldown <= 0) return;

        const interval = setInterval(() => {
            setCooldown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [cooldown]);

    // -----------------------------
    // RESEND EMAIL
    // -----------------------------
    const resendEmail = async () => {
        if (cooldown > 0) return;

        setLoading(true);

        try {
            await sendVerificationEmail();
            setCooldown(60);
        } finally {
            setLoading(false);
        }
    };

    // -----------------------------
    // VERIFY EMAIL
    // -----------------------------
    const verifyEmail = async () => {
        setLoading(true);

        try {
            const isVerified = await checkEmailVerified();

            setVerified(isVerified);

            if (isVerified) {
                // 🔥 IMPORTANTE:
                // NO login manual, Firebase + onAuthStateChanged + store lo hace solo

                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Dashboard' }],
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        verified,
        cooldown,
        resendEmail,
        verifyEmail,
    };
}