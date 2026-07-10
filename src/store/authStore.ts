import { create } from 'zustand';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Role } from '@/core/types/roles';
import { auth, db } from '@/core/config/firebase';

type AuthStatus =
  | 'loading'
  | 'authenticated'
  | 'unauthenticated'
  | 'unverified';

interface AuthState {
  status: AuthStatus;
  initialized: boolean;

  uid: string | null;
  email: string | null;
  displayName: string;
  accountName: string;
  avatar: string;
  role: Role | null;

  initAuth: () => void;
  refreshAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  status: 'loading',
  initialized: false,

  uid: null,
  email: null,
  displayName: '',
  accountName: '',
  avatar: '',
  role: null,

  initAuth: () => {
    onAuthStateChanged(auth, async (user: User | null) => {
      try {
        // =========================
        // NO USER
        // =========================
        if (!user) {
          set({
            status: 'unauthenticated',
            initialized: true,
            uid: null,
            email: null,
            displayName: '',
            accountName: '',
            avatar: '',
            role: null,
          });
          return;
        }

        // =========================
        // REFRESH USER
        // =========================
        await user.reload();

        // =========================
        // EMAIL NO VERIFICADO
        // =========================
        if (!user.emailVerified) {
          set({
            status: 'unverified',
            initialized: true,
            uid: user.uid,
            email: user.email,
            displayName: '',
            accountName: '',
            role: null,
            avatar: '',
          });
          return;
        }

        // =========================
        // FIRESTORE PROFILE
        // =========================
        const ref = doc(db, 'users', user.uid);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          set({
            status: 'unauthenticated',
            initialized: true,
            uid: null,
            email: null,
            displayName: '',
            accountName: '',
            role: null,
            avatar: '',
          });
          return;
        }

        const data = snap.data();

        // =========================
        // AUTHENTICATED
        // =========================
        set({
          status: 'authenticated',
          initialized: true,

          uid: user.uid,
          email: user.email ?? null,
          displayName: data.displayName ?? '',
          accountName: data.accountName ?? '',
          role: data.role ?? 'user',
          avatar: data.avatar ?? '',
        });
      } catch (error) {
        console.error('🔥 AUTH INIT ERROR:', error);

        set({
          status: 'unauthenticated',
          initialized: true,
          uid: null,
          email: null,
          displayName: '',
          accountName: '',
          avatar: '',
          role: null,
        });
      }
    });
  },
  refreshAuth: async () => {
    const user = auth.currentUser;

    if (!user) {
      set({
        status: 'unauthenticated',
        uid: null,
        email: null,
        displayName: '',
        accountName: '',
        avatar: '',
        role: null,
      });
      return;
    }

    await user.reload();

    if (!user.emailVerified) {
      set({
        status: 'unverified',
        uid: user.uid,
        email: user.email,
        displayName: '',
        accountName: '',
        avatar: '',
        role: null,
      });
      return;
    }

    const snap = await getDoc(doc(db, 'users', user.uid));

    if (!snap.exists()) {
      set({
        status: 'unauthenticated',
        uid: null,
        email: null,
        displayName: '',
        accountName: '',
        avatar: '',
        role: null,
      });
      return;
    }

    const data = snap.data();

    set({
      status: 'authenticated',
      uid: user.uid,
      email: user.email,
      displayName: data.displayName,
      accountName: data.accountName,
      avatar: data.avatar ?? '',
      role: data.role,
    });
  },

  logout: async () => {
    await auth.signOut();

    set({
      status: 'unauthenticated',
      initialized: true,
      uid: null,
      email: null,
      displayName: '',
      accountName: '',
      avatar: '',
      role: null,
    });
  },
}));