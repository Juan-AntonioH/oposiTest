import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ScreenLayout } from '@/shared/layouts/ScreenLayout'; // 1. Importa tu layout
import { CustomButton } from '@/shared/components/Button/CustomButton';
import { colors, spacing, radius, shadows } from '@/core/theme';
import { RootStackParamList } from '@/navigation';
import { MaterialIcons } from '@expo/vector-icons';

interface Props {
  onLogin?: (email: string, password: string) => void;
  onNavigateToRecovery?: () => void;
  onNavigateToRegister?: () => void;
}

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export const LoginScreen: React.FC<Props> = ({
  onLogin,
  onNavigateToRecovery,
  onNavigateToRegister,
}) => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 2. Necesitamos pasar estas props de control obligatorias al layout, 
  // aunque al usar showSidebar={false} el Sidebar nunca se abrirá.
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogin = () => {
    if (!email || !password) return;
    if (onLogin) {
      onLogin(email, password);
    } else {
      navigation.navigate('Dashboard'); 
    }
  };

  const handleNavigateToRecovery = () => {
    if (onNavigateToRecovery) onNavigateToRecovery();
  };

  const handleNavigateToRegister = () => {
    if (onNavigateToRegister) onNavigateToRegister();
  };

  return (
    // 3. Envolvemos toda la vista con ScreenLayout
    <ScreenLayout
      title="Iniciar Sesión"      // Define el título que saldrá en tu Toolbar
      showSidebar={false}         // 👈 Crucial: Oculta el Sidebar y el botón hamburguesa
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
    >
      {/* Todo tu diseño original del formulario se queda dentro como "children" */}
      <View style={styles.container}>
        <View style={styles.card}>

          {/* ICON HEADER */}
          <View style={styles.iconContainer}>
            <MaterialIcons name="login" size={32} color={colors.white} />
          </View>

          {/* TITLE */}
          <Text style={styles.title}>Ingresa tus datos</Text>

          {/* EMAIL */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre de cuenta / Email</Text>
            <View style={styles.inputWrapper}>
              <MaterialIcons name="email" size={18} color="#9CA3AF" />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="tu@email.com"
                placeholderTextColor="#9CA3AF"
                style={styles.input}
                autoCapitalize="none"
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
                secureTextEntry
                style={styles.input}
              />
            </View>
          </View>

          {/* BUTTON */}
          <CustomButton
            title="Iniciar Sesión"
            onPress={handleLogin}
            variant="primary"
          />

          {/* LINKS */}
          <TouchableOpacity onPress={handleNavigateToRecovery}>
            <Text style={[styles.forgot, { color: colors.danger }]}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          {/* DIVIDER */}
          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.or}>o</Text>
            <View style={styles.line} />
          </View>

          {/* REGISTER */}
          <CustomButton
            title="Crear cuenta nueva"
            onPress={handleNavigateToRegister}
            variant="outline"
          />
        </View>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
    backgroundColor: '#F5F7FB',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.xl,
    ...shadows.sm,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: spacing.lg,
    color: '#1F2937',
  },
  inputGroup: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 13,
    marginBottom: spacing.xs,
    color: '#374151',
    fontWeight: '500',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: radius.md,
    paddingHorizontal: spacing.sm,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.sm,
    fontSize: 14,
    color: '#111827',
  },
  forgot: {
    textAlign: 'center',
    marginTop: spacing.md,
    fontSize: 13,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  or: {
    marginHorizontal: spacing.sm,
    color: '#9CA3AF',
  },
});
