import React, {
    useState,
} from 'react';

import {
    ActivityIndicator,
    Image,
    Text,
    View,
} from 'react-native';

import {
    ScrollView,
} from 'react-native';

import {
    RouteProp,
} from '@react-navigation/native';

import {
    RootStackParamList,
} from '@/navigation/types';

import {
    ScreenLayout,
} from '@/shared/layouts/ScreenLayout';

import {
    useExamSummary,
} from '../hooks/summary/useExamSummary';

import {
    useSummaryActions,
} from '../hooks/summary/useSummaryActions';

import {
    SummaryHeader,
    SummaryMetrics,
    AnswersMap,
    SummaryFooter,
} from '../components';
import { summaryStyles } from '../styles/examSummary.styles';

interface ExamSummaryScreenProps {

    route: RouteProp<
        RootStackParamList,
        'ExamSummaryScreen'
    >;

}

export function ExamSummaryScreen({
    route,
}: ExamSummaryScreenProps) {

    const {

        oppositionId,

        oppositionName,

        examName,

        examType,

        timeConfigured,

        finishedByTime,

        finishedEarly,

        completedTest,

    } = route.params;

    const {
        summary,
    } = useExamSummary({

        oppositionId,

        oppositionName,

        examName,

        examType,

        timeConfigured,

        finishedByTime,

        finishedEarly,

        completedTest,

    });

    const isHistoryExam =

        completedTest !==
        undefined;

    const {

        openQuestion,

        finish,

        savingExam,

    } = useSummaryActions({

        summary,

        isHistoryExam,

    });

    return (

        <ScreenLayout
            title="Resultados"
            showSidebar={false}
        >

            <ScrollView

                style={
                    summaryStyles.summaryContainer
                }

                contentContainerStyle={
                    summaryStyles.summaryContent
                }

                showsVerticalScrollIndicator={
                    false
                }

            >

                <SummaryHeader
                    summary={
                        summary
                    }
                />

                <SummaryMetrics
                    summary={
                        summary
                    }
                />

                <AnswersMap

                    summary={
                        summary
                    }

                    onPressQuestion={
                        openQuestion
                    }

                />

                <SummaryFooter

                    summary={
                        summary
                    }

                    onFinish={
                        finish
                    }

                    isHistoryExam={
                        isHistoryExam
                    }

                />

            </ScrollView>

            {savingExam && (

                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.35)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 9999,
                    }}
                >

                    {/* <ActivityIndicator
                        size="large"
                        color="#2F70F2"
                    /> */}
                    <Image
                        source={require("@assets/images/tiburoncin.gif")}
                        style={{
                            width: 100,
                            height: 100,
                        }}
                    />
                    <Text
                        style={{
                            marginTop: 16,
                            fontSize: 16,
                            fontWeight: '600',
                            color: '#FFFFFF',
                        }}
                    >
                        Guardando examen...
                    </Text>

                </View>

            )}

        </ScreenLayout>

    );

}