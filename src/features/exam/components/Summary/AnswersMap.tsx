import React from 'react';

import {
    Pressable,
    Text,
    View,
} from 'react-native';

import {
    CompletedTest,
} from '../../types';

import {
    useAnswersMap,
} from '../../hooks/useAnswersMap';

import {
    styles,
} from '../../styles/exam.styles';

import {
    summaryStyles,
} from '../../styles/';

import {
    getAnswerCircleStyle,
    getAnswerNumberStyle,
} from '../../styles/answerMap.styles';

interface AnswersMapProps {

    summary: CompletedTest;

    onPressQuestion: (
        index: number,
    ) => void;

}

export function AnswersMap({
    summary,
    onPressQuestion,
}: AnswersMapProps) {

    const {
        buttonSize,
        getAnswerState,
    } = useAnswersMap();

    return (

        <>

            <Text style={summaryStyles.answersMapTitle}>
                Mapa de respuestas
            </Text>

            <View style={summaryStyles.answersMap}>

                {summary.answers.map((
                    answer,
                    index,
                ) => {

                    const state =
                        getAnswerState(answer);

                    return (

                        <Pressable
                            key={answer.questionId}
                            android_ripple={{
                                color: '#E2E8F0',
                                borderless: true,
                            }}
                            style={[
                                summaryStyles.answerCircle,
                                getAnswerCircleStyle(state),
                                {
                                    width: buttonSize,
                                    height: buttonSize,
                                    borderRadius: buttonSize / 2,
                                },
                            ]}
                            onPress={() =>
                                onPressQuestion(index)
                            }
                        >

                            <Text
                                style={[
                                    summaryStyles.answerNumber,
                                    getAnswerNumberStyle(state),
                                ]}
                            >
                                {index + 1}
                            </Text>

                        </Pressable>

                    );

                })}

            </View>

        </>

    );

}