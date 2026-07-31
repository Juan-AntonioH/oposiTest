import React from 'react';

import {
    Text,
    View,
} from 'react-native';

import {
    CompletedTest,
} from '../../types';

import {
    ExamHistoryCard,
} from './ExamHistoryCard';

import {
    styles,
} from '../../styles/examHistory.styles';

interface ExamHistoryBodyProps {

    tests:
    CompletedTest[];

    onOpenExam: (
        test: CompletedTest,
    ) => void;

}

export function ExamHistoryBody({

    tests,

    onOpenExam,

}: ExamHistoryBodyProps) {

    if (
        tests.length === 0
    ) {

        return (

            <View
                style={
                    styles.emptyContainer
                }
            >

                <Text
                    style={
                        styles.emptyTitle
                    }
                >

                    No hay exámenes

                </Text>

                <Text
                    style={
                        styles.emptyText
                    }
                >

                    No se han encontrado
                    exámenes con los filtros
                    seleccionados.

                </Text>

            </View>

        );

    }

    return (

        <View
            style={
                styles.bodyContainer
            }
        >

            {

                tests.map(
                    test => (

                        <ExamHistoryCard

                            key={
                                test.idDocument
                            }

                            test={
                                test
                            }

                            onPress={() => {

                                onOpenExam(
                                    test,
                                );

                            }}

                        />

                    ),
                )

            }

        </View>

    );

}