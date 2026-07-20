import {
    useCallback,
} from 'react';

import {
    useWindowDimensions,
} from 'react-native';

import {
    CompletedAnswer,
} from '../types';

import {
    AnswerState,
} from '../types/answerState';

const COLUMN_COUNT = 10;
const HORIZONTAL_PADDING = 64;
const GAP = 8;

export function useAnswersMap() {

    const { width } =
        useWindowDimensions();

    const buttonSize =
        (
            width -
            HORIZONTAL_PADDING -
            (COLUMN_COUNT - 1) * GAP
        ) / COLUMN_COUNT;

    const getAnswerState =
        useCallback((
            answer: CompletedAnswer,
        ): AnswerState => {

            if (
                answer.userResponse === null
            ) {
                return 'unanswered';
            }

            if (
                answer.userResponse ===
                answer.correctAnswer
            ) {
                return 'correct';
            }

            return 'incorrect';

        }, []);

    return {

        buttonSize,

        getAnswerState,

    };

}