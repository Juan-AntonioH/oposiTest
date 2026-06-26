import { useEffect, useState } from 'react';
import { checkUsernameExists } from '../services/authService';
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

            const exists = await checkUsernameExists(accountName);

            setStatus(exists ? 'taken' : 'available');
        }, 500);

        return () => clearTimeout(timeout);
    }, [accountName]);

    return status;
}