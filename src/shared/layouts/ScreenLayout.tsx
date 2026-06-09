import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { Toolbar } from '@/shared/components/toolbar/ToolBar';
import { Sidebar } from '@/shared/components/sidebar/Sidebar';

interface Props {
  children: React.ReactNode;

  // controla si esta pantalla muestra sidebar o no
  showSidebar?: boolean;

  // toolbar config simple por ahora
  title: string;

  onMenuPress?: () => void;

  // sidebar control
  sidebarOpen?: boolean;
  setSidebarOpen?: (value: boolean) => void;

  isLoggedIn?: boolean;
  userName?: string;
  userAvatar?: string; // 👈 ID/Key de tu banco de avatares
  onNavigate?: (screen: string) => void;
  onLogout?: () => void;
  onLoginClick?: () => void;
  onProfileClick?: () => void;
}

export function ScreenLayout({
  children,
  showSidebar = true,
  title,
  // onMenuPress,
  // sidebarOpen,
  // setSidebarOpen,
  isLoggedIn,
  userName,
  userAvatar,
  // onNavigate,
  onLogout,
  // onLoginClick,
  onProfileClick,
}: Props) {
  // 1. Instanciamos la navegación nativa globalmente para el layout
  const navigation = useNavigation<any>();
  // 2. Estado local del menú controlado por el propio Layout
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // 4. Lógica de navegación centralizada de la app
  const handleNavigate = (screen: string) => {
    setSidebarOpen(false); // Cierra el menú lateral primero

    if (screen === 'inicio') {
      navigation.navigate('Dashboard'); // 👈 Nombre exacto de tu ruta en la pila
    }
    // Si agregas nuevas pantallas en el futuro, SOLO las agregas aquí 🚀
  };
  const handleLoginClick = () => {
    setSidebarOpen(false);
    navigation.navigate('Login');
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>

      {/* SIDEBAR GLOBAL (solo si la pantalla lo permite) */}
      {showSidebar && (
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          isLoggedIn={isLoggedIn}
          userName={userName}
          userAvatar={userAvatar} // 👈 Aquí podrías pasar un prop real con el avatar del usuario
          onNavigate={handleNavigate}
          onLogout={onLogout}
          onLoginClick={handleLoginClick}
          onProfileClick={onProfileClick}
        />
      )}

      {/* TOOLBAR */}
      <Toolbar
        title={title}
        onMenuPress={showSidebar ? () => setSidebarOpen(true) : undefined}
      />

      {/* CONTENIDO DE LA PANTALLA */}
      <View style={{ flex: 1 }}>
        {children}
      </View>

    </SafeAreaView>
  );
}