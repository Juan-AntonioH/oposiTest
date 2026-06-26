import { db } from '@/core/config/firebase';
import {
    doc,
    setDoc,
    getDoc,
    serverTimestamp,
} from 'firebase/firestore';

export interface CreateUserProfileDTO {
    uid: string;
    email: string;
    displayName: string;
    accountName: string;
    avatar: string;
    role?: string;
}

/**
 * CREAR PERFIL DE USUARIO
 */
export async function createUserProfile(data: CreateUserProfileDTO) {
    await setDoc(doc(db, 'users', data.uid), {
        uid: data.uid,
        email: data.email,
        displayName: data.displayName,
        accountName: data.accountName,
        avatar: data.avatar,
        role: data.role ?? 'user',
        banned: false,
        deleted: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
}

/**
 * OBTENER PERFIL
 */
export async function getUserProfile(uid: string) {
    const snap = await getDoc(doc(db, 'users', uid));

    if (!snap.exists()) return null;

    return snap.data();
}