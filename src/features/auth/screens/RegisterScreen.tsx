import React from 'react';
import { ScrollView, Pressable, Text } from 'react-native';

import { ScreenLayout } from '@/shared/layouts/ScreenLayout';
import { AuthCard } from '../components/AuthCard';
import { AuthInput } from '../components/AuthInput';
import { AvatarSelector } from '../components/AvatarSelector';
import { PasswordRequirements } from '../components/PasswordRequirements';
import { EmailRequirements } from '../components/EmailRequirements';

import { colors } from '@/core/theme';
import { useRegister } from '../hooks/useRegister';

export function RegisterScreen() {
  const { state, actions } = useRegister();

  return (
    <ScreenLayout title="Crear cuenta">
      <ScrollView contentContainerStyle={{ padding: 20 }}>

        <AuthCard title="Registro">

          <AvatarSelector
            selectedAvatarId={state.selectedAvatarId}
            customAvatarUri={null}
            onSelectAvatar={actions.setSelectedAvatarId}
            onPickImage={() => { }}
          />

          <AuthInput
            label="Nombre visible"
            icon="person-outline"
            value={state.displayName}
            onChangeText={actions.setDisplayName}
            placeholder="Pepito de los palotes"
            helperText="Entre 3 y 15 carácteres"
          />

          <AuthInput
            label="Nombre de cuenta"
            icon="alternate-email"
            value={state.accountName}
            onChangeText={actions.setAccountName}
            placeholder="usuario123"
            helperText="3-15 caracteres, solo letras y números, no puede contener espacios."
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
            label="Email"
            icon="email"
            value={state.email}
            onChangeText={actions.setEmail}
            placeholder="pepito@gmail.com"
          />

          <EmailRequirements email={state.email} />

          <AuthInput
            label="Contraseña"
            icon="lock-outline"
            value={state.password}
            onChangeText={actions.setPassword}
            secureTextEntry
            enableTogglePassword
            placeholder="*********"
          />

          <PasswordRequirements password={state.password} />

          <Pressable
            disabled={!state.isFormValid}
            onPress={actions.handleRegister}
            style={{
              backgroundColor: state.isFormValid ? colors.primary : '#ccc',
              padding: 14,
              borderRadius: 8,
              marginTop: 20,
            }}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>
              Crear cuenta
            </Text>
          </Pressable>

        </AuthCard>

      </ScrollView>
    </ScreenLayout>
  );
}