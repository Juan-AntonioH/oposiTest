import {
    BuildQuestionParams,
    Question,
} from '../types';

export function buildQuestion(
    params: BuildQuestionParams,
): Question {

    const {

        question,

        blockId,

        themeId,

        questionText,

        options,

        correctAnswer,

        explanation,

    } = params;

    return {

        idDocument:
            question?.idDocument ?? '',

        oppositionId:
            question?.oppositionId ?? '',

        blockId,

        themeId,

        question:
            questionText,

        options,

        correctAnswer,

        explanation,

        active:
            question?.active ?? true,

        esOficial:
            question?.esOficial ?? false,

        examYear:
            question?.examYear ?? null,

        examConvocatoria:
            question?.examConvocatoria ?? null,

        randomId:
            question?.randomId ?? Math.random(),

    };

}