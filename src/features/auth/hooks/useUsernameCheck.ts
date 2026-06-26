import { useEffect, useState } from 'react';
import { isUsernameTaken } from '../services/usernameService';
import { isValidAccountName } from '../utils/validators';

export function useUsernameCheck(accountName: string) {
    const [status, setStatus] = useState<
        'idle' | 'checking' | 'available' | 'taken'
    >('idle');

    useEffect(() => {
        if (!isValidAccountName(accountName)) {
            setStatus('idle');
            return;
        }

        const timeout = setTimeout(async () => {
            setStatus('checking');

            const exists = await isUsernameTaken(accountName); // ✔ FIX REAL

            setStatus(exists ? 'taken' : 'available');
        }, 500);

        return () => clearTimeout(timeout);
    }, [accountName]);

    return status;
}