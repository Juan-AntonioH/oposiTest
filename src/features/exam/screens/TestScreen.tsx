import React, {
    useCallback,
    useEffect,
} from 'react';

import {
    ActivityIndicator,
    Alert,
    ScrollView,
    View,
} from 'react-native';

import {
    RouteProp,
    useNavigation,
} from '@react-navigation/native';

import { ScreenLayout } from '@/shared/layouts/ScreenLayout';
import { RootStackParamList } from '@/navigation/types';

import { useTest } from '../hooks/test/useTest';
import { useExamTimer } from '../hooks/test/useExamTimer';
import { useQuestionSession } from '../hooks/test/useQuestionSession';
import { useFinishExam } from '../hooks/test/useFinishExam';

import { useTestStore } from '../store/useTestStore';

import { TestHeader, TestProgressCard, QuestionCard, ExplanationCard, TestActions } from '../components/';
import { testStyles } from '../styles/';

interface TestScreenProps {
    route: RouteProp<
        RootStackParamList,
        'TestScreen'
    >;
}

export function TestScreen({
    route,
}: TestScreenProps) {

    const navigation =
        useNavigation<any>();

    const {

        oppositionId,

        name,

        setTime,

        examType,

        immediateSolution,

        titleParam,

    } = route.params;

    const {

        currentQuestion,

        currentQuestionIndex,

        testQuestions,

        loading,

    } = useTest();

    const finishExamEarly =
        useTestStore(
            state => state.finishExamEarly,
        );

    const timer =
        useExamTimer({

            initialMinutes: setTime,

        });

    /* -------------------------------------------------------------------------- */
    /*                      AJUSTAR TIEMPO CUANDO CARGA EL TEST                    */
    /* -------------------------------------------------------------------------- */



    const finishExam =
        useFinishExam({

            finishExamEarly,

            stopTimer: timer.stop,

        });

    const navigateToSummary =
        useCallback((

            finishedByTime: boolean,

            questionTimeSpent: number,

        ) => {

            finishExam.finish(

                questionTimeSpent,

                {

                    finishedByTime,

                },

            );

            navigation.replace(

                'ExamSummaryScreen',

                {

                    oppositionId,

                    oppositionName: name,

                    examName: titleParam,

                    examType,

                    timeConfigured: setTime,

                    finishedByTime:

                        timer.timeLeft <= 0,

                    finishedEarly:

                        timer.timeLeft > 0,

                },

            );

        }, [

            finishExam,

            navigation,

            oppositionId,

            name,

            examType,

            setTime,

            timer.timeLeft,

        ]);

    const session =
        useQuestionSession({

            immediateSolution,

            onFinishExam: (
                questionTimeSpent,
            ) =>
                navigateToSummary(
                    false,
                    questionTimeSpent,
                ),

        });

    useEffect(() => {

        if (!timer.isRunning) {
            return;
        }

        if (timer.timeLeft === 0) {
            return;
        }

        session.incrementQuestionTime();

    }, [

        timer.timeLeft,

        timer.isRunning,

        session.incrementQuestionTime,

    ]);

    useEffect(() => {

        if (timer.timeLeft > 0) {
            return;
        }

        navigateToSummary(

            true,

            session.getQuestionTime(),

        );

    }, [

        timer.timeLeft,

        navigateToSummary,

        session,

    ]);

    const handleExitExam = useCallback(() => {

        timer.pause();

        Alert.alert(
            '¿Finalizar test?',
            '¿Estás seguro de que quieres finalizar el examen? Las preguntas restantes quedarán sin responder.',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Finalizar',
                    style: 'destructive',
                    onPress: () =>
                        navigateToSummary(
                            false,
                            session.getQuestionTime(),
                        ),
                },
            ],
        );

    }, [
        timer,
        session,
        navigateToSummary,
    ]);

    if (
        loading ||
        !currentQuestion
    ) {

        return (

            <ScreenLayout
                title={titleParam}
                showSidebar={false}
            >

                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >

                    <ActivityIndicator
                        size="large"
                    />

                </View>

            </ScreenLayout>

        );

    }

    const canAnswer =
        session.selectedOption !== null;
    return (

        <ScreenLayout
            title={titleParam}
            showSidebar={false}
        >
            <ScrollView
                contentContainerStyle={testStyles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <TestHeader
                    subtitle={name}
                    onExit={handleExitExam}
                />

                <TestProgressCard
                    currentQuestion={
                        currentQuestionIndex + 1
                    }
                    totalQuestions={
                        testQuestions.length
                    }
                    elapsedTime={
                        timer.timeLeft
                    }
                />

                <QuestionCard
                    question={currentQuestion}
                    selectedOption={
                        session.selectedOption
                    }
                    showCorrection={
                        immediateSolution &&
                        session.isShowingSolution
                    }
                    onSelectOption={
                        session.selectOption
                    }
                />

                {immediateSolution &&
                    session.isShowingSolution && (

                        <ExplanationCard
                            explanation={
                                currentQuestion.explanation
                            }
                        />

                    )}

                <TestActions
                    canAnswer={canAnswer}
                    showNextButton={
                        immediateSolution &&
                        session.isShowingSolution
                    }
                    onAnswer={() => {

                        if (immediateSolution) {

                            timer.pause();

                        }

                        session.confirmAnswer();

                    }}
                    onLeaveBlank={() => {

                        if (immediateSolution) {

                            timer.pause();

                        }

                        session.leaveBlank();

                    }}
                    onNext={() => {

                        timer.resume();

                        session.continueQuestion();

                    }}
                />
            </ScrollView>
        </ScreenLayout>

    );
}