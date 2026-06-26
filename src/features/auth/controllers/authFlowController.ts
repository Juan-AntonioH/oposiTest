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

    if (!user) return 'unauthenticated';

    await user.reload();

    if (!user.emailVerified) {
        return 'unverified';
    }

    const ref = doc(db, 'users', user.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) return 'unauthenticated';

    return 'authenticated';
}