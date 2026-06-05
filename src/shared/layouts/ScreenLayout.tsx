import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;

  isLoggedIn?: boolean;
  userName?: string;
  onNavigate?: (screen: string) => void;
  onLogout?: () => void;
  onLoginClick?: () => void;
  onProfileClick?: () => void;
}

export function ScreenLayout({
  children,
  showSidebar = true,
  title,
  onMenuPress,
  sidebarOpen,
  setSidebarOpen,
  isLoggedIn,
  userName,
  onNavigate,
  onLogout,
  onLoginClick,
  onProfileClick,
}: Props) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      
      {/* SIDEBAR GLOBAL (solo si la pantalla lo permite) */}
      {showSidebar && (
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          isLoggedIn={isLoggedIn}
          userName={userName}
          onNavigate={onNavigate}
          onLogout={onLogout}
          onLoginClick={onLoginClick}
          onProfileClick={onProfileClick}
        />
      )}

      {/* TOOLBAR */}
      <Toolbar
        title={title}
        onMenuPress={showSidebar ? onMenuPress : undefined}
      />

      {/* CONTENIDO DE LA PANTALLA */}
      <View style={{ flex: 1 }}>
        {children}
      </View>

    </SafeAreaView>
  );
}