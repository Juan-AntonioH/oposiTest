import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

import { ScreenLayout } from '@/shared/layouts/ScreenLayout';
import { CustomButton } from '@/shared/components/Button/CustomButton';
import { colors } from '@/core/theme';
import { styles } from '../styles/Auth.styles';
import { authFacade } from '../services/authFacade';
import { handleAuthError } from '../utils/authErrors';
import Toast from 'react-native-toast-message';
import { auth } from '@/core/config/firebase';

export const LoginScreen = () => {
  const navigation = useNavigation<any>();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // =========================
  // LOGIN
  // =========================
  const handleLogin = async () => {
    if (!identifier || !password) return;

    setLoading(true);

    try {
      const profile = await authFacade.login(identifier, password);

      Toast.show({
        type: 'success',
        text1: `¡Bienvenido, ${profile.profile.displayName}!`,
        text2: 'Nos alegra verte de nuevo 👋',
      });

    } catch (e) {
      handleAuthError(e); // 👈 AQUÍ la magia
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenLayout title="Iniciar Sesión" showSidebar={false}>

      {/* 🔥 OVERLAY DE CARGA */}
      {loading && (
        <View
          style={{
            position: 'absolute',
            top: 100,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999,
          }}
        >
          <ActivityIndicator size="large" color="#fff" />
          <Text style={{ color: 'white', marginTop: 10 }}>
            Iniciando sesión...
          </Text>
        </View>
      )}

      {/* CONTENIDO */}
      <View style={styles.container}>
        <View style={styles.card}>

          {/* ICON */}
          <View style={styles.iconContainer}>
            <MaterialIcons name="login" size={32} color={colors.white} />
          </View>

          {/* TITLE */}
          <Text style={styles.title}>Ingresa tus datos</Text>

          {/* IDENTIFIER */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email o usuario</Text>

            <View style={styles.inputWrapper}>
              <MaterialIcons name="person" size={18} color="#9CA3AF" />

              <TextInput
                value={identifier}
                onChangeText={setIdentifier}
                placeholder="email o usuario"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="none"
                style={styles.input}
              />
            </View>
          </View>

          {/* PASSWORD */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Contraseña</Text>

            <View style={styles.inputWrapper}>
              <MaterialIcons name="lock" size={18} color="#9CA3AF" />

              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPassword}
                style={styles.input}
              />

              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <MaterialIcons
                  name={showPassword ? 'visibility-off' : 'visibility'}
                  size={20}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* BUTTON */}
          <CustomButton
            title={loading ? 'Cargando...' : 'Iniciar Sesión'}
            onPress={handleLogin}
            variant="primary"
          />
          {/* RECOVERY */}
          <View style={styles.inputGroup}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Recovery')}
            >
              <Text style={[styles.forgot, { color: colors.danger }]}>
                ¿Olvidaste tu contraseña?
              </Text>
            </TouchableOpacity>
          </View>
          {/* REGISTER */}
          <CustomButton
            title="Crear cuenta nueva"
            onPress={() => navigation.navigate('Register')}
            variant="outline"
          />

        </View>
      </View>

    </ScreenLayout>
  );
};