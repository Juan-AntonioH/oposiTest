import {
    doc,
    runTransaction,
    serverTimestamp,
} from 'firebase/firestore';

import { signOut } from 'firebase/auth';

import { db, auth } from '@/core/config/firebase';

export async function deleteAccount(
    uid: string,
    accountName: string,
) {

    await runTransaction(db, async (transaction) => {

        const userRef = doc(
            db,
            'users',
            uid,
        );

        const usernameRef = doc(
            db,
            'usernames',
            accountName,
        );

        transaction.update(userRef, {
            deleted: true,
            deletedAt: serverTimestamp(),
        });

        transaction.delete(usernameRef);

    });

    await signOut(auth);

}