import React from 'react';

import {
    Text,
    View,
} from 'react-native';

import {
    MaterialCommunityIcons,
} from '@expo/vector-icons';

import {
    CompletedTest,
} from '../../types';

import {
    formatExamTime,
} from '../../utils/formatExamTime';
import { summaryStyles } from '../../styles/examSummary.styles';

interface SummaryMetricsProps {

    summary: CompletedTest;

}

export function SummaryMetrics({
    summary,
}: SummaryMetricsProps) {

    const totalQuestions =
        summary.numberOfConfiguredQuestions;

    const successPercentage =
        totalQuestions === 0
            ? 0
            : (summary.successes / totalQuestions) * 100;

    const errorPercentage =
        totalQuestions === 0
            ? 0
            : (summary.errors / totalQuestions) * 100;

    const unansweredPercentage =
        totalQuestions === 0
            ? 0
            : (summary.unanswered / totalQuestions) * 100;

    return (

        <>

            <View style={summaryStyles.scoreCard}>

                <View style={summaryStyles.badgeContainer}>

                    <MaterialCommunityIcons
                        name="medal"
                        size={36}
                        color="#2F70F2"
                    />

                </View>

                <Text style={summaryStyles.scoreNumber}>
                    {summary.note.toFixed(2)}
                </Text>

                <Text style={summaryStyles.scoreLabel}>
                    Nota final
                </Text>

            </View>

            <View style={summaryStyles.gridContainer}>

                {/* Tiempo */}

                <View style={summaryStyles.metricBox}>

                    <MaterialCommunityIcons
                        name="clock-outline"
                        size={20}
                        color="#64748B"
                    />

                    <Text style={summaryStyles.metricValue}>
                        {formatExamTime(summary.timeSpent)}
                    </Text>

                    <Text style={summaryStyles.metricLabel}>
                        Tiempo
                    </Text>

                </View>

                {/* Aciertos */}

                <View
                    style={[
                        summaryStyles.metricBox,
                        {
                            backgroundColor:
                                '#E8F5E9',
                        },
                    ]}
                >

                    <MaterialCommunityIcons
                        name="check-circle-outline"
                        size={20}
                        color="#2E7D32"
                    />

                    <Text
                        style={[
                            summaryStyles.metricValue,
                            {
                                color:
                                    '#2E7D32',
                            },
                        ]}
                    >
                        {summary.successes}
                    </Text>

                    <Text
                        style={[
                            summaryStyles.metricLabel,
                            {
                                color:
                                    '#2E7D32',
                            },
                        ]}
                    >
                        Aciertos ({successPercentage.toFixed(1)}%)
                    </Text>

                </View>

                {/* Errores */}

                <View
                    style={[
                        summaryStyles.metricBox,
                        {
                            backgroundColor:
                                '#FFEBEE',
                        },
                    ]}
                >

                    <MaterialCommunityIcons
                        name="close-circle-outline"
                        size={20}
                        color="#C62828"
                    />

                    <Text
                        style={[
                            summaryStyles.metricValue,
                            {
                                color:
                                    '#C62828',
                            },
                        ]}
                    >
                        {summary.errors}
                    </Text>

                    <Text
                        style={[
                            summaryStyles.metricLabel,
                            {
                                color:
                                    '#C62828',
                            },
                        ]}
                    >
                        Errores ({errorPercentage.toFixed(1)}%)
                    </Text>

                </View>

                {/* Sin responder */}

                <View style={summaryStyles.metricBox}>

                    <MaterialCommunityIcons
                        name="minus-circle-outline"
                        size={20}
                        color="#64748B"
                    />

                    <Text style={summaryStyles.metricValue}>
                        {summary.unanswered}
                    </Text>

                    <Text style={summaryStyles.metricLabel}>
                        Sin responder ({unansweredPercentage.toFixed(1)}%)
                    </Text>

                </View>

            </View>

        </>

    );

}