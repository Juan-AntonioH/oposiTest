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
    paddingTop: 50,
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

  authSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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

  userName: {
    fontSize: 16,
  },

  menu: {
    padding: 8,
  },

  menuItem: {
    paddingVertical: 14,
    paddingHorizontal: 12,
  },

  menuText: {
    fontSize: 16,
  },
});