import {
    useCallback,
    useEffect,
} from 'react';

import { useTestStore } from '../../store/useTestStore';

import { loadQuestions } from '../../services/questionService';

import { ExamType } from '../../types';

interface UseTestParams {
    oppositionId: string;
    examType: ExamType;
    year?: number;
    convocatoria?: string;
}

export function useTest({
    oppositionId,
    examType,
    year,
    convocatoria,
}: UseTestParams) {

    const {
        testQuestions,
        currentQuestionIndex,
        loading,
        error,

        initializeTestQuestions: loadQuestionsStore,
        setLoading,
        setError,
        resetTest,
    } = useTestStore();

    const loadTest = useCallback(async () => {

        try {

            setLoading(true);

            const questions = await loadQuestions({
                examType,
                oppositionId,
                year,
                convocatoria,
            });

            loadQuestionsStore(questions);

        } catch (error) {
            console.error('LOAD TEST ERROR', error);
            console.error(error);

            setError(
                error instanceof Error
                    ? error.message
                    : 'Unable to load questions.',
            );

        }

    }, [
        examType,
        oppositionId,
        year,
        convocatoria,
        loadQuestionsStore,
        setLoading,
        setError,
    ]);

    useEffect(() => {

        loadTest();

        return () => {

            resetTest();

        };

    }, [
        loadTest,
        resetTest,
    ]);

    return {

        testQuestions,

        currentQuestionIndex,

        currentQuestion:
            testQuestions[currentQuestionIndex] ?? null,

        loading,

        error,

        reload: loadTest,

    };

}