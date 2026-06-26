import {
    createAuthUser,
    loginUser,
    sendVerificationEmail,
    refreshAuthUser,
} from './authService';

import {
    createUserProfile,
    getUserProfile,
} from './firestoreUserService';

import {
    isUsernameTaken,
    reserveUsername,
} from './usernameService';

export const authFacade = {
    // =========================
    // LOGIN
    // =========================
    async login(email: string, password: string) {
        const user = await loginUser(email, password);

        await refreshAuthUser();

        const profile = await getUserProfile(user.uid);

        if (!profile) throw new Error('NO_PROFILE');

        if (profile.deleted) throw new Error('USER_DELETED');
        if (profile.banned) throw new Error('USER_BANNED');

        if (!user.emailVerified) throw new Error('EMAIL_NOT_VERIFIED');

        return profile;
    },

    // =========================
    // REGISTER
    // =========================
    async register(data: {
        email: string;
        password: string;
        accountName: string;
        displayName: string;
        avatar: string;
    }) {
        // 1. check username
        const exists = await isUsernameTaken(data.accountName);
        if (exists) throw new Error('USERNAME_TAKEN');

        // 2. create auth user
        const user = await createAuthUser(data.email, data.password);

        // 3. firestore profile
        await createUserProfile({
            uid: user.uid,
            email: data.email,
            displayName: data.displayName,
            accountName: data.accountName,
            avatar: data.avatar,
        });

        // 4. username mapping
        await reserveUsername(user.uid, data.accountName);

        // 5. email verification
        await sendVerificationEmail(user);

        return user.uid;
    },

    // =========================
    // EMAIL VERIFY
    // =========================
    async sendVerificationEmail() {
        return sendVerificationEmail();
    },

    // =========================
    // LOGOUT
    // =========================
    async logout() {
        const { getAuth, signOut } = await import('firebase/auth');
        return signOut(getAuth());
    },
};