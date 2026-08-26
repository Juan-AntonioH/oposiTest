import React from 'react';

import {
    View,
    Text,
    ScrollView,
    Pressable,
} from 'react-native';

import {
    useNavigation,
} from '@react-navigation/native';

import {
    ScreenLayout,
} from '@/shared/layouts/ScreenLayout';

import {
    useAuthStore,
} from '@/store/authStore';

import {
    useExamReview,
} from '../hooks/review/useExamReview';

import {
    useReviewActions,
} from '../hooks/review/useReviewActions';

import {
    ReviewHeader,
    ReviewQuestion,
    ReviewOptions,
    ReviewExplanation,
    ReviewAdminActions,
} from '../components/Review';

import {
    styles,
} from '../styles/exam.styles';

export function ExamReviewScreen() {

    const navigation =
        useNavigation<any>();

    const userRole =
        useAuthStore(
            state => state.role,
        );

    const isAdminOrModerate =
        userRole === 'admin' ||
        userRole === 'moderator';

    const {

        testQuestions,

        currentQuestion,

        currentIndex,

        totalQuestions,

        canGoPrev,

        canGoNext,

        previousQuestion,

        nextQuestion,

    } = useExamReview();

    const {

        backToSummary,

        editQuestion,

    } = useReviewActions();

    if (testQuestions.length === 0) {

        return (

            <ScreenLayout
                title="Error"
            >

                <View
                    style={
                        styles.centerContainer
                    }
                >

                    <Text
                        style={
                            styles.errorText
                        }
                    >
                        No hay datos del examen disponibles.
                    </Text>

                    <Pressable
                        style={
                            styles.btnBack
                        }
                        onPress={() =>
                            navigation.goBack()
                        }
                    >

                        <Text
                            style={
                                styles.btnBackText
                            }
                        >
                            Volver
                        </Text>

                    </Pressable>

                </View>

            </ScreenLayout>

        );

    }

    return (

        <ScreenLayout
            title={`Pregunta ${currentIndex + 1}`}
            showSidebar={false}
        >

            <ReviewHeader

                currentIndex={currentIndex}

                totalQuestions={totalQuestions}

                canGoPrev={canGoPrev}

                canGoNext={canGoNext}

                onPrev={previousQuestion}

                onNext={nextQuestion}

                onBack={backToSummary}

            />

            <ScrollView
                contentContainerStyle={
                    styles.scrollContainerReview
                }
                showsVerticalScrollIndicator={
                    false
                }
            >

                <ReviewQuestion

                    currentIndex={currentIndex}

                    totalQuestions={totalQuestions}

                    question={currentQuestion}

                />

                <ReviewOptions

                    question={currentQuestion}

                />

                <ReviewExplanation

                    question={currentQuestion}

                />

                <ReviewAdminActions
                    visible={isAdminOrModerate}
                    onEdit={() => editQuestion(currentQuestion)}
                />

            </ScrollView>

        </ScreenLayout>

    );

}