import { create } from 'zustand';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { auth, db } from '@/core/config/firebase';

interface AuthState {
  isLoggedIn: boolean;
  loading: boolean;

  uid: string | null;
  displayName: string;
  accountName: string;
  email: string;
  role: string;

  initAuth: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isLoggedIn: false,
  loading: true,

  uid: null,
  displayName: '',
  accountName: '',
  email: '',
  role: '',

  initAuth: () => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        set({
          isLoggedIn: false,
          loading: false,
          uid: null,
        });
        return;
      }

      await user.reload();

      // 🚫 BLOQUEO SI NO VERIFICADO
      if (!user.emailVerified) {
        set({
          isLoggedIn: false,
          loading: false,
          uid: user.uid,
        });
        return;
      }

      const ref = doc(db, 'users', user.uid);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        set({
          isLoggedIn: false,
          loading: false,
        });
        return;
      }

      const data = snap.data();

      set({
        isLoggedIn: true,
        loading: false,

        uid: user.uid,
        email: data.email ?? '',
        displayName: data.displayName ?? '',
        accountName: data.accountName ?? '',
        role: data.role ?? 'user',
      });
    });
  },

  logout: async () => {
    await auth.signOut();

    set({
      isLoggedIn: false,
      uid: null,
      displayName: '',
      accountName: '',
      email: '',
      role: '',
    });
  },
}));