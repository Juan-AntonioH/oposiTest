import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    getAuth,
} from 'firebase/auth';

const auth = getAuth();

// =========================
// REGISTER
// =========================
export async function registerAuth(email: string, password: string) {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    await sendEmailVerification(result.user);

    return result.user;
}

// =========================
// LOGIN
// =========================
export async function loginAuth(email: string, password: string) {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
}

// =========================
// REENVIAR EMAIL
// =========================
export async function sendVerification() {
    const user = auth.currentUser;

    if (!user) {
        throw new Error('NO_USER');
    }

    await sendEmailVerification(user);
}

// =========================
// COMPROBAR VERIFICACIÓN
// =========================
export async function checkEmailVerified() {
    const user = auth.currentUser;

    if (!user) {
        return false;
    }

    await user.reload();

    return user.emailVerified;
}

// =========================
// RECUPERAR CONTRASEÑA
// =========================
export async function sendPasswordReset(email: string) {
    await sendPasswordResetEmail(auth, email);
}