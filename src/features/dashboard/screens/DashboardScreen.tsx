import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ScreenLayout } from '@/shared/layouts/ScreenLayout';
import { RootStackParamList } from '@/navigation'; // Importa el tipo que creamos en el index de navegación

// Tipamos la navegación para esta pantalla específica
type DashboardNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;

export function DashboardScreen() {
  // 1. Hook para obtener el control de la navegación
  const navigation = useNavigation<DashboardNavigationProp>();

  // Controla si el sidebar está abierto o cerrado
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ScreenLayout
      title="OposiTest"
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      onMenuPress={() => setSidebarOpen(true)}
      isLoggedIn={false}
      userName="Usuario Demo"
      
      // 2. Añade el callback para interceptar el click de Login
      onLoginClick={() => navigation.navigate('Login')}

      // 3. Modifica el onNavigate para gestionar las rutas del menú
      onNavigate={(screen) => {
        if (screen === 'inicio') {
          navigation.navigate('Dashboard');
        }
        // Aquí añadirás más pantallas (ej: 'categorias', 'lista') cuando las crees en tu Stack
      }}
    >
      
      {/* CONTENIDO DEL DASHBOARD */}
      <SafeAreaView>
        {/* aquí irán cards, stats, etc */}
      </SafeAreaView>

    </ScreenLayout>


  //   // SafeAreaView evita que el contenido se meta debajo de:
  //   // - barra de estado (hora, batería, etc)
  //   // - notch (cámara frontal)
  //   // - gestos inferiores del sistema
  //   <SafeAreaView style={styles.container}>

  //     {/* SIDEBAR GLOBAL DE LA PANTALLA */}
  //     {/* Se renderiza siempre, pero solo es visible si sidebarOpen = true */}
  //     <Sidebar
  //       isOpen={sidebarOpen}
  //       onClose={() => setSidebarOpen(false)}
  //       onNavigate={(screen) => {
  //         // aquí luego conectaremos con navigation
  //         console.log('Navigate to:', screen);
  //       }}
  //     />

  //     {/* Toolbar fijo en todas las pantallas */}
  //     {/* Aquí solo cambia su configuración (título, botones, etc.) */}
  //     <Toolbar
  //       title="OposiTest"
  //       onMenuPress={() => setSidebarOpen(true)}
  //     />

  //     {/* Aquí irá el contenido específico de la pantalla */}
  //     {/* Ej: listas, cards, estadísticas, etc. */}
      
  //   </SafeAreaView>
  );
}