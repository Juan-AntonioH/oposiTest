import { create } from 'zustand';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { auth, db } from '@/core/config/firebase';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated' | 'unverified';

interface AuthState {
  status: AuthStatus;

  uid: string | null;
  email: string | null;
  displayName: string;
  accountName: string;
  role: string;

  initAuth: () => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  status: 'loading',

  uid: null,
  email: null,
  displayName: '',
  accountName: '',
  role: '',

  initAuth: () => {
    onAuthStateChanged(auth, async (user: User | null) => {
      if (!user) {
        set({
          status: 'unauthenticated',
          uid: null,
          email: null,
          displayName: '',
          accountName: '',
          role: '',
        });
        return;
      }

      // 🔄 refrescar email verification
      await user.reload();

      // 🚫 NO verificado
      if (!user.emailVerified) {
        set({
          status: 'unverified',
          uid: user.uid,
          email: user.email,
        });
        return;
      }

      // 🔥 Firestore user
      const ref = doc(db, 'users', user.uid);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        set({ status: 'unauthenticated' });
        return;
      }

      const data = snap.data();

      set({
        status: 'authenticated',

        uid: user.uid,
        email: user.email,
        displayName: data.displayName,
        accountName: data.accountName,
        role: data.role,
      });
    });
  },

  logout: async () => {
    await auth.signOut();

    set({
      status: 'unauthenticated',
      uid: null,
      email: null,
      displayName: '',
      accountName: '',
      role: '',
    });
  },
}));