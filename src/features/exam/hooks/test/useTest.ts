import {
    useMemo,
} from 'react';

import {
    useTestStore,
} from '../../store/useTestStore';

export function useTest() {

    const {

        testQuestions,

        currentQuestionIndex,

        loading,

        error,

    } = useTestStore();

    const currentQuestion =
        useMemo(() => {

            return (
                testQuestions[
                currentQuestionIndex
                ] ?? null
            );

        }, [

            testQuestions,

            currentQuestionIndex,

        ]);

    return {

        testQuestions,

        currentQuestionIndex,

        currentQuestion,

        loading,

        error,

    };

}