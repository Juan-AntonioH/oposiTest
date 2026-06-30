import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from 'firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// ¿Es la primera inicialización?
const isFirstApp = getApps().length === 0;

// Firebase App
const app = isFirstApp
  ? initializeApp(firebaseConfig)
  : getApp();

// Firebase Auth con persistencia
const auth = isFirstApp
  ? initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  })
  : getAuth(app);
// const auth = getAuth(app);
// Firestore
const db = getFirestore(app);

export { app, auth, db };