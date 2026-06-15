// Ejemplo conceptual si usas Zustand (puedes adaptarlo a tu gestor de estado)
// import { act } from 'react';
import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  uid: string;
  userName: string;
  accountName: string; // Nuevo campo para el nombre de la cuenta
  userAvatar: string;
  userEmail: string;
  userRole: string;
  login: () => void;
  // Preparado para cuando se obtenga de la db
  //   login: (userData: { 
  //   uid: string; 
  //   name: string; 
  //   accountName: string; 
  //   avatar: string; 
  //   email: string; 
  //   role: string; 
  // }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // DATOS MOCK (Para pruebas de diseño de la app)
  isLoggedIn: false, // 👈 Por defecto arranca deslogueado (false)
  uid: 'Kpqfm12Qdm',
  userName: 'Juan el Aleatorio',
  accountName: 'Cuenta Demo',
  userAvatar: 'avatar_01',
  userEmail: 'usuario@demo.com',
  userRole: 'admin',

  // // Al loguearse, guardamos todo lo que nos mande la API
  // login: (userData) => set({
  //   isLoggedIn: true,
  //   uid: userData.uid
  //   userName: userData.name,
  //   accountName: userData.accountName, // Aquí podrías mapearlo a un campo específico si tu API lo tiene
  //   userAvatar: userData.avatar,
  //   userEmail: userData.email,
  //   userRole: userData.role
  // }),

  // // Al cerrar sesión, limpiamos absolutamente todo por seguridad
  // logout: () => set({
  //   isLoggedIn: false,
  //   uid: '',
  //   userName: '',
  //   accountName: '',
  //   userAvatar: '',
  //   userEmail: '',
  //   userRole: ''
  // }),
  login: () => set({ isLoggedIn: true }),  // 👈 Solo cambia a true cuando se ejecuta explícitamente
  logout: () => set({ isLoggedIn: false }), // 👈 Cambia a false al cerrar sesión
}));

