import { AnswerState } from '../types/answerState';

import { summaryStyles } from './examSummary.styles';

export function getAnswerCircleStyle(
    state: AnswerState,
) {

    switch (state) {

        case 'correct':
            return summaryStyles.answerCircleCorrect;

        case 'incorrect':
            return summaryStyles.answerCircleIncorrect;

        default:
            return summaryStyles.answerCircleUnanswered;

    }

}

export function getAnswerNumberStyle(
    state: AnswerState,
) {

    switch (state) {

        case 'correct':
        case 'incorrect':
            return summaryStyles.answerNumberWhite;

        default:
            return summaryStyles.answerNumberDark;

    }

}