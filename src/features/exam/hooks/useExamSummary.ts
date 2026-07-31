import {
    useMemo,
} from 'react';

import {
    useAuthStore,
} from '@/store/authStore';

import {
    useTestStore,
} from '../store/useTestStore';

import {
    buildExamSummary,
} from '../services/examSummaryService';

import {
    CompletedAnswer,
    ExamType,
} from '../types';

import {
    ExamSummaryParams,
} from '@/navigation/types';

export function useExamSummary({

    oppositionId,

    oppositionName,

    examName,

    examType,

    timeConfigured,

    finishedByTime,

    finishedEarly,

    completedTest,

}: ExamSummaryParams) {

    const userId =
        useAuthStore(
            state => state.uid,
        );

    const testQuestions =
        useTestStore(
            state => state.testQuestions,
        );

    const summary =
        useMemo(() => {

            /*
             * EXAMEN ABIERTO DESDE EL HISTORIAL
             *
             * Los resultados ya están calculados
             * y guardados en Firestore.
             */

            if (
                completedTest
            ) {

                return {

                    ...completedTest,

                    date:
                        new Date(
                            completedTest.date,
                        ),

                };

            }

            /*
             * EXAMEN RECIÉN FINALIZADO
             *
             * Se mantiene exactamente la lógica
             * que ya existía.
             */

            if (!userId) {

                throw new Error(
                    'Authenticated user not found.',
                );

            }

            const answers:
                CompletedAnswer[] =

                testQuestions.map(
                    question => ({

                        numQuestion:
                            question.numQuestion,

                        questionId:
                            question.idDocument,

                        blockId:
                            question.blockId,

                        themeId:
                            question.themeId,

                        question:
                            question.question,

                        options:
                            question.options,

                        userResponse:
                            question.userResponse,

                        correctAnswer:
                            question.correctAnswer,

                        explanation:
                            question.explanation,

                        questionTimeSpent:
                            question.questionTimeSpent,

                    }),
                );

            return buildExamSummary({

                userId,

                oppositionId,

                oppositionName,

                examName,

                examType,

                timeConfigured,

                finishedByTime,

                finishedEarly,

                questions:
                    answers,

            });

        }, [

            userId,

            oppositionId,

            oppositionName,

            examName,

            examType,

            timeConfigured,

            finishedByTime,

            finishedEarly,

            completedTest,

            testQuestions,

        ]);

    return {

        summary,

    };

}