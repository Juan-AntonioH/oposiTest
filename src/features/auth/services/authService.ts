import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    deleteUser,
} from 'firebase/auth';

import {
    doc,
    setDoc,
    getDoc,
    serverTimestamp,
    writeBatch,
} from 'firebase/firestore';

import { auth, db } from '@/core/config/firebase';

// -------------------------
// EMAIL VERIFICATION
// -------------------------

export async function sendVerificationEmail() {
    const user = auth.currentUser;
    if (!user) throw new Error('NO_USER');

    await sendEmailVerification(user);
}

export async function checkEmailVerified() {
    const user = auth.currentUser;
    if (!user) return false;

    await user.reload();
    return user.emailVerified;
}

// -------------------------
// USERNAME CHECK
// -------------------------

export async function checkUsernameExists(accountName: string) {
    const username = accountName.trim().toLowerCase();

    const ref = doc(db, 'usernames', username);
    const snap = await getDoc(ref);

    return snap.exists();
}

// -------------------------
// REGISTER (ATOMIC + CLEAN)
// -------------------------

export async function registerUser(data: {
    email: string;
    password: string;
    accountName: string;
    displayName: string;
    avatar: string;
}) {
    let userCredential;

    const normalizedAccountName = data.accountName.trim().toLowerCase();

    try {
        // 1. AUTH
        userCredential = await createUserWithEmailAndPassword(
            auth,
            data.email,
            data.password
        );

        const uid = userCredential.user.uid;

        // 2. FIRESTORE ATOMIC WRITE
        const batch = writeBatch(db);

        batch.set(doc(db, 'users', uid), {
            uid,
            email: data.email,
            accountName: normalizedAccountName,
            displayName: data.displayName,
            avatar: data.avatar,
            role: 'user',
            banned: false,
            deleted: false,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });

        batch.set(doc(db, 'usernames', normalizedAccountName), {
            uid,
        });

        await batch.commit();

        // 3. EMAIL VERIFICATION
        await sendEmailVerification(userCredential.user);

        return uid;
    } catch (error) {
        // 🔥 rollback anti “fantasmas”
        if (auth.currentUser) {
            await deleteUser(auth.currentUser);
        }

        throw error;
    }
}