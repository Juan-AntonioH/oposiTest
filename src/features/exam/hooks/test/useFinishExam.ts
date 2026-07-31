import { useCallback } from 'react';

import { TestQuestion } from '../../types';

interface FinishExamOptions {
    finishedByTime?: boolean;
}

export interface FinishExamResult {
    questions: TestQuestion[];
    finishedByTime: boolean;
}

interface UseFinishExamProps {
    finishExamEarly: (
        questionTimeSpent: number,
    ) => TestQuestion[];

    stopTimer: () => void;
}

export function useFinishExam({
    finishExamEarly,
    stopTimer,
}: UseFinishExamProps) {

    const finish = useCallback((
        questionTimeSpent: number,
        options: FinishExamOptions = {},
    ): FinishExamResult => {

        stopTimer();

        const questions = finishExamEarly(
            questionTimeSpent,
        );

        return {
            questions,
            finishedByTime:
                options.finishedByTime ?? false,
        };

    }, [
        finishExamEarly,
        stopTimer,
    ]);

    return {
        finish,
    };

}