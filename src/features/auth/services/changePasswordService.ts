import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/core/config/firebase';

export async function sendChangePasswordEmail() {
    const user = auth.currentUser;

    if (!user?.email) {
        throw new Error('NO_EMAIL');
    }

    await sendPasswordResetEmail(auth, user.email);
}