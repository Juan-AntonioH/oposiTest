import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { useAuthStore } from '@/store/authStore'; // O la ruta correspondiente
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ScreenLayout } from '@/shared/layouts/ScreenLayout'; // 1. Importa tu layout
import { CustomButton } from '@/shared/components/Button/CustomButton';
import { colors, spacing, radius, shadows } from '@/core/theme';
import { styles } from '../styles/Auth.styles';
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
  // onNavigateToRegister,
}) => {
  const loginGlobal = useAuthStore((state) => state.login);
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 2. Necesitamos pasar estas props de control obligatorias al layout, 
  // aunque al usar showSidebar={false} el Sidebar nunca se abrirá.
  // const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogin = () => {
    if (!email || !password) return;
    if (onLogin) {
      onLogin(email, password);
    } else {
      loginGlobal();
      navigation.navigate('Dashboard');
    }
  };

  // const handleNavigateToRecovery = () => {
  //   if (onNavigateToRecovery) onNavigateToRecovery();
  // };
  // const handleNavigateToRegister = () => {
  //   if (onNavigateToRegister) onNavigateToRegister();
  // };
  // const handleNavigateToRegister = () => {
  //   navigation.navigate('Register');
  // };
  return (
    // 3. Envolvemos toda la vista con ScreenLayout
    <ScreenLayout
      title="Iniciar Sesión"      // Define el título que saldrá en tu Toolbar
      // showSidebar={true}         // 👈 Crucial: Oculta el Sidebar y el botón hamburguesa
    // sidebarOpen={sidebarOpen}
    // setSidebarOpen={setSidebarOpen}
    // onMenuPress={() => setSidebarOpen(true)}
    // 👈 CONFIGURA AQUÍ EL COMPORTAMIENTO DEL MENÚ PARA EL LOGIN
    // onNavigate={(screen) => {

    //   if (screen === 'inicio') {
    //     setSidebarOpen(false); // Cierra el menú lateral primero
    //     navigation.navigate('Dashboard'); // 👈 Redirige de vuelta al Dashboard en la pila
    //   }

    //   // Aquí añadirás más condiciones en el futuro (ej: 'categorias')
    // }}
    >
      {/* BOTÓN VOLVER */}
      <View style={styles.backButtonContainer}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.navigate('Dashboard')} // ← Te regresa automáticamente a la pantalla anterior (Login)
        >
          <Text style={styles.backButtonText}>← Volver</Text>
        </Pressable>
      </View>
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
                placeholder="Pepito/tu@email.com"
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
          <TouchableOpacity onPress={() => navigation.navigate('Recovery')}>
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
            onPress={() => navigation.navigate('Register')}
            variant="outline"
          />
        </View>
      </View>
    </ScreenLayout>
  );
};  