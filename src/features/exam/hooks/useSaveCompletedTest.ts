import {
    useCallback,
    useState,
} from 'react';

import {
    CompletedTest,
} from '../types';

import {
    saveCompletedTest,
} from '../services/completedTestsService';

export function useSaveCompletedTest() {

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    const save = useCallback(async (
        completedTest: CompletedTest,
    ) => {

        try {

            setLoading(true);

            setError(null);

            return await saveCompletedTest(
                completedTest,
            );

        } catch (error) {

            setError(

                error instanceof Error
                    ? error.message
                    : 'Unable to save completed test.',

            );

            throw error;

        } finally {

            setLoading(false);

        }

    }, []);

    return {

        save,

        loading,

        error,

    };

}