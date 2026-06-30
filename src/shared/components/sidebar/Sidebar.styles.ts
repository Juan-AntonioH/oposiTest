import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    // capa oscura detrás del sidebar
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,

    width: 280,

    backgroundColor: '#fff',
    paddingTop: 16,
    // paddingTop: 50,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
  },

  close: {
    fontSize: 18,
  },

  loginButton: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 8,
  },

  loginText: {
    color: '#fff',
    textAlign: 'center',
  },

  menu: {
    padding: 8,
  },

  menuItem: {
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 12,
  },

  menuText: {
    fontSize: 16,
    paddingLeft: 10,
  },
  menuButton: {
    flexDirection: 'row',    // ⬅️ Clave para poner icono y texto en la misma línea
    alignItems: 'center',    // ⬅️ Centra verticalmente el icono con el texto
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  menuIcon: {
    marginRight: 15,         // ⬅️ Espaciado horizontal entre el icono y el texto
  },
  authSection: {
  paddingHorizontal: 20,
  paddingVertical: 15,
  borderBottomWidth: 1,
  borderBottomColor: '#f0f0f0', // Línea divisoria suave inferior opcional
},
profileContainer: {
  flexDirection: 'row',
  alignItems: 'center',
},
avatar: {
  width: 55,
  height: 55,
  borderRadius: 27.5, // Hace la imagen completamente redonda
  marginRight: 15,
  backgroundColor: '#e1e1e1', // Fondo gris de respaldo mientras carga
},
userInfo: {
  flex: 1,
  justifyContent: 'center',
},
userName: {
  fontSize: 16,
  fontWeight: '600',
  color: '#000000',
  marginBottom: 2,
},
profileLink: {
  fontSize: 14,
  color: '#0066cc', // Color azul igual al de tu captura
  fontWeight: '500',
},
});