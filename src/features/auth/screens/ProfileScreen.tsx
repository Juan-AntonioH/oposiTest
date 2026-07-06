import React from 'react';
import {
    ScrollView,
    View,
    Text,
    Pressable,
    ActivityIndicator,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { ScreenLayout } from '@/shared/layouts/ScreenLayout';
import { AuthCard } from '@/features/auth/components/AuthCard';
import { AuthInput } from '@/features/auth/components/AuthInput';
import { AvatarSelector } from '@/features/auth/components/AvatarSelector';

import { styles } from '@/features/auth/styles/Auth.styles';
import { colors } from '@/core/theme';

import { useProfile } from '../hooks/useProfile';

export function ProfileScreen() {
    const navigation = useNavigation<any>();

    const { state, actions } = useProfile();

    return (
        <ScreenLayout title="Mi Perfil">

            {/* LOADING */}
            {state.loading && (
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.45)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 999,
                    }}
                >
                    <ActivityIndicator size="large" color="#fff" />

                    <Text
                        style={{
                            color: '#fff',
                            marginTop: 15,
                        }}
                    >
                        Guardando cambios...
                    </Text>
                </View>
            )}

            <ScrollView
                contentContainerStyle={{ padding: 20 }}
            >

                <AuthCard title="Mi perfil">

                    <AvatarSelector
                        selectedAvatarId={state.selectedAvatarId}
                        customAvatarUri={state.customAvatarUri}
                        onSelectAvatar={actions.setSelectedAvatarId}
                        onPickImage={actions.handlePickImage}
                    />

                    <AuthInput
                        label="Nombre visible"
                        icon="person-outline"
                        value={state.displayName}
                        onChangeText={actions.setDisplayName}
                        placeholder="Nombre"
                    />

                    <AuthInput
                        label="Nombre de cuenta"
                        icon="alternate-email"
                        value={state.accountName}
                        onChangeText={actions.setAccountName}
                        placeholder="usuario"
                    />

                    {state.accountName.length > 0 && (
                        <Text
                            style={{
                                marginBottom: 10,
                                marginTop: -10,
                                color:
                                    state.usernameStatus === 'available'
                                        ? 'green'
                                        : state.usernameStatus === 'taken'
                                            ? 'red'
                                            : 'gray',
                            }}
                        >
                            {state.usernameStatus === 'checking' && 'Comprobando...'}
                            {state.usernameStatus === 'available' && 'Disponible'}
                            {state.usernameStatus === 'taken' && 'No disponible'}
                        </Text>
                    )}

                    <AuthInput
                        label="Correo electrónico"
                        icon="email"
                        value={state.email}
                        editable={false}
                    />

                    <Pressable
                        disabled={!state.hasChanges || state.loading}
                        style={{
                            backgroundColor:
                                !state.hasChanges || state.loading
                                    ? '#BDBDBD'
                                    : colors.primary,
                            padding: 14,
                            borderRadius: 8,
                            marginTop: 20,
                            opacity: !state.hasChanges || state.loading ? 0.7 : 1,
                        }}
                        onPress={actions.saveProfile}
                    >
                        <Text
                            style={{
                                color: 'white',
                                textAlign: 'center',
                                fontWeight: '600',
                            }}
                        >
                            Guardar cambios
                        </Text>
                    </Pressable>

                    <Pressable
                        style={{
                            backgroundColor: colors.warning,
                            padding: 14,
                            borderRadius: 8,
                            marginTop: 15,
                        }}
                        onPress={actions.changePassword}
                    >
                        <Text
                            style={{
                                color: 'white',
                                textAlign: 'center',
                                fontWeight: '600',
                            }}
                        >
                            Cambiar contraseña
                        </Text>
                    </Pressable>

                    <Pressable
                        style={{
                            backgroundColor: colors.danger,
                            padding: 14,
                            borderRadius: 8,
                            marginTop: 15,
                        }}
                        onPress={actions.deleteAccount}
                    >
                        <Text
                            style={{
                                color: 'white',
                                textAlign: 'center',
                                fontWeight: '600',
                            }}
                        >
                            Eliminar cuenta
                        </Text>
                    </Pressable>

                </AuthCard>

            </ScrollView>

        </ScreenLayout>
    );
}