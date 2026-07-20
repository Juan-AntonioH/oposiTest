import { AnswerState } from '../types/answerState';

import { styles } from './exam.styles';

export function getAnswerCircleStyle(
    state: AnswerState,
) {

    switch (state) {

        case 'correct':
            return styles.answerCircleCorrect;

        case 'incorrect':
            return styles.answerCircleIncorrect;

        default:
            return styles.answerCircleUnanswered;

    }

}

export function getAnswerNumberStyle(
    state: AnswerState,
) {

    switch (state) {

        case 'correct':
        case 'incorrect':
            return styles.answerNumberWhite;

        default:
            return styles.answerNumberDark;

    }

}