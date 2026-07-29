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
    Question,
} from '../../types';

import {
    styles,
} from '../../styles/questionList.styles';

interface QuestionsListBodyProps {

    questions: Question[];

    onQuestionPress: (
        question: Question,
    ) => void;

}

function getNumberFromId(
    id: string,
): string {

    const match =
        id.match(
            /\d+/,
        );

    if (!match) {

        return id;

    }

    return String(
        Number(
            match[0],
        ),
    );

}

export function QuestionsListBody({

    questions,

    onQuestionPress,

}: QuestionsListBodyProps) {

    if (
        questions.length === 0
    ) {

        return (

            <View
                style={
                    styles.emptyQuestionsCard
                }
            >

                <Ionicons
                    name="search-outline"
                    size={40}
                    color="#94A3B8"
                />

                <Text
                    style={
                        styles.emptyQuestionsTitle
                    }
                >
                    No se encontraron preguntas
                </Text>

                <Text
                    style={
                        styles.emptyQuestionsText
                    }
                >
                    Prueba a cambiar o limpiar
                    los filtros.
                </Text>

            </View>

        );

    }

    return (

        <View
            style={
                styles.questionsList
            }
        >

            {

                questions.map(
                    question => (

                        <Pressable

                            key={
                                question.idDocument
                            }

                            style={(
                                {
                                    pressed,
                                },
                            ) => [

                                    styles.questionCardList,

                                    pressed &&

                                    styles.questionCardPressed,

                                ]}

                            onPress={() =>

                                onQuestionPress(
                                    question,
                                )

                            }

                        >

                            <View
                                style={
                                    styles.questionHeaderRow
                                }
                            >

                                <View
                                    style={
                                        styles.questionIconContainer
                                    }
                                >

                                    <Ionicons
                                        name="document-text-outline"
                                        size={20}
                                        color="#2F70F2"
                                    />

                                </View>

                                <Text
                                    style={
                                        styles.questionIdText
                                    }
                                >

                                    Pregunta{' '}

                                    {
                                        Number(
                                            question.idDocument
                                                .replace(
                                                    /^p/i,
                                                    '',
                                                ),
                                        )
                                    }

                                </Text>

                                <Ionicons
                                    name="chevron-forward"
                                    size={20}
                                    color="#94A3B8"
                                />

                            </View>

                            <Text
                                style={
                                    styles.questionTextList
                                }

                                numberOfLines={
                                    3
                                }
                            >

                                {
                                    question.question
                                }

                            </Text>

                            <View
                                style={
                                    styles.metaRow
                                }
                            >

                                <View
                                    style={
                                        styles.metaBadge
                                    }
                                >

                                    <Ionicons
                                        name="layers-outline"
                                        size={14}
                                        color="#475569"
                                    />

                                    <Text
                                        style={
                                            styles.metaText
                                        }
                                    >

                                        Bloque{' '}

                                        {
                                            getNumberFromId(
                                                question.blockId,
                                            )
                                        }

                                    </Text>

                                </View>

                                <View
                                    style={
                                        styles.metaBadge
                                    }
                                >

                                    <Ionicons
                                        name="list-outline"
                                        size={14}
                                        color="#475569"
                                    />

                                    <Text
                                        style={
                                            styles.metaText
                                        }
                                    >

                                        Tema{' '}

                                        {
                                            getNumberFromId(
                                                question.themeId,
                                            )
                                        }

                                    </Text>

                                </View>

                            </View>

                        </Pressable>

                    ),

                )

            }

        </View>

    );

}