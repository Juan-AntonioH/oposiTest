// import { DashboardScreen } from '@/features/dashboard/screens/DashboardScreen';

// export function Navigation() {
//   return <DashboardScreen />;
// }
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DashboardScreen } from '@/features/dashboard/screens/DashboardScreen';
import { LoginScreen } from '@/features/auth/screens/LoginScreen'; // Ajusta la ruta a tu ScreenLogin
import { RegisterScreen } from '@/features/auth/screens/RegisterScreen';
import { RecoveryScreen } from '@/features/auth/screens/RecoveryScreen';
import { AuthenticatorScreen } from '@/features/auth/screens/AuthenticatorScreen'; // Nueva pantalla de autenticación
import { OppositionsScreen } from '@/features/exam/screens/OppositionsScreen';

// Definimos los nombres de las pantallas para TypeScript
export type RootStackParamList = {
  Dashboard: undefined;
  Login: undefined;
  Register: undefined;
  Recovery: undefined;
  Authenticator: { email: string }; // La pantalla de autenticación espera un parámetro de correo electrónico
  Opossitions: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ 
        headerShown: false,
        animation: 'none' // 👈 Desactiva todas las animaciones de transición de forma global
        }}>
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Recovery" component={RecoveryScreen} />
        <Stack.Screen name="Authenticator" component={AuthenticatorScreen} />
        <Stack.Screen name="Opossitions" component={OppositionsScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
