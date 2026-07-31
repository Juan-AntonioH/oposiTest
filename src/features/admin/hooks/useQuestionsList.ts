import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';

import {
    useNavigation,
} from '@react-navigation/native';

import {
    NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {
    RootStackParamList,
} from '@/navigation/types';

import {
    Question,
} from '../types';

import {
    getQuestions,
} from '../services/questionService';

interface UseQuestionsListParams {

    oppositionId: string;

}

type NavigationProp =
    NativeStackNavigationProp<
        RootStackParamList
    >;

export function useQuestionsList({

    oppositionId,

}: UseQuestionsListParams) {

    const navigation =
        useNavigation<NavigationProp>();

    const [

        questions,

        setQuestions,

    ] = useState<Question[]>([]);

    const [

        loading,

        setLoading,

    ] = useState(true);

    const [

        error,

        setError,

    ] = useState<string | null>(
        null,
    );

    const [

        searchQuery,

        setSearchQuery,

    ] = useState('');

    const [

        selectedBlock,

        setSelectedBlock,

    ] = useState('todos');

    const [

        selectedTheme,

        setSelectedTheme,

    ] = useState('todos');

    const loadQuestions =
        useCallback(async () => {

            try {

                setLoading(true);

                setError(null);

                const result =
                    await getQuestions(
                        oppositionId,
                    );

                setQuestions(
                    result,
                );

            } catch (error) {

                console.error(
                    'LOAD QUESTIONS LIST ERROR',
                    error,
                );

                setError(

                    error instanceof Error

                        ? error.message

                        : 'No se pudieron cargar las preguntas.',

                );

            } finally {

                setLoading(false);

            }

        }, [

            oppositionId,

        ]);

    useEffect(() => {

        loadQuestions();

    }, [

        loadQuestions,

    ]);

    const filteredQuestions =
        useMemo(() => {

            const normalizedSearch =
                searchQuery

                    .trim()

                    .toLowerCase();

            return questions.filter(
                question => {

                    const matchesSearch =

                        normalizedSearch === ''

                        ||

                        question.question

                            .toLowerCase()

                            .includes(
                                normalizedSearch,
                            );

                    const matchesBlock =

                        selectedBlock ===
                        'todos'

                        ||

                        question.blockId ===
                        selectedBlock;

                    const matchesTheme =

                        selectedTheme ===
                        'todos'

                        ||

                        question.themeId ===
                        selectedTheme;

                    return (

                        matchesSearch &&

                        matchesBlock &&

                        matchesTheme

                    );

                },
            );

        }, [

            questions,

            searchQuery,

            selectedBlock,

            selectedTheme,

        ]);

    const clearFilters =
        useCallback(() => {

            setSearchQuery('');

            setSelectedBlock(
                'todos',
            );

            setSelectedTheme(
                'todos',
            );

        }, []);

    const openQuestion =
        useCallback((

            question: Question,

        ) => {

            navigation.navigate(

                'QuestionFormScreen',

                {

                    idDocument:
                        oppositionId,

                    question,

                },

            );

        }, [

            navigation,

            oppositionId,

        ]);

    const handleBlockChange =
        useCallback((

            blockId: string,

        ) => {

            setSelectedBlock(
                blockId,
            );

            setSelectedTheme(
                'todos',
            );

        }, []);

    return {

        loading,

        error,

        allQuestions:
            questions,

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

    };

}