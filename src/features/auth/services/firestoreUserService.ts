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
    updateDoc,
} from 'firebase/firestore';
import { UserProfile } from '../types/auth';
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

export async function getUserByEmail(
    email: string,
): Promise<(UserProfile & { uid: string }) | null> {

    const q = query(
        collection(db, 'users'),
        where('email', '==', email),
    );

    const snap = await getDocs(q);

    if (snap.empty) {
        return null;
    }

    return {
        uid: snap.docs[0].id,
        ...(snap.docs[0].data() as UserProfile),
    };
}

export async function reactivateUserProfile(
    uid: string,
    data: {
        email: string;
        displayName: string;
        accountName: string;
        avatar: string;
        role: string;
    },
) {

    await updateDoc(doc(db, 'users', uid), {
        email: data.email,
        displayName: data.displayName,
        accountName: data.accountName,
        avatar: data.avatar,
        role: data.role,

        deleted: false,
    });

    await setDoc(doc(db, 'usernames', data.accountName), {
        uid,
        createdAt: serverTimestamp(),
    });
}