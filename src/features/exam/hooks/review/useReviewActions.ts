import {
    useCallback,
} from 'react';

import {
    useNavigation,
} from '@react-navigation/native';
import { Question } from '../../types';

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
            question: Question,
        ) => {

            navigation.navigate(
                'QuestionFormScreen',
                {
                    question,
                },
            );

        }, [
            navigation,
        ]);

    return {

        backToSummary,

        editQuestion,

    };

}