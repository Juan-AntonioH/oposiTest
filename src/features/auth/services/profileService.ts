import {
    doc,
    runTransaction,
    updateDoc,
} from 'firebase/firestore';

import { db } from '@/core/config/firebase';
import { normalizeAccountName } from '@/features/auth/types/helpers';

interface UpdateProfileData {
    uid: string;

    currentDisplayName: string;
    newDisplayName: string;

    currentAccountName: string;
    newAccountName: string;

    currentAvatar: string;
    newAvatar: string;
}

export async function updateProfile(data: UpdateProfileData) {

    const normalized = normalizeAccountName(data.newAccountName);

    const displayNameChanged =
        data.currentDisplayName !== data.newDisplayName;

    const avatarChanged =
        data.currentAvatar !== data.newAvatar;

    const accountNameChanged =
        normalizeAccountName(data.currentAccountName) !== normalized;

    // ----------------------------------
    // NO HAY CAMBIOS
    // ----------------------------------

    if (
        !displayNameChanged &&
        !avatarChanged &&
        !accountNameChanged
    ) {
        return false;
    }

    // ----------------------------------
    // NO CAMBIA ACCOUNTNAME
    // ----------------------------------

    if (!accountNameChanged) {

        const updates: Record<string, any> = {};

        if (displayNameChanged) {
            updates.displayName = data.newDisplayName;
        }

        if (avatarChanged) {
            updates.avatar = data.newAvatar;
        }

        await updateDoc(
            doc(db, 'users', data.uid),
            updates,
        );

        return true;
    }

    // ----------------------------------
    // CAMBIA ACCOUNTNAME
    // ----------------------------------

    await runTransaction(db, async (transaction) => {

        const userRef = doc(
            db,
            'users',
            data.uid,
        );

        const oldUsernameRef = doc(
            db,
            'usernames',
            data.currentAccountName,
        );

        const newUsernameRef = doc(
            db,
            'usernames',
            normalized,
        );

        const usernameSnap =
            await transaction.get(newUsernameRef);

        if (usernameSnap.exists()) {
            throw new Error('USERNAME_TAKEN');
        }

        const updates: Record<string, any> = {
            accountName: normalized,
        };

        if (displayNameChanged) {
            updates.displayName = data.newDisplayName;
        }

        if (avatarChanged) {
            updates.avatar = data.newAvatar;
        }

        transaction.update(userRef, updates);

        transaction.set(newUsernameRef, {
            uid: data.uid,
            createdAt: new Date(),
        });

        transaction.delete(oldUsernameRef);

    });

    return true;
}