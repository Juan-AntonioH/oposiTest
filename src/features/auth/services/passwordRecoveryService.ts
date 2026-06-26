import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const auth = getAuth();

export async function sendRecoveryEmail(email: string) {
    if (!email) throw new Error('EMAIL_REQUIRED');

    await sendPasswordResetEmail(auth, email);
}