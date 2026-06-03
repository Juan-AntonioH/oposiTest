import { SafeAreaView } from 'react-native-safe-area-context';

import { Toolbar } from '@/shared/components/toolbar/ToolBar';
import { styles } from './DashboardScreen.styles';

export function DashboardScreen() {
  return (
    // SafeAreaView evita que el contenido se meta debajo de:
    // - barra de estado (hora, batería, etc)
    // - notch (cámara frontal)
    // - gestos inferiores del sistema
    <SafeAreaView style={styles.container}>
      
      {/* Toolbar fijo en todas las pantallas */}
      {/* Aquí solo cambia su configuración (título, botones, etc.) */}
      <Toolbar
        title="OposiTest"
        onMenuPress={() => alert('Menu')}
      />

      {/* Aquí irá el contenido específico de la pantalla */}
      {/* Ej: listas, cards, estadísticas, etc. */}
      
    </SafeAreaView>
  );
}