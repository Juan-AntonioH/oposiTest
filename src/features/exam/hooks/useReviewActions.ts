import {
    useCallback,
} from 'react';

import {
    useNavigation,
} from '@react-navigation/native';

export function useReviewActions() {

    const navigation =
        useNavigation<any>();

    const backToSummary =
        useCallback(() => {

            navigation.goBack();

        }, [
            navigation,
        ]);

    const editQuestion =
        useCallback((
            questionId: string,
        ) => {

            console.log(
                'TODO: Editar pregunta:',
                questionId,
            );

            // TODO:
            // Recuperar la pregunta completa desde Firestore
            // mediante questionId y navegar a QuestionForm.

        }, []);

    return {

        backToSummary,

        editQuestion,

    };

}