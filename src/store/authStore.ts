// Ejemplo conceptual si usas Zustand (puedes adaptarlo a tu gestor de estado)
import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  userName: string;
  userAvatar: string;
  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false, // 👈 Por defecto arranca deslogueado (false)
  userName: 'Usuario Demo',
  userAvatar: 'avatar_01',
  login: () => set({ isLoggedIn: true }),  // 👈 Solo cambia a true cuando se ejecuta explícitamente
  logout: () => set({ isLoggedIn: false }), // 👈 Cambia a false al cerrar sesión
}));

