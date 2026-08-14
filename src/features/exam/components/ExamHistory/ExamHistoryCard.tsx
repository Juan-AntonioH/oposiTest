import React from 'react';

import {
    Pressable,
    Text,
    View,
} from 'react-native';

import {
    Ionicons,
} from '@expo/vector-icons';

import {
    CompletedTest,
} from '../../types';

import {
    historyStyles,
} from '../../styles/examHistory.styles';

interface ExamHistoryCardProps {

    test:
    CompletedTest;

    onPress:
    () => void;

}

export function ExamHistoryCard({

    test,

    onPress,

}: ExamHistoryCardProps) {

    const formattedDate =
        test.date.toLocaleDateString(
            'es-ES',
            {

                day:
                    '2-digit',

                month:
                    '2-digit',

                year:
                    'numeric',

            },
        );

    const formattedNote =
        Number(
            test.note,
        )
            .toFixed(
                2,
            )
            .replace(
                '.',
                ',',
            );

    return (

        <Pressable

            style={
                historyStyles.card
            }

            onPress={
                onPress
            }

        >

            {/* BARRA LATERAL */}

            <View
                style={
                    historyStyles.cardAccent
                }
            />

            {/* CONTENIDO */}

            <View
                style={
                    historyStyles.cardContent
                }
            >

                {/* CABECERA */}

                <View
                    style={
                        historyStyles.cardHeader
                    }
                >

                    <View
                        style={
                            historyStyles.titleContainer
                        }
                    >

                        <View
                            style={
                                historyStyles.titleRow
                            }
                        >

                            <Ionicons
                                name="document-text-outline"
                                size={20}
                                color="#2F70F2"
                            />

                            <Text
                                style={
                                    historyStyles.examName
                                }
                                numberOfLines={
                                    1
                                }
                            >
                                {
                                    test.examName
                                }
                            </Text>

                        </View>

                        <View
                            style={
                                historyStyles.oppositionRow
                            }
                        >

                            <Ionicons
                                name="business-outline"
                                size={15}
                                color="#64748B"
                            />

                            <Text
                                style={
                                    historyStyles.oppositionName
                                }
                                numberOfLines={
                                    1
                                }
                            >
                                {
                                    test.oppositionName
                                }
                            </Text>

                        </View>

                    </View>

                    <Ionicons
                        name="chevron-forward"
                        size={22}
                        color="#94A3B8"
                    />

                </View>

                {/* SEPARADOR */}

                <View
                    style={
                        historyStyles.headerSeparator
                    }
                />

                {/* INFORMACIÓN Y RESULTADOS */}

                <View
                    style={
                        historyStyles.cardDetails
                    }
                >

                    {/* FECHA / ACIERTOS */}

                    <View
                        style={[
                            historyStyles.detailColumn,
                            historyStyles.lastDetailColumn,
                        ]}
                    >

                        <View
                            style={
                                historyStyles.detailTopRow
                            }
                        >

                            <Ionicons
                                name="calendar-outline"
                                size={15}
                                color="#64748B"
                            />

                            <Text
                                style={
                                    historyStyles.detailTopText
                                }
                                numberOfLines={
                                    1
                                }
                            >
                                {
                                    formattedDate
                                }
                            </Text>

                        </View>

                        <View
                            style={
                                historyStyles.detailResultRow
                            }
                        >

                            <Ionicons
                                name="checkmark-circle"
                                size={17}
                                color="#22C55E"
                            />

                            <Text
                                style={
                                    historyStyles.successText
                                }
                            >
                                {
                                    test.successes
                                }
                            </Text>

                            <Text
                                style={
                                    historyStyles.resultLabel
                                }
                            >
                                aciertos
                            </Text>

                        </View>

                    </View>

                    {/* TIEMPO / ERRORES */}

                    <View
                        style={
                            historyStyles.detailColumn
                        }
                    >

                        <View
                            style={
                                historyStyles.detailTopRow
                            }
                        >

                            <Ionicons
                                name="time-outline"
                                size={15}
                                color="#64748B"
                            />

                            <Text
                                style={
                                    historyStyles.detailTopText
                                }
                            >
                                {
                                    test.timeSpent
                                }

                                {' min'}
                            </Text>

                        </View>

                        <View
                            style={
                                historyStyles.detailResultRow
                            }
                        >

                            <Ionicons
                                name="close-circle"
                                size={17}
                                color="#EF4444"
                            />

                            <Text
                                style={
                                    historyStyles.errorText
                                }
                            >
                                {
                                    test.errors
                                }
                            </Text>

                            <Text
                                style={
                                    historyStyles.resultLabel
                                }
                            >
                                errores
                            </Text>

                        </View>

                    </View>

                    {/* PREGUNTAS / SIN RESPONDER */}

                    <View
                        style={
                            historyStyles.detailColumn
                        }
                    >

                        <View
                            style={
                                historyStyles.detailTopRow
                            }
                        >

                            <Ionicons
                                name="document-text-outline"
                                size={15}
                                color="#64748B"
                            />

                            <Text
                                style={
                                    historyStyles.detailTopText
                                }
                            >
                                {
                                    test.numberOfConfiguredQuestions
                                }
                            </Text>

                        </View>

                        <View
                            style={
                                historyStyles.detailResultRow
                            }
                        >

                            <Ionicons
                                name="remove-circle"
                                size={17}
                                color="#94A3B8"
                            />

                            <Text
                                style={
                                    historyStyles.unansweredText
                                }
                            >
                                {
                                    test.unanswered
                                }
                            </Text>

                            <Text
                                style={
                                    historyStyles.resultLabel
                                }
                                numberOfLines={
                                    1
                                }
                            >
                                en blanco
                            </Text>

                        </View>

                    </View>

                </View>

                {/* NOTA */}

                <View
                    style={
                        historyStyles.noteContainer
                    }
                >

                    <Text
                        style={
                            historyStyles.noteLabel
                        }
                    >
                        Nota:
                    </Text>

                    <Text
                        style={
                            historyStyles.noteValue
                        }
                    >
                        {
                            formattedNote
                        }
                    </Text>

                </View>

            </View>

        </Pressable>

    );

}