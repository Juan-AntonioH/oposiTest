import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '@/navigation';
import { registerUser, checkUsernameExists } from '../services/authService';

import {
    isValidAccountName,
    isValidEmail,
    isValidPassword,
} from '../utils/validators';

import { PRESET_AVATARS } from '../constants/avatars';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Register'>;

export function useRegister() {
    const navigation = useNavigation<Nav>();

    const [displayName, setDisplayName] = useState('');
    const [accountName, setAccountName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [usernameStatus, setUsernameStatus] = useState<
        'idle' | 'checking' | 'available' | 'taken'
    >('idle');

    const [selectedAvatarId, setSelectedAvatarId] = useState(
        PRESET_AVATARS[0].id
    );

    const avatarDatabaseValue = selectedAvatarId;

    // ---------------- VALIDACIONES ----------------
    const isFormValid =
        displayName.trim().length > 0 &&
        isValidAccountName(accountName) &&
        usernameStatus === 'available' &&
        isValidEmail(email) &&
        isValidPassword(password);

    // ---------------- CHECK USERNAME ----------------
    useEffect(() => {
        if (!isValidAccountName(accountName)) {
            setUsernameStatus('idle');
            return;
        }

        const timeout = setTimeout(async () => {
            setUsernameStatus('checking');

            const exists = await checkUsernameExists(accountName);

            setUsernameStatus(exists ? 'taken' : 'available');
        }, 500);

        return () => clearTimeout(timeout);
    }, [accountName]);

    // ---------------- SUBMIT ----------------
    const handleRegister = async () => {
        try {
            await registerUser({
                email,
                password,
                accountName,
                displayName,
                avatar: avatarDatabaseValue,
            });

            navigation.navigate('Authenticator', { email });
        } catch (error: any) {
            if (error.message === 'USERNAME_TAKEN') {
                alert('El nombre de cuenta ya está en uso');
            } else {
                alert('Error al crear la cuenta');
            }
        }
    };

    return {
        state: {
            displayName,
            accountName,
            email,
            password,
            usernameStatus,
            selectedAvatarId,
            avatarDatabaseValue,
            isFormValid,
        },
        actions: {
            setDisplayName,
            setAccountName,
            setEmail,
            setPassword,
            setSelectedAvatarId,
            handleRegister,
        },
    };
}