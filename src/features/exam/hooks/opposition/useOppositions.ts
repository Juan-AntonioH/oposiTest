import { useCallback, useEffect, useState } from 'react';

import { getActiveOppositions } from '../../services/oppositionService';
import { Opposition } from '../../types/opposition';

export function useOppositions() {

    const [oppositions, setOppositions] = useState<Opposition[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadOppositions = useCallback(async () => {

        try {

            setLoading(true);

            const data = await getActiveOppositions();

            setOppositions(data);

            setError(null);

        } catch (error) {

            console.error(error);

            setError('No se pudieron cargar las oposiciones.');

        } finally {

            setLoading(false);

        }

    }, []);

    useEffect(() => {

        loadOppositions();

    }, [loadOppositions]);

    return {
        oppositions,
        loading,
        error,
        reload: loadOppositions,
    };
}