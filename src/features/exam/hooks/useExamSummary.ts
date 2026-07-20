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

            if (!userId) {

                throw new Error(
                    'Authenticated user not found.',
                );

            }

            const answers: CompletedAnswer[] =
                testQuestions.map(question => ({

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

                }));
                
            return buildExamSummary({

                userId,

                oppositionId,

                oppositionName,

                examName,

                examType,

                timeConfigured,

                finishedByTime,

                finishedEarly,

                questions: answers,

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

            testQuestions,

        ]);

    return {

        summary,

    };

}