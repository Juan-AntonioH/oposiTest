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

    const handleQuestionCountChange =
        useCallback((value: number) => {

            const validated =
                Math.max(1, value);

            setQuestionCount(validated);

            if (autoTime) {

                setTimeLimit(validated);

            }

        }, [
            autoTime,
        ]);

    const handleTimeLimitChange =
        useCallback((value: number) => {

            const validated =
                Math.max(1, value);

            setAutoTime(false);

            setTimeLimit(validated);

        }, []);

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