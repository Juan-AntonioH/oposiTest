import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    getAuth,
    User,
} from 'firebase/auth';

const auth = getAuth();

/**
 * REGISTRO EN FIREBASE AUTH
 */
export async function createAuthUser(email: string, password: string) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    return cred.user;
}

/**
 * LOGIN
 */
export async function loginUser(email: string, password: string) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
}

/**
 * ENVIAR EMAIL VERIFICACIÓN
 */
export async function sendVerificationEmail(user?: User) {
    const currentUser = user ?? auth.currentUser;
    if (!currentUser) throw new Error('NO_USER');

    await sendEmailVerification(currentUser);
}

/**
 * RELOAD USER (para comprobar emailVerified)
 */
export async function refreshAuthUser() {
    const user = auth.currentUser;
    if (!user) return null;

    await user.reload();
    return user;
}

/**
 * CURRENT USER
 */
export function getCurrentUser() {
    return auth.currentUser;
}