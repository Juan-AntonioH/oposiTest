import { auth } from '@/core/config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/core/config/firebase';

export type AuthFlowState =
    | 'loading'
    | 'unauthenticated'
    | 'unverified'
    | 'authenticated';

export async function getAuthFlowState(): Promise<AuthFlowState> {
    const user = auth.currentUser;

    // 1. No hay usuario
    if (!user) {
        return 'unauthenticated';
    }

    // 2. refrescar estado Firebase
    await user.reload();

    // 3. email no verificado
    if (!user.emailVerified) {
        return 'unverified';
    }

    // 4. comprobar Firestore
    const ref = doc(db, 'users', user.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
        return 'unauthenticated';
    }

    return 'authenticated';
}