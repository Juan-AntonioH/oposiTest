import React from 'react';

import {
    useNavigation,
    useRoute,
    RouteProp,
} from '@react-navigation/native';

import {
    NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {
    ScreenLayout,
} from '@/shared/layouts/ScreenLayout';

import {
    RootStackParamList,
} from '@/navigation/types';

import {
    QuestionForm,
} from '../components/QuestionForm';

import {
    useQuestionForm,
} from '../hooks/useQuestionForm';

type QuestionFormRouteProp =
    RouteProp<
        RootStackParamList,
        'QuestionFormScreen'
    >;

type QuestionFormNavigationProp =
    NativeStackNavigationProp<
        RootStackParamList,
        'QuestionFormScreen'
    >;

export function QuestionFormScreen() {

    const navigation =
        useNavigation<QuestionFormNavigationProp>();

    const route =
        useRoute<QuestionFormRouteProp>();

    const {
        question,
        idDocument,
    } = route.params;

    const {
        actions,
    } = useQuestionForm(
        navigation,
        question,
    );

    return (

        <ScreenLayout
            title={
                actions.isEditing
                    ? 'Editar pregunta'
                    : 'Nueva pregunta'
            }
            showSidebar={false}
        >

            <QuestionForm
                question={question}
                oppositionId={
                    question?.oppositionId ??
                    idDocument
                }
                actions={actions}
            />

        </ScreenLayout>

    );

}