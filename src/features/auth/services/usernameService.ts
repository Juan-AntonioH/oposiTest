import { db } from '@/core/config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

/**
 * COMPROBAR SI USERNAME EXISTE
 */
export async function isUsernameTaken(username: string) {
    const ref = doc(db, 'usernames', username.toLowerCase());
    const snap = await getDoc(ref);

    return snap.exists();
}

/**
 * RESERVAR USERNAME (evita duplicados)
 */
export async function reserveUsername(uid: string, username: string) {
    await setDoc(doc(db, 'usernames', username.toLowerCase()), {
        uid,
    });
}