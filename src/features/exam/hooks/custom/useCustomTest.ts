import {
    useCallback,
    useState,
} from 'react';

export function useCustomTest() {

    const [
        questionCount,
        setQuestionCount,
    ] = useState(20);

    const [
        timeLimit,
        setTimeLimit,
    ] = useState(20);

    const [
        immediateSolution,
        setImmediateSolution,
    ] = useState(false);

    const [
        autoTime,
        setAutoTime,
    ] = useState(true);

    const MAX_QUESTION_COUNT = 250;
    const maxTimeLimit = questionCount + 30;

    const handleQuestionCountChange =
        useCallback((value: number) => {

            const validated =
                Math.min(
                    MAX_QUESTION_COUNT,
                    Math.max(1, value),
                );

            setQuestionCount(validated);

            if (autoTime) {

                setTimeLimit(validated);

            } else {

                setTimeLimit(currentTime =>
                    Math.min(
                        currentTime,
                        validated + 30,
                    ),
                );

            }

        }, [
            autoTime,
        ]);

    const handleTimeLimitChange =
        useCallback((value: number) => {

            const validated =
                Math.min(
                    maxTimeLimit,
                    Math.max(1, value),
                );

            setAutoTime(false);

            setTimeLimit(validated);

        }, [maxTimeLimit,]);

    return {

        questionCount,

        timeLimit,

        immediateSolution,

        autoTime,

        setImmediateSolution,

        handleQuestionCountChange,

        handleTimeLimitChange,

    };

}