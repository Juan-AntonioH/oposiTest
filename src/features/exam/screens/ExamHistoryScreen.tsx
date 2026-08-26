import React, {
    useCallback,
    useState,
} from 'react';

import {
    ScrollView,
} from 'react-native';

import {
    useNavigation,
} from '@react-navigation/native';

import {
    ExamHistoryNavigationProp,
} from '@/features/exam/types/navigation';

import {
    useAuthStore,
} from '@/store/authStore';

import {
    ScreenLayout,
} from '@/shared/layouts/ScreenLayout';

import {
    ExamHistoryBody,
    ExamHistoryCalendar,
    ExamHistoryHeader,
} from '../components/ExamHistory';

import {
    useExamHistory,
} from '../hooks/useExamHistory';

import {
    useTestStore,
} from '../store/useTestStore';

import {
    CompletedTest,
    TestQuestion,
} from '../types';

import {
    styles,
} from '../styles/exam.styles';
import { BackButton } from '@/shared/components/Button/BackButton';

export function ExamHistoryScreen() {

    const navigation =
        useNavigation<
            ExamHistoryNavigationProp
        >();

    const userId =
        useAuthStore(
            state =>
                state.uid,
        );

    const loadCompletedTestQuestions =
        useTestStore(
            state =>
                state.loadCompletedTestQuestions,
        );

    const [

        datePickerVisible,

        setDatePickerVisible,

    ] = useState(false);

    const {

        tests,

        allTests,

        oppositionOptions,

        selectedOppositionId,

        selectedDates,

        availableDateKeys,

        handleOppositionChange,

        toggleDate,

        clearDates,

        reload,

    } = useExamHistory({

        userId:
            userId ?? '',

    });

    const handleOpenExam =
        useCallback((

            test: CompletedTest,

        ) => {

            const historyQuestions:
                TestQuestion[] =

                test.answers.map(
                    answer => ({

                        idDocument:
                            answer.questionId,

                        oppositionId:
                            test.oppositionId,

                        blockId:
                            answer.blockId,

                        themeId:
                            answer.themeId,

                        question:
                            answer.question,

                        options:
                            answer.options,

                        correctAnswer:
                            answer.correctAnswer,

                        explanation:
                            answer.explanation,

                        /*
                         * Estos campos no se guardan
                         * actualmente dentro de
                         * CompletedAnswer.
                         *
                         * Se completan para reconstruir
                         * correctamente TestQuestion.
                         */

                        esOficial:
                            false,

                        randomId:
                            answer.numQuestion,

                        active:
                            true,

                        numQuestion:
                            answer.numQuestion,

                        userResponse:
                            answer.userResponse,

                        questionTimeSpent:
                            answer.questionTimeSpent,

                    }),
                );

            /*
             * Cargamos el examen histórico en el store
             * antes de abrir el resumen.
             *
             * Así ExamReviewScreen puede utilizar
             * exactamente la misma lógica que utiliza
             * después de finalizar un examen normal.
             */

            loadCompletedTestQuestions(
                historyQuestions,
            );

            navigation.navigate(

                'ExamSummaryScreen',

                {

                    oppositionId:
                        test.oppositionId,

                    oppositionName:
                        test.oppositionName,

                    examName:
                        test.examName,

                    examType:
                        test.examType,

                    timeConfigured:
                        test.timeConfigured,

                    finishedByTime:
                        test.finishedByTime,

                    finishedEarly:
                        test.finishedEarly,

                    completedTest: {

                        ...test,

                        /*
                         * Date no es serializable para
                         * React Navigation.
                         */

                        date:
                            test.date.toISOString(),

                    },

                },

            );

        }, [

            navigation,

            loadCompletedTestQuestions,

        ]);

    return (

        <ScreenLayout
            title={
                'Historial de Exámenes'
            }
        >
            <BackButton />
            
            <ScrollView

                contentContainerStyle={
                    styles.container
                }

                showsVerticalScrollIndicator={
                    false
                }

            >

                <ExamHistoryHeader

                    oppositionOptions={
                        oppositionOptions
                    }

                    selectedOppositionId={
                        selectedOppositionId
                    }

                    selectedDates={
                        selectedDates
                    }

                    filteredResultsCount={
                        tests.length
                    }

                    totalResultsCount={
                        allTests.length
                    }

                    onOppositionChange={
                        handleOppositionChange
                    }

                    onOpenDatePicker={() => {

                        setDatePickerVisible(
                            true,
                        );

                    }}

                />

                <ExamHistoryBody

                    tests={
                        tests
                    }

                    onOpenExam={
                        handleOpenExam
                    }

                />

            </ScrollView>

            <ExamHistoryCalendar

                visible={
                    datePickerVisible
                }

                tests={
                    allTests
                }

                selectedDates={
                    selectedDates
                }

                availableDateKeys={
                    availableDateKeys
                }

                onToggleDate={
                    toggleDate
                }

                onClearDates={
                    clearDates
                }

                onClose={() => {

                    setDatePickerVisible(
                        false,
                    );

                }}

            />
        </ScreenLayout>

    );

}