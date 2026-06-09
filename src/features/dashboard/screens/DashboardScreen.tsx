import React, { useState } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ScreenLayout } from '@/shared/layouts/ScreenLayout';
import { RootStackParamList } from '@/navigation'; // Importa el tipo que creamos en el index de navegación

// 1. Importa tu store global
import { useAuthStore } from '@/store/authStore';

// Tipamos la navegación para esta pantalla específica
type DashboardNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;

export function DashboardScreen() {
  // 1. Hook para obtener el control de la navegación
  const navigation = useNavigation<DashboardNavigationProp>();
  // 1️⃣ Creamos un estado dinámico que empieza en true (simulando login inicial)
  const { isLoggedIn, userName, userAvatar, logout } = useAuthStore();
  // const [isAuth, setIsAuth] = useState(true);
  // Controla si el sidebar está abierto o cerrado
  // const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ScreenLayout
      title="OposiTest"
      // sidebarOpen={sidebarOpen}
      // setSidebarOpen={setSidebarOpen}
      // onMenuPress={() => setSidebarOpen(true)}
      // isLoggedIn={isAuth} // 2️⃣ Pasamos la variable de estado en lugar de 'true' fijo
      // userName="Juan el Aleatorio"      // 👈 ID/Key de tu banco de avatares
      // userAvatar="avatar_01"       // 👈 ID/Key de tu banco de avatares
      isLoggedIn={isLoggedIn}
      userName={userName}
      userAvatar={userAvatar}
      // 2. Añade el callback para interceptar el click de Login
      onLoginClick={() => navigation.navigate('Login')}
      // onProfileClick={() => navigation.navigate('Perfil')} // 👈 Añade el callback si existe la ruta
      onProfileClick={() => alert('Ir a perfil')}
      // 3️⃣ Añadimos el callback onLogout para cambiar el estado a false
      // onLogout={() => {
      //   setIsAuth(false);
      // }}
      onLogout={logout}
      // 3. Modifica el onNavigate para gestionar las rutas del menú
      // onNavigate={(screen) => {
      //   if (screen === 'inicio') {
      //     navigation.navigate('Dashboard');
      //   }
      //   // Aquí añadirás más pantallas (ej: 'categorias', 'lista') cuando las crees en tu Stack
      // }}
    >

      {/* CONTENIDO DEL DASHBOARD */}
      <SafeAreaView>
        {/* aquí irán cards, stats, etc */}
      </SafeAreaView>

    </ScreenLayout>
  );
}