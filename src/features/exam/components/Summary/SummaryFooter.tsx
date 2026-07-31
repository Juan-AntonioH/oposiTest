import React from 'react';

import {
    Pressable,
    Text,
    View,
} from 'react-native';

import {
    styles,
} from '../../styles/exam.styles';

import {
    CompletedTest,
} from '../../types';

interface SummaryFooterProps {

    summary:
    CompletedTest;

    onFinish:
    () => void;

    isHistoryExam?:
    boolean;

}

export function SummaryFooter({

    onFinish,

    isHistoryExam =
    false,

}: SummaryFooterProps) {

    return (

        <View
            style={
                styles.footerContainer
            }
        >

            <View
                style={
                    styles.legendContainer
                }
            >

                <View
                    style={
                        styles.legendItem
                    }
                >

                    <View
                        style={[

                            styles.legendDot,

                            {

                                backgroundColor:
                                    '#22C55E',

                            },

                        ]}
                    />

                    <Text
                        style={
                            styles.legendText
                        }
                    >
                        Correcta
                    </Text>

                </View>

                <View
                    style={
                        styles.legendItem
                    }
                >

                    <View
                        style={[

                            styles.legendDot,

                            {

                                backgroundColor:
                                    '#EF4444',

                            },

                        ]}
                    />

                    <Text
                        style={
                            styles.legendText
                        }
                    >
                        Incorrecta
                    </Text>

                </View>

                <View
                    style={
                        styles.legendItem
                    }
                >

                    <View
                        style={[

                            styles.legendDot,

                            {

                                backgroundColor:
                                    '#E9EBEE',

                                borderWidth:
                                    1,

                                borderColor:
                                    '#CBD5E1',

                            },

                        ]}
                    />

                    <Text
                        style={
                            styles.legendText
                        }
                    >
                        Sin responder
                    </Text>

                </View>

            </View>

            <Pressable

                style={
                    styles.summaryButton
                }

                onPress={
                    onFinish
                }

            >

                <Text
                    style={
                        styles.summaryButtonText
                    }
                >

                    {

                        isHistoryExam

                            ? 'Volver al historial'

                            : 'Volver al inicio'

                    }

                </Text>

            </Pressable>

        </View>

    );

}