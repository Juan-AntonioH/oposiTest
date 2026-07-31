import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';

import { db } from '@/core/config/firebase';

import { loginAuth, registerAuth } from './authService';
import { createUserProfile, getUserByEmail, reactivateUserProfile, } from './firestoreUserService';
import { getUidFromAccountName, isUsernameTaken } from './usernameService';
import { sendRecoveryEmail } from './passwordRecoveryService';
import { LoginResult, UserProfile } from '../types/auth';
import { normalizeAccountName } from '../types/helpers';

export const authFacade = {

  // =========================
  // LOGIN
  // =========================
  async login(identifier: string, password: string): Promise<LoginResult> {

    let email = identifier;

    // 👉 LOGIN POR ACCOUNTNAME
    if (identifier.includes('@')) {

      const user = await getUserByEmail(identifier);

      if (!user) {
        throw new Error('EMAIL_NOT_FOUND');
      }

      if (user.deleted) {
        throw new Error('ACCOUNT_DELETED');
      }

      email = user.email;

    } else {

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

      const userData = userSnap.data();

      if (userData.deleted) {
        throw new Error('ACCOUNT_DELETED');
      }

      email = userData.email;
    }

    // 👉 LOGIN FIREBASE AUTH
    const authUser = await loginAuth(email, password);

    // 👉 PERFIL FIRESTORE
    const profileSnap = await getDoc(doc(db, 'users', authUser.uid));

    if (!profileSnap.exists()) {
      throw new Error('PROFILE_NOT_FOUND');
    }

    const data = profileSnap.data();

    if (data.deleted) {
      throw new Error('ACCOUNT_DELETED');
    }

    const profile: UserProfile = {
      ...(data as UserProfile),
      avatar: data.avatar || 'avatar_01',
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

    const normalizedAccountName = normalizeAccountName(data.accountName);

    // Comprobar si el username está libre
    if (await isUsernameTaken(normalizedAccountName)) {
      throw new Error('USERNAME_TAKEN');
    }

    // Buscar si ya existe un usuario con ese email
    const existingUser = await getUserByEmail(data.email);

    // -------------------------
    // CUENTA ELIMINADA → REACTIVAR
    // -------------------------
    if (existingUser && existingUser.deleted) {

      await reactivateUserProfile(existingUser.uid, {
        email: data.email,
        displayName: data.displayName,
        accountName: normalizedAccountName,
        avatar: data.avatar,
        role: existingUser.role,
      });

      await sendRecoveryEmail(data.email);

      return {
        status: 'reactivated' as const,
        uid: existingUser.uid,
      };
    }

    // -------------------------
    // CUENTA YA EXISTE
    // -------------------------
    if (existingUser) {
      throw new Error('auth/email-already-in-use');
    }

    // -------------------------
    // REGISTRO NORMAL
    // -------------------------
    const user = await registerAuth(
      data.email,
      data.password,
    );

    await createUserProfile(user.uid, {
      email: data.email,
      displayName: data.displayName,
      accountName: normalizedAccountName,
      avatar: data.avatar,
      role: 'user',
      deleted: false,
    });

    await setDoc(
      doc(db, 'usernames', normalizedAccountName),
      {
        uid: user.uid,
        createdAt: serverTimestamp(),
      },
    );

    return {
      status: 'created' as const,
      uid: user.uid,
    };
  },

  // =========================
  // LOGOUT
  // =========================
  async logout() {
    const { signOut, getAuth } = await import('firebase/auth');
    return signOut(getAuth());
  },
};
