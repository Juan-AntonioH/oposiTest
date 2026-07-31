import {
    Question,
} from '../types';

import {

    createQuestionInFirestore,

    updateQuestionInFirestore,

    deleteQuestionFromFirestore,

    getQuestionFromFirestore,

    getQuestionsFromFirestore,

    generateNextQuestionIdFromFirestore,

} from './firestoreQuestionService';

export async function createQuestion(
    question: Question,
): Promise<void> {

    return createQuestionInFirestore(
        question,
    );

}

export async function updateQuestion(
    question: Question,
): Promise<void> {

    return updateQuestionInFirestore(
        question,
    );

}

export async function deleteQuestion(
    questionId: string,
): Promise<void> {

    return deleteQuestionFromFirestore(
        questionId,
    );

}

export async function getQuestion(
    questionId: string,
): Promise<Question | null> {

    return getQuestionFromFirestore(
        questionId,
    );

}

export async function getQuestions(
    oppositionId: string,
): Promise<Question[]> {

    return getQuestionsFromFirestore(
        oppositionId,
    );

}

export async function getNextQuestionId(): Promise<string> {

    return generateNextQuestionIdFromFirestore();

}