import {
    useCallback,
    useEffect,
    useMemo,
} from 'react';

import {
    useTestStore,
} from '../../store/useTestStore';

import {
    loadQuestions,
} from '../../services/questionService';

import {
    ExamType,
    QuestionFilters,
    SelectedTheme,
} from '../../types';

interface UseTestParams {

    oppositionId: string;

    examType: ExamType;

    year?: number;

    convocatoria?: string;

    selectedBlocks?: string[];

    selectedThemes?: SelectedTheme[];

}

export function useTest({

    oppositionId,

    examType,

    year,

    convocatoria,

    selectedBlocks,

    selectedThemes,

}: UseTestParams) {

    const {

        testQuestions,

        currentQuestionIndex,

        loading,

        error,

        initializeTestQuestions,

        setLoading,

        setError,

    } = useTestStore();

    const filters =
        useMemo<QuestionFilters>(() => ({

            oppositionId,

            examType,

            year,

            convocatoria,

            selectedBlocks,

            selectedThemes,

        }), [

            oppositionId,

            examType,

            year,

            convocatoria,

            selectedBlocks,

            selectedThemes,

        ]);

    const loadTest =
        useCallback(async () => {

            try {

                setLoading(true);

                console.log('ANTES loadQuestions');

                const questions = await loadQuestions({

                    examType,

                    oppositionId,

                    year,

                    convocatoria,

                    selectedBlocks,

                    selectedThemes,

                });

                console.log(
                    'DESPUÉS loadQuestions',
                    questions.length,
                );

                initializeTestQuestions(
                    questions,
                );

                console.log(
                    'DESPUÉS initializeTestQuestions',
                );

            } catch (error) {

                console.error(
                    'LOAD TEST ERROR',
                    error,
                );

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

            selectedBlocks,

            selectedThemes,

            initializeTestQuestions,

        ]);

    useEffect(() => {

        loadTest();

    }, [

        loadTest,

    ]);

    return {

        testQuestions,

        currentQuestionIndex,

        currentQuestion:
            testQuestions[currentQuestionIndex] ??
            null,

        loading,

        error,

        reload: loadTest,

    };

}