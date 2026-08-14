import React from 'react';

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

        </ScreenLayout>

    );

}