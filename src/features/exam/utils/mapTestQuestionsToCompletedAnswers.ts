import {
    CompletedAnswer,
    TestQuestion,
} from '../types';

export function mapTestQuestionsToCompletedAnswers(
    questions: TestQuestion[],
): CompletedAnswer[] {

    return questions.map(
        (
            question,
            index,
        ) => ({

            numQuestion:
                index + 1,

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

        }),
    );

}