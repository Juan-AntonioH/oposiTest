import { sendPasswordResetEmail } from 'firebase/auth';

import { auth } from '@/core/config/firebase';

import { existsEmail } from './firestoreUserService';

export async function sendRecoveryEmail(email: string) {

    const exists = await existsEmail(email);

    if (!exists) {
        throw new Error('EMAIL_NOT_FOUND');
    }

    await sendPasswordResetEmail(auth, email);
}