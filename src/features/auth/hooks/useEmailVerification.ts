import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '@/navigation/types';

import {
    sendVerification,
    checkEmailVerified,
} from '../services/authService';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Authenticator'>;

export function useEmailVerification() {
    const navigation = useNavigation<Nav>();

    const [loading, setLoading] = useState(false);
    const [verified, setVerified] = useState(false);
    const [cooldown, setCooldown] = useState(0);

    useEffect(() => {
        if (cooldown <= 0) return;

        const interval = setInterval(() => {
            setCooldown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [cooldown]);

    const resendEmail = async () => {
        if (cooldown > 0) return;

        setLoading(true);

        try {
            await sendVerification();
            setCooldown(60);
        } finally {
            setLoading(false);
        }
    };

    const verifyEmail = async () => {
        setLoading(true);

        try {
            const isVerified = await checkEmailVerified();

            setVerified(isVerified);

            if (isVerified) {
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