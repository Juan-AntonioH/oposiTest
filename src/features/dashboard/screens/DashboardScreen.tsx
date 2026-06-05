import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenLayout } from '@/shared/layouts/ScreenLayout';

// import { Toolbar } from '@/shared/components/toolbar/ToolBar';
// import { Sidebar } from '@/shared/components/sidebar/Sidebar';
// import { styles } from './DashboardScreen.styles';

export function DashboardScreen() {

    // Controla si el sidebar está abierto o cerrado
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ScreenLayout
      title="OposiTest"
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      onMenuPress={() => setSidebarOpen(true)}

      isLoggedIn={true}
      userName="Usuario Demo"
      onNavigate={(screen) => console.log(screen)}
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