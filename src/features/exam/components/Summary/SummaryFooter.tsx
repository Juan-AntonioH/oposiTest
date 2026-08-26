import React from 'react';

import {
    Pressable,
    Text,
    View,
} from 'react-native';

import { summaryStyles } from '../../styles/examSummary.styles';
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
                summaryStyles.footerContainer
            }
        >

            <View
                style={
                    summaryStyles.legendContainer
                }
            >

                <View
                    style={
                        summaryStyles.legendItem
                    }
                >

                    <View
                        style={[

                            summaryStyles.legendDot,

                            {

                                backgroundColor:
                                    '#22C55E',

                            },

                        ]}
                    />

                    <Text
                        style={
                            summaryStyles.legendText
                        }
                    >
                        Correcta
                    </Text>

                </View>

                <View
                    style={
                        summaryStyles.legendItem
                    }
                >

                    <View
                        style={[

                            summaryStyles.legendDot,

                            {

                                backgroundColor:
                                    '#EF4444',

                            },

                        ]}
                    />

                    <Text
                        style={
                            summaryStyles.legendText
                        }
                    >
                        Incorrecta
                    </Text>

                </View>

                <View
                    style={
                        summaryStyles.legendItem
                    }
                >

                    <View
                        style={[

                            summaryStyles.legendDot,

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
                            summaryStyles.legendText
                        }
                    >
                        Sin responder
                    </Text>

                </View>

            </View>

            <Pressable

                style={
                    summaryStyles.summaryButton
                }

                onPress={
                    onFinish
                }

            >

                <Text
                    style={
                        summaryStyles.summaryButtonText
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