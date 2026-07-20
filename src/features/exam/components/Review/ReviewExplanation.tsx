import React from 'react';

import {
    Text,
    View,
} from 'react-native';

import {
    TestQuestion,
} from '../../types';

import {
    styles,
} from '../../styles/exam.styles';

interface ReviewExplanationProps {

    question: TestQuestion;

}

export function ReviewExplanation({
    question,
}: ReviewExplanationProps) {

    return (

        <View style={styles.explanationBox}>

            <Text style={styles.explanationTitleReview}>

                Explicación

            </Text>

            <Text style={styles.explanationBody}>

                {
                    question.explanation ||
                    'No hay una explicación registrada para esta pregunta.'
                }

            </Text>

        </View>

    );

}