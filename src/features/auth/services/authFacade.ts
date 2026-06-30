import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';

import { db } from '@/core/config/firebase';

import { loginAuth, registerAuth } from './authService';
import { createUserProfile } from './firestoreUserService';
import { getUidFromAccountName } from './usernameService';

import { LoginResult, UserProfile } from '../types/auth';
import { normalizeAccountName } from '../types/helpers';

export const authFacade = {

  // =========================
  // LOGIN
  // =========================
  async login(identifier: string, password: string): Promise<LoginResult> {

    let email = identifier;

    // 👉 LOGIN POR ACCOUNTNAME
    if (!identifier.includes('@')) {
      const uid = await getUidFromAccountName(
        normalizeAccountName(identifier)
      );

      if (!uid) {
        throw new Error('USER_NOT_FOUND');
      }

      const userSnap = await getDoc(doc(db, 'users', uid));

      if (!userSnap.exists()) {
        throw new Error('PROFILE_NOT_FOUND');
      }

      email = userSnap.data().email;
    }

    // 👉 LOGIN FIREBASE AUTH
    const authUser = await loginAuth(email, password);

    // 👉 PERFIL FIRESTORE
    const profileSnap = await getDoc(doc(db, 'users', authUser.uid));

    if (!profileSnap.exists()) {
      throw new Error('PROFILE_NOT_FOUND');
    }

    // Solo modificamos esto para asegurar el tipado correcto del nuevo formato de avatar
    const data = profileSnap.data();
    
    const profile: UserProfile = {
      ...(data as UserProfile),
      avatar: data.avatar || 'avatar_01', // 👈 Fallback seguro por si el usuario no tiene la propiedad
    };

    return {
      authUser,
      profile,
    };
  },

  // =========================
  // REGISTER
  // =========================
  async register(data: {
    email: string;
    password: string;
    accountName: string;
    displayName: string;
    avatar: string;
  }) {

    const user = await registerAuth(data.email, data.password);

    const normalizedAccountName = normalizeAccountName(data.accountName);

    await createUserProfile(user.uid, {
      email: data.email,
      displayName: data.displayName,
      accountName: normalizedAccountName,
      avatar: data.avatar, // 👈 AQUÍ guardas "avatar_01" o "custom:xxx.jpg"
      role: 'user',
    });

    await setDoc(doc(db, 'usernames', normalizedAccountName), {
      uid: user.uid,
      createdAt: serverTimestamp(),
    });

    return user.uid;
  },

  // =========================
  // LOGOUT
  // =========================
  async logout() {
    const { signOut, getAuth } = await import('firebase/auth');
    return signOut(getAuth());
  },
};
