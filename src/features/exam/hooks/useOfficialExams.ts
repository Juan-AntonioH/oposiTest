import { useCallback, useEffect, useState } from 'react';

import { OfficialExam } from '../types';
import { getOfficialExams } from '../services/officialExamService';

export function useOfficialExams(oppositionId: string) {

    const [exams, setExams] = useState<OfficialExam[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadExams = useCallback(async () => {

        try {

            setLoading(true);
            setError(null);

            const data = await getOfficialExams(oppositionId);

            setExams(data);

        } catch (err) {

            console.error(err);

            setError(
                'No se han podido cargar los exámenes oficiales.',
            );

        } finally {

            setLoading(false);

        }

    }, [oppositionId]);

    useEffect(() => {

        if (!oppositionId) {

            setExams([]);
            setLoading(false);

            return;

        }

        loadExams();

    }, [loadExams, oppositionId]);

    return {

        exams,

        loading,

        error,

        reload: loadExams,

    };

}