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
    styles,
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
                styles.card
            }

            onPress={
                onPress
            }

        >

            {/* BARRA LATERAL */}

            <View
                style={
                    styles.cardAccent
                }
            />

            {/* CONTENIDO */}

            <View
                style={
                    styles.cardContent
                }
            >

                {/* CABECERA */}

                <View
                    style={
                        styles.cardHeader
                    }
                >

                    <View
                        style={
                            styles.titleContainer
                        }
                    >

                        <View
                            style={
                                styles.titleRow
                            }
                        >

                            <Ionicons
                                name="document-text-outline"
                                size={20}
                                color="#2F70F2"
                            />

                            <Text
                                style={
                                    styles.examName
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
                                styles.oppositionRow
                            }
                        >

                            <Ionicons
                                name="business-outline"
                                size={15}
                                color="#64748B"
                            />

                            <Text
                                style={
                                    styles.oppositionName
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
                        styles.headerSeparator
                    }
                />

                {/* INFORMACIÓN Y RESULTADOS */}

                <View
                    style={
                        styles.cardDetails
                    }
                >

                    {/* FECHA / ACIERTOS */}

                    <View
                        style={[
                            styles.detailColumn,
                            styles.lastDetailColumn,
                        ]}
                    >

                        <View
                            style={
                                styles.detailTopRow
                            }
                        >

                            <Ionicons
                                name="calendar-outline"
                                size={15}
                                color="#64748B"
                            />

                            <Text
                                style={
                                    styles.detailTopText
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
                                styles.detailResultRow
                            }
                        >

                            <Ionicons
                                name="checkmark-circle"
                                size={17}
                                color="#22C55E"
                            />

                            <Text
                                style={
                                    styles.successText
                                }
                            >
                                {
                                    test.successes
                                }
                            </Text>

                            <Text
                                style={
                                    styles.resultLabel
                                }
                            >
                                aciertos
                            </Text>

                        </View>

                    </View>

                    {/* TIEMPO / ERRORES */}

                    <View
                        style={
                            styles.detailColumn
                        }
                    >

                        <View
                            style={
                                styles.detailTopRow
                            }
                        >

                            <Ionicons
                                name="time-outline"
                                size={15}
                                color="#64748B"
                            />

                            <Text
                                style={
                                    styles.detailTopText
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
                                styles.detailResultRow
                            }
                        >

                            <Ionicons
                                name="close-circle"
                                size={17}
                                color="#EF4444"
                            />

                            <Text
                                style={
                                    styles.errorText
                                }
                            >
                                {
                                    test.errors
                                }
                            </Text>

                            <Text
                                style={
                                    styles.resultLabel
                                }
                            >
                                errores
                            </Text>

                        </View>

                    </View>

                    {/* PREGUNTAS / SIN RESPONDER */}

                    <View
                        style={
                            styles.detailColumn
                        }
                    >

                        <View
                            style={
                                styles.detailTopRow
                            }
                        >

                            <Ionicons
                                name="document-text-outline"
                                size={15}
                                color="#64748B"
                            />

                            <Text
                                style={
                                    styles.detailTopText
                                }
                            >
                                {
                                    test.numberOfConfiguredQuestions
                                }
                            </Text>

                        </View>

                        <View
                            style={
                                styles.detailResultRow
                            }
                        >

                            <Ionicons
                                name="remove-circle"
                                size={17}
                                color="#94A3B8"
                            />

                            <Text
                                style={
                                    styles.unansweredText
                                }
                            >
                                {
                                    test.unanswered
                                }
                            </Text>

                            <Text
                                style={
                                    styles.resultLabel
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
                        styles.noteContainer
                    }
                >

                    <Text
                        style={
                            styles.noteLabel
                        }
                    >
                        Nota:
                    </Text>

                    <Text
                        style={
                            styles.noteValue
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