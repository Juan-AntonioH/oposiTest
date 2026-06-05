// import { DashboardScreen } from '@/features/dashboard/screens/DashboardScreen';

// export function Navigation() {
//   return <DashboardScreen />;
// }
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DashboardScreen } from '@/features/dashboard/screens/DashboardScreen';
import { LoginScreen } from '@/features/auth/screens/LoginScreen'; // Ajusta la ruta a tu ScreenLogin

// Definimos los nombres de las pantallas para TypeScript
export type RootStackParamList = {
  Dashboard: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ 
        headerShown: false,
        }}>
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
