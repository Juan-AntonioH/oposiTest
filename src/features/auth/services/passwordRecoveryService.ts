import { sendPasswordResetEmail } from 'firebase/auth';

import { auth } from '@/core/config/firebase';

import { existsEmail } from './firestoreUserService';

import { getUserByEmail } from './firestoreUserService';

export async function sendRecoveryEmail(email: string) {

    const user = await getUserByEmail(email);

    if (!user) {
        throw new Error('EMAIL_NOT_FOUND');
    }

    if (user.deleted) {
        throw new Error('ACCOUNT_DELETED');
    }

    await sendPasswordResetEmail(auth, email);
}