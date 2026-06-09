// Ejemplo conceptual si usas Zustand (puedes adaptarlo a tu gestor de estado)
import { act } from 'react';
import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  userName: string;
  accountName: string; // Nuevo campo para el nombre de la cuenta
  userAvatar: string;
  userEmail: string;
  userRole: string;
  login: () => void;
  logout: () => void;
  // Ahora el login recibe los datos del usuario real desde tu base de datos
  // login: (userData: { name: string; accountName: string; avatar: string; email: string; role: string }) => void;
  // logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false, // 👈 Por defecto arranca deslogueado (false)
  userName: 'Usuario Demo',
  accountName: 'Cuenta Demo',
  userAvatar: 'avatar_01',
  userEmail: 'usuario@demo.com',
  userRole: 'user',

  // // Al loguearse, guardamos todo lo que nos mande la API o el formulario
  // login: (userData) => set({
  //   isLoggedIn: true,
  //   userName: userData.name,
  //   accountName: userData.accountName, // Aquí podrías mapearlo a un campo específico si tu API lo tiene
  //   userAvatar: userData.avatar,
  //   userEmail: userData.email,
  //   userRole: userData.role
  // }),

  // // Al cerrar sesión, limpiamos absolutamente todo por seguridad
  // logout: () => set({
  //   isLoggedIn: false,
  //   userName: '',
  //   accountName: '',
  //   userAvatar: '',
  //   userEmail: '',
  //   userRole: ''
  // }),
  login: () => set({ isLoggedIn: true }),  // 👈 Solo cambia a true cuando se ejecuta explícitamente
  logout: () => set({ isLoggedIn: false }), // 👈 Cambia a false al cerrar sesión
}));

