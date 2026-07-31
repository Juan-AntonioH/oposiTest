import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { isUsernameTaken } from '../services/usernameService';
import { authFacade } from '../services/authFacade';
import Toast from 'react-native-toast-message';
import { handleAuthError } from '../utils/authErrors';
import {
    isValidAccountName,
    isValidEmail,
    isValidPassword,
} from '../utils/validators';

import { PRESET_AVATARS } from '../constants/avatars';
import { normalizeAccountName } from '../types/helpers';

type Nav = NativeStackNavigationProp<any, 'Register'>;
type AvatarType = 'preset' | 'custom';

export function useRegister() {
    const navigation = useNavigation<Nav>();

    // =========================
    // FORM STATE
    // =========================
    const [displayName, setDisplayName] = useState('');
    const [accountName, setAccountName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // avatar mode
    const [avatarType, setAvatarType] = useState<AvatarType>('preset');

    const [selectedAvatarId, setSelectedAvatarId] = useState(
        'avatar_01' // 🔥 default obligatorio
    );

    const [customAvatarUri, setCustomAvatarUri] = useState<string | null>(null);

    // =========================
    // USERNAME STATUS
    // =========================
    const [usernameStatus, setUsernameStatus] = useState<
        'idle' | 'checking' | 'available' | 'taken'
    >('idle');

    const [loading, setLoading] = useState(false);

    // =========================
    // FINAL AVATAR VALUE (CLEAN)
    // =========================
    const avatarValue: string =
        avatarType === 'custom'
            ? (customAvatarUri ?? 'avatar_01')
            : selectedAvatarId;

    // =========================
    // VALIDATION
    // =========================
    const normalized = normalizeAccountName(accountName)
    const isFormValid =
        displayName.trim().length > 0 &&
        isValidAccountName(normalized) &&
        usernameStatus === 'available' &&
        isValidEmail(email) &&
        isValidPassword(password);

    // =========================
    // USERNAME CHECK
    // =========================
    useEffect(() => {
        let active = true;

        if (!isValidAccountName(normalized)) {
            setUsernameStatus('idle');
            return;
        }

        const timeout = setTimeout(async () => {
            setUsernameStatus('checking');

            try {
                const exists = await isUsernameTaken(normalized);

                if (!active) return;

                setUsernameStatus(exists ? 'taken' : 'available');
            } catch {
                if (!active) return;
                setUsernameStatus('idle');
            }
        }, 400);

        return () => {
            active = false;
            clearTimeout(timeout);
        };
    }, [normalized]);

    // =========================
    // REGISTER
    // =========================
    const handleRegister = async () => {
        if (loading) return;

        setLoading(true);

        try {

            let finalAvatarString = selectedAvatarId;

            // Si seleccionó una foto personalizada
            if (avatarType === 'custom' && customAvatarUri) {

                const { saveAvatarLocally } = require('../utils/avatarStorage');

                finalAvatarString = await saveAvatarLocally(customAvatarUri);
            }

            const result = await authFacade.register({
                email,
                password,
                accountName,
                displayName,
                avatar: finalAvatarString,
            });

            if (result.status === 'created') {

                Toast.show({
                    type: 'success',
                    text1: 'Cuenta creada correctamente',
                });

            } else {

                Toast.show({
                    type: 'success',
                    text1: 'Cuenta recuperada',
                    text2: 'Revisa tu correo para establecer una nueva contraseña.',
                });

            }

            navigation.goBack();

        } catch (e) {

            console.error('REGISTER ERROR', e);

            handleAuthError(e);

        } finally {

            setLoading(false);

        }
    };

    // =========================
    // SELECT PRESET AVATAR
    // =========================
    const handleSelectAvatar = (id: string) => {
        setAvatarType('preset');
        setSelectedAvatarId(id);
        setCustomAvatarUri(null);
    };

    // =========================
    // PICK IMAGE (CUSTOM)
    // =========================
    const handlePickImage = async () => {
        try {
            const ImagePicker = require('expo-image-picker');

            // Pedir permisos de galería
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (permissionResult.granted === false) {
                alert('Se necesitan permisos para acceder a tus fotos y añadir un avatar.');
                return;
            }

            // Abrir selector
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1], // 👈 Corrección: Relación de aspecto 1:1 (Cuadrado perfecto)
                quality: 0.6,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                setAvatarType('custom');
                setCustomAvatarUri(result.assets[0].uri); // 🔥 Guardamos la URI temporal (file://...) para la previsualización
            }
        } catch (error) {
            console.error('Error seleccionando imagen:', error);
        }
    };

    // =========================
    // RETURN
    // =========================
    return {
        state: {
            displayName,
            normalized,
            email,
            password,
            usernameStatus,
            selectedAvatarId,
            customAvatarUri,
            avatarType,
            isFormValid,
            loading,
        },
        actions: {
            setDisplayName,
            setAccountName,
            setEmail,
            setPassword,
            setSelectedAvatarId: handleSelectAvatar, // 🔥 override correcto
            handlePickImage,
            handleRegister,
        },
    };
}