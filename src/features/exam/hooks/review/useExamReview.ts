import {
    useEffect,
    useState,
    useCallback,
} from 'react';

import {
    useRoute,
} from '@react-navigation/native';

import {
    RouteProp,
} from '@react-navigation/native';

import {
    RootStackParamList,
} from '@/navigation/types';

import {
    useTestStore,
} from '../../store/useTestStore';

type ReviewRoute =
    RouteProp<
        RootStackParamList,
        'ExamReviewScreen'
    >;

export function useExamReview() {

    const route =
        useRoute<ReviewRoute>();

    const testQuestions =
        useTestStore(
            state => state.testQuestions,
        );

    const startIndex =
        route.params?.startIndex ?? 0;

    const [
        currentIndex,
        setCurrentIndex,
    ] = useState(startIndex);

    useEffect(() => {

        if (
            route.params?.startIndex !==
            undefined
        ) {

            setCurrentIndex(
                route.params.startIndex,
            );

        }

    }, [
        route.params?.startIndex,
    ]);

    const totalQuestions =
        testQuestions.length;

    const currentQuestion =
        testQuestions[currentIndex];

    const canGoPrev =
        currentIndex > 0;

    const canGoNext =
        currentIndex <
        totalQuestions - 1;

    const previousQuestion =
        useCallback(() => {

            if (canGoPrev) {

                setCurrentIndex(
                    previousQuestion =>
                        previousQuestion - 1,
                );

            }

        }, [
            canGoPrev,
        ]);

    const nextQuestion =
        useCallback(() => {

            if (canGoNext) {

                setCurrentIndex(
                    previousQuestion =>
                        previousQuestion + 1,
                );

            }

        }, [
            canGoNext,
        ]);

    return {

        testQuestions,

        currentQuestion,

        currentIndex,

        totalQuestions,

        canGoPrev,

        canGoNext,

        previousQuestion,

        nextQuestion,

    };

}