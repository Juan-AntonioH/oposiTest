import { StyleSheet } from 'react-native';

export const registerStyles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,          // Permite que el scroll se estire correctamente si el contenido es menor a la pantalla
    paddingHorizontal: 16, // Margen interno izquierdo y derecho para que no pegue al borde del dispositivo
    paddingTop: 10,
    paddingBottom: 30,    // Espaciado inferior para que el botón de Crear Cuenta no quede cortado
  },
  // ... otros estilos específicos de registro que tengas aquí
});