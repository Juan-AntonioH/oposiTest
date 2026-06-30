import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/core/config/firebase';

export async function createUserProfile(uid: string, data: any) {
    await setDoc(doc(db, 'users', uid), {
        ...data,
        createdAt: serverTimestamp(),
    });
}

export async function getUserProfile(uid: string) {
    const snap = await getDoc(doc(db, 'users', uid));
    return snap.exists() ? snap.data() : null;
}