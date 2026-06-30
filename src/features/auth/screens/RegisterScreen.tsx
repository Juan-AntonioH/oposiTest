import { ScrollView, Pressable, Text, ActivityIndicator, View } from 'react-native';

import { ScreenLayout } from '@/shared/layouts/ScreenLayout';
import { AuthCard } from '../components/AuthCard';
import { AuthInput } from '../components/AuthInput';
import { AvatarSelector } from '../components/AvatarSelector';
import { PasswordRequirements } from '../components/PasswordRequirements';
import { EmailRequirements } from '../components/EmailRequirements';
import { styles } from '../styles/Auth.styles';
import { useRegister } from '../hooks/useRegister';
import { colors } from '@/core/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';

export function RegisterScreen() {
  const { state, actions } = useRegister();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScreenLayout title="Crear cuenta" showSidebar={false}>
      <View style={styles.backButtonContainer}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()} // ← Te regresa automáticamente a la pantalla anterior (Login)
        >
          <Text style={styles.backButtonText}>← Volver</Text>
        </Pressable>
      </View>
      {/* 🔥 OVERLAY LOADING (CORRECTO) */}
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
          <Text style={{ color: '#fff', marginTop: 15 }}>
            Creando cuenta...
          </Text>
        </View>
      )}

      <ScrollView contentContainerStyle={{ padding: 20 }}>

        <AuthCard title="Registro">

          {/* AVATAR ✔ CORRECTO */}
          <AvatarSelector
            selectedAvatarId={state.selectedAvatarId}
            customAvatarUri={state.customAvatarUri} // 
            onSelectAvatar={actions.setSelectedAvatarId}
            onPickImage={actions.handlePickImage} // 🔥 Ahora ejecuta la apertura de la galería
          />
          {/* <AvatarSelector
            selectedAvatarId={state.selectedAvatarId}
            customAvatarUri={null}
            onSelectAvatar={actions.setSelectedAvatarId}
            onPickImage={() => { }}
          /> */}

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
            value={state.normalized}
            onChangeText={actions.setAccountName}
            placeholder="usuario123"
          />

          {state.normalized.length > 0 && (
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
            disabled={!state.isFormValid || state.loading}
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