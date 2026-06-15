// import { initializeApp, getApps, getApp } from 'firebase/app';

// import { getFirestore } from 'firebase/firestore';

// import { getAuth } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
// };

// const app =
//   getApps().length === 0
//     ? initializeApp(firebaseConfig)
//     : getApp();

// const auth = getAuth(app);

// const db = getFirestore(app);

// export { app, auth, db };
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// 1. Cambiamos getAuth por initializeAuth y añadimos el gestor de persistencia nativa
import { initializeAuth, getAuth } from 'firebase/auth';
import * as firebaseAuth from 'firebase/auth'; // Importamos todo el módulo
// import { getReactNativePersistence } from 'firebase/auth/react-native';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// Validamos si la app ya está inicializada para evitar duplicados en desarrollo
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// 2. Inicializamos la autenticación con persistencia solo si es la primera vez
const auth = getApps().length === 0 
  ? initializeAuth(app, {
      persistence: (firebaseAuth as any).getReactNativePersistence(ReactNativeAsyncStorage),    })
  : getAuth(app); // Si ya existía la app, recuperamos la instancia activa

const db = getFirestore(app);

export { app, auth, db };
