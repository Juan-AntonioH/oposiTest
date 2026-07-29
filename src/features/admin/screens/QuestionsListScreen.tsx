import React, {
    useRef,
    useState,
} from 'react';

import {
    NativeScrollEvent,
    NativeSyntheticEvent,
    Pressable,
    ScrollView,
} from 'react-native';

import {
    Ionicons,
} from '@expo/vector-icons';

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
    BackButton,
} from '@/shared/components/Button/BackButton';

import {
    ScreenState,
} from '@/shared/components/ScreenState/ScreenState';

import {
    QuestionsListHeader,
    QuestionsListBody,
} from '../components/QuestionsList';

import {
    useQuestionsList,
} from '../hooks/useQuestionsList';

import {
    styles,
} from '../styles/questionList.styles';

interface QuestionsListScreenProps {

    route:
    RouteProp<
        RootStackParamList,
        'QuestionsListScreen'
    >;

}

export function QuestionsListScreen({

    route,

}: QuestionsListScreenProps) {

    const {

        idDocument,

        code,

        name,

    } = route.params;

    const {

        loading,

        error,

        allQuestions,

        filteredQuestions,

        searchQuery,

        selectedBlock,

        selectedTheme,

        setSearchQuery,

        handleBlockChange,

        setSelectedTheme,

        clearFilters,

        loadQuestions,

        openQuestion,

    } = useQuestionsList({

        oppositionId:
            idDocument,

    });

    const scrollViewRef =
        useRef<
            ScrollView
        >(null);

    const [

        showScrollTop,

        setShowScrollTop,

    ] = useState(false);

    const handleScroll =
        (
            event:
                NativeSyntheticEvent<
                    NativeScrollEvent
                >,
        ) => {

            const scrollPosition =
                event.nativeEvent
                    .contentOffset.y;

            setShowScrollTop(
                scrollPosition > 250,
            );

        };

    const handleScrollToTop =
        () => {

            scrollViewRef.current?.scrollTo({

                y:
                    0,

                animated:
                    true,

            });

        };

    return (

        <ScreenLayout
            title={
                `Preguntas: ${code}`
            }
        >

            <BackButton />

            <ScrollView

                ref={
                    scrollViewRef
                }

                style={
                    styles.containerList
                }

                contentContainerStyle={
                    styles.contentContainerList
                }

                showsVerticalScrollIndicator={
                    false
                }

                onScroll={
                    handleScroll
                }

                scrollEventThrottle={
                    16
                }

            >

                <ScreenState

                    loading={
                        loading
                    }

                    error={
                        error
                    }

                    onRetry={
                        loadQuestions
                    }

                >

                    <QuestionsListHeader
                        oppositionName={name}

                        questions={allQuestions}

                        filteredQuestionsCount={filteredQuestions.length}

                        searchQuery={searchQuery}

                        selectedBlock={selectedBlock}

                        selectedTheme={selectedTheme}

                        onSearchChange={setSearchQuery}

                        onBlockChange={handleBlockChange}

                        onThemeChange={setSelectedTheme}

                        onClearFilters={clearFilters}
                    />

                    <QuestionsListBody

                        questions={
                            filteredQuestions
                        }

                        onQuestionPress={
                            openQuestion
                        }

                    />

                </ScreenState>


            </ScrollView>
            {

                showScrollTop && (

                    <Pressable

                        style={(
                            {
                                pressed,
                            },
                        ) => [

                                styles.scrollTopButton,

                                pressed &&

                                styles.scrollTopButtonPressed,

                            ]}

                        onPress={
                            handleScrollToTop
                        }

                        accessibilityRole={
                            'button'
                        }

                        accessibilityLabel={
                            'Volver arriba'
                        }

                    >

                        <Ionicons

                            name={
                                'arrow-up'
                            }

                            size={
                                24
                            }

                            color={
                                '#FFFFFF'
                            }

                        />

                    </Pressable>

                )

            }
        </ScreenLayout>

    );

}