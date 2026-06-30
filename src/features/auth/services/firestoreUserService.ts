import {
    doc,
    setDoc,
    getDoc,
    serverTimestamp,
    query,
    where,
    collection,
    getDocs,
    DocumentData,
} from 'firebase/firestore';

import { db } from '@/core/config/firebase';

// =========================
// CREATE PROFILE
// =========================
export async function createUserProfile(
    uid: string,
    data: DocumentData,
): Promise<void> {
    await setDoc(doc(db, 'users', uid), {
        ...data,
        createdAt: serverTimestamp(),
    });
}

// =========================
// GET PROFILE
// =========================
export async function getUserProfile(
    uid: string,
): Promise<DocumentData | null> {
    const snap = await getDoc(doc(db, 'users', uid));

    return snap.exists() ? snap.data() : null;
}

// =========================
// EXISTS EMAIL
// =========================
export async function existsEmail(email: string): Promise<boolean> {
    const q = query(
        collection(db, 'users'),
        where('email', '==', email),
    );

    const snap = await getDocs(q);

    return !snap.empty;
}