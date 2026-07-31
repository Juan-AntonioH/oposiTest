import { create } from 'zustand';

import {
    Question,
    TestQuestion,
} from '../types';

interface TestState {
    testQuestions: TestQuestion[];

    currentQuestionIndex: number;

    loading: boolean;

    error: string | null;

    initializeTestQuestions: (
        questions: Question[],
    ) => void;

    loadCompletedTestQuestions: (
        questions: TestQuestion[],
    ) => void;

    setLoading: (
        loading: boolean,
    ) => void;

    setError: (
        error: string | null,
    ) => void;

    answerQuestion: (
        response: number | null,
        questionTimeSpent: number,
    ) => void;

    nextQuestion: () => void;

    previousQuestion: () => void;

    finishExamEarly: (
        questionTimeSpent: number,
    ) => TestQuestion[];

    resetTest: () => void;

    getCurrentQuestion: () => TestQuestion | null;

    hasNextQuestion: () => boolean;

    hasPreviousQuestion: () => boolean;

    isFirstQuestion: () => boolean;

    isLastQuestion: () => boolean;

    getTotalQuestions: () => number;
}

export const useTestStore = create<TestState>((set, get) => ({

    testQuestions: [],

    currentQuestionIndex: 0,

    loading: false,

    error: null,

    initializeTestQuestions: (questions) => {

        const processedQuestions: TestQuestion[] =
            questions.map((question, index) => ({
                ...question,
                numQuestion: index + 1,
                userResponse: null,
                questionTimeSpent: 0,
            }));

        set({
            testQuestions: processedQuestions,
            currentQuestionIndex: 0,
            loading: false,
            error: null,
        });

    },

    loadCompletedTestQuestions: (
        questions,
    ) => {

        set({

            testQuestions:
                questions,

            currentQuestionIndex:
                0,

            loading:
                false,

            error:
                null,

        });

    },

    setLoading: (loading) => {

        set({
            loading,
        });

    },

    setError: (error) => {

        set({
            error,
            loading: false,
        });

    },

    answerQuestion: (
        response,
        questionTimeSpent,
    ) => {

        const {
            testQuestions,
            currentQuestionIndex,
        } = get();

        const updatedQuestions =
            testQuestions.map((
                question,
                index,
            ) => {

                if (
                    index !== currentQuestionIndex
                ) {
                    return question;
                }

                return {
                    ...question,
                    userResponse: response,
                    questionTimeSpent,
                };

            });

        set({
            testQuestions: updatedQuestions,
        });

    },

    nextQuestion: () => {

        const {
            currentQuestionIndex,
            testQuestions,
        } = get();

        if (
            currentQuestionIndex >=
            testQuestions.length - 1
        ) {
            return;
        }

        set({
            currentQuestionIndex:
                currentQuestionIndex + 1,
        });

    },

    previousQuestion: () => {

        const {
            currentQuestionIndex,
        } = get();

        if (currentQuestionIndex <= 0) {
            return;
        }

        set({
            currentQuestionIndex:
                currentQuestionIndex - 1,
        });

    },

    finishExamEarly: (
        questionTimeSpent,
    ) => {

        const {
            testQuestions,
            currentQuestionIndex,
        } = get();

        const finalizedQuestions =
            testQuestions.map((
                question,
                index,
            ) => {

                if (
                    index ===
                    currentQuestionIndex
                ) {

                    return {
                        ...question,
                        questionTimeSpent,
                    };

                }

                if (
                    index >
                    currentQuestionIndex
                ) {

                    return {
                        ...question,
                        userResponse: null,
                        questionTimeSpent: 0,
                    };

                }

                return question;

            });

        set({
            testQuestions: finalizedQuestions,
        });

        return finalizedQuestions;

    },

    resetTest: () => {

        set({
            testQuestions: [],
            currentQuestionIndex: 0,
            loading: false,
            error: null,
        });

    },

    getCurrentQuestion: () => {

        const {
            testQuestions,
            currentQuestionIndex,
        } = get();

        return (
            testQuestions[
            currentQuestionIndex
            ] ?? null
        );

    },

    hasNextQuestion: () => {

        const {
            currentQuestionIndex,
            testQuestions,
        } = get();

        return (
            currentQuestionIndex <
            testQuestions.length - 1
        );

    },

    hasPreviousQuestion: () => {

        return (
            get().currentQuestionIndex > 0
        );

    },

    isFirstQuestion: () => {

        return (
            get().currentQuestionIndex === 0
        );

    },

    isLastQuestion: () => {

        const {
            currentQuestionIndex,
            testQuestions,
        } = get();

        return (
            currentQuestionIndex ===
            testQuestions.length - 1
        );

    },

    getTotalQuestions: () => {

        return get().testQuestions.length;

    },

}));