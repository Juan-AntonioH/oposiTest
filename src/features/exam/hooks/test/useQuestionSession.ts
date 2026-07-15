import {
    useCallback,
    useRef,
    useState,
} from 'react';

import { useTestStore } from '../../store/useTestStore';

interface UseQuestionSessionParams {
    immediateSolution: boolean;

    onFinishExam: (
        questionTimeSpent: number,
    ) => void;
}

export function useQuestionSession({
    immediateSolution,
    onFinishExam,
}: UseQuestionSessionParams) {

    const {
        answerQuestion,
        nextQuestion,
        hasNextQuestion,
    } = useTestStore();

    const [selectedOption, setSelectedOption] =
        useState<number | null>(null);

    const [isShowingSolution, setIsShowingSolution] =
        useState(false);

    const questionTime = useRef(0);

    const selectOption = useCallback((
        optionIndex: number,
    ) => {

        if (isShowingSolution) {
            return;
        }

        setSelectedOption(optionIndex);

    }, [
        isShowingSolution,
    ]);

    const incrementQuestionTime = useCallback(() => {

        questionTime.current += 1;

    }, []);

    const resetQuestionSession = useCallback(() => {

        setSelectedOption(null);

        setIsShowingSolution(false);

        questionTime.current = 0;

    }, []);

    const advanceOrFinish = useCallback(() => {

        if (hasNextQuestion()) {

            nextQuestion();

            resetQuestionSession();

            return;

        }

        onFinishExam(
            questionTime.current,
        );

    }, [
        hasNextQuestion,
        nextQuestion,
        resetQuestionSession,
        onFinishExam,
    ]);

    const confirmAnswer = useCallback(() => {

        answerQuestion(
            selectedOption,
            questionTime.current,
        );

        if (immediateSolution) {

            setIsShowingSolution(true);

            return;
        }

        advanceOrFinish();

    }, [
        selectedOption,
        immediateSolution,
        answerQuestion,
        advanceOrFinish,
    ]);

    const leaveBlank = useCallback(() => {

        answerQuestion(
            null,
            questionTime.current,
        );

        if (immediateSolution) {

            setIsShowingSolution(true);

            return;
        }

        advanceOrFinish();

    }, [
        immediateSolution,
        answerQuestion,
        advanceOrFinish,
    ]);

    const continueQuestion = useCallback(() => {

        advanceOrFinish();

    }, [
        advanceOrFinish,
    ]);

    const getQuestionTime = useCallback(() => {

        return questionTime.current;

    }, []);

    return {

        selectedOption,

        isShowingSolution,

        selectOption,

        confirmAnswer,

        leaveBlank,

        continueQuestion,

        incrementQuestionTime,

        resetQuestionSession,

        getQuestionTime,

    };

}