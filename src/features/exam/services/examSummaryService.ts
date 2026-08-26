import {
    CompletedAnswer,
    CompletedTest,
    ExamType,
} from '../types';

interface BuildExamSummaryParams {

    userId: string;

    oppositionId: string;

    oppositionName: string;

    examName: string;

    examType: ExamType;

    timeConfigured: number;

    finishedByTime: boolean;

    finishedEarly: boolean;

    questions: CompletedAnswer[];

}

export function buildExamSummary({
    userId,
    oppositionId,
    oppositionName,
    examName,
    examType,
    timeConfigured,
    finishedByTime,
    finishedEarly,
    questions,
}: BuildExamSummaryParams): CompletedTest {

    const successes =
        calculateSuccesses(
            questions,
        );

    const errors =
        calculateErrors(
            questions,
        );

    const unanswered =
        calculateUnanswered(
            questions,
        );

    const note =
        calculateScore(
            successes,
            errors,
            questions.length,
        );

    const blocksIds =
        extractBlocksIds(
            questions,
        );

    const themesIds =
        extractThemesIds(
            questions,
        );

    const timeSpent =
        calculateTimeSpent(
            questions,
        );

    return {

        userId,

        oppositionId,

        oppositionName,

        examName,

        examType,

        numberOfConfiguredQuestions:
            questions.length,

        timeConfigured,

        date: new Date(),

        finishedByTime,

        finishedEarly,

        blocksIds,

        themesIds,

        successes,

        errors,

        unanswered,

        note,

        timeSpent,

        answers: questions,

    };

}

/* -------------------------------------------------------------------------- */
/*                              PRIVATE FUNCTIONS                             */
/* -------------------------------------------------------------------------- */

function calculateSuccesses(
    questions: CompletedAnswer[],
): number {

    return questions.filter(

        question =>

            question.userResponse !== null &&
            question.userResponse ===
            question.correctAnswer,

    ).length;

}

function calculateErrors(
    questions: CompletedAnswer[],
): number {

    return questions.filter(

        question =>

            question.userResponse !== null &&
            question.userResponse !==
            question.correctAnswer,

    ).length;

}

function calculateUnanswered(
    questions: CompletedAnswer[],
): number {

    return questions.filter(

        question =>
            question.userResponse === null,

    ).length;

}

function extractBlocksIds(
    questions: CompletedAnswer[],
): string[] {

    return [

        ...new Set(

            questions
                .map(
                    question =>
                        question.blockId,
                )
                .filter(Boolean),

        ),

    ];

}

function extractThemesIds(
    questions: CompletedAnswer[],
): string[] {

    return [

        ...new Set(

            questions
                .map(
                    question =>
                        question.themeId,
                )
                .filter(Boolean),

        ),

    ];

}

function calculateTimeSpent(
    questions: CompletedAnswer[],
): number {

    const totalSeconds =
        questions.reduce(

            (
                total,
                question,
            ) =>

                total +
                (question.questionTimeSpent ?? 0),

            0,

        );

    return Math.round(
        totalSeconds / 60,
    );

}

function calculateScore(
    successes: number,
    errors: number,
    totalQuestions: number,
): number {

    const penalty =
        1 / 3;

    const rawScore =
        successes -
        (errors * penalty);

    const normalizedScore =
        (rawScore / totalQuestions) *
        10;

    return Math.max(

        0,

        Number(
            normalizedScore.toFixed(2),
        ),

    );

}
/*
     * TODO:
     * Actualmente se aplica una penalización fija de 1/3 por respuesta
     * incorrecta.
     *
     * En el futuro este valor deberá obtenerse desde la configuración
     * de cada oposición, por ejemplo:
     *
     * penalty = 0      → Sin penalización.
     * penalty = 0.25   → Descuenta 1/4 por error.
     * penalty = 0.33   → Descuenta 1/3 por error.
     * penalty = 0.50   → Descuenta 1/2 por error.
     *
     * La firma de esta función podría quedar así:
     *
     * calculateScore(
     *     successes,
     *     errors,
     *     totalQuestions,
     *     penalty,
     * );
     */