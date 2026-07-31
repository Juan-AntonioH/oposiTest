export const accountNameRegex = /^[a-zA-Z0-9]+$/;

export function isValidAccountName(name: string) {
    return (
        name.length >= 3 &&
        name.length <= 15 &&
        accountNameRegex.test(name)
    );
}

export function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPassword(password: string) {
    return (
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[^A-Za-z0-9]/.test(password)
    );
}