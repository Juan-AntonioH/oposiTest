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

interface ReviewQuestionProps {

    currentIndex: number;

    totalQuestions: number;

    question: TestQuestion;

}

export function ReviewQuestion({

    currentIndex,

    totalQuestions,

    question,

}: ReviewQuestionProps) {

    return (

        <View style={styles.questionMainCard}>

            {/* Encabezado */}

            <View style={styles.progressRow}>

                <Text style={styles.progressText}>

                    Pregunta {currentIndex + 1} de {totalQuestions}

                </Text>

            </View>

            {/* Enunciado */}

            <Text style={styles.questionStatement}>

                {question.question}

            </Text>

        </View>

    );

}