import React, {
    useMemo,
} from 'react';

import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import {
    Dropdown,
} from 'react-native-element-dropdown';

import {
    Ionicons,
} from '@expo/vector-icons';

import {
    Question,
} from '../../types';

import {
    styles,
} from '../../styles/questionList.styles';

interface DropdownItem {

    label: string;

    value: string;

}

interface QuestionsListHeaderProps {
    oppositionName: string;

    questions: Question[];

    filteredQuestionsCount: number;

    searchQuery: string;

    selectedBlock: string;

    selectedTheme: string;

    onSearchChange: (
        value: string,
    ) => void;

    onBlockChange: (
        value: string,
    ) => void;

    onThemeChange: (
        value: string,
    ) => void;

    onClearFilters: () => void;

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

export function QuestionsListHeader({

    oppositionName,

    questions,

    filteredQuestionsCount,

    searchQuery,

    selectedBlock,

    selectedTheme,

    onSearchChange,

    onBlockChange,

    onThemeChange,

    onClearFilters,

}: QuestionsListHeaderProps) {

    const blockOptions =
        useMemo<DropdownItem[]>(() => {

            const blockIds =
                [

                    ...new Set(

                        questions.map(
                            question =>
                                question.blockId,
                        ),

                    ),

                ].sort(
                    (a, b) =>
                        a.localeCompare(
                            b,
                            undefined,
                            {
                                numeric:
                                    true,
                            },
                        ),
                );

            return [

                {

                    label:
                        'Todos los bloques',

                    value:
                        'todos',

                },

                ...blockIds.map(
                    blockId => ({

                        label:
                            `Bloque ${getNumberFromId(
                                blockId,
                            )}`,

                        value:
                            blockId,

                    }),
                ),

            ];

        }, [

            questions,

        ]);

    const themeOptions =
        useMemo<DropdownItem[]>(() => {

            const availableQuestions =

                selectedBlock ===
                    'todos'

                    ? questions

                    : questions.filter(
                        question =>
                            question.blockId ===
                            selectedBlock,
                    );

            const themeIds =
                [

                    ...new Set(

                        availableQuestions.map(
                            question =>
                                question.themeId,
                        ),

                    ),

                ].sort(
                    (a, b) =>
                        a.localeCompare(
                            b,
                            undefined,
                            {
                                numeric:
                                    true,
                            },
                        ),
                );

            return [

                {

                    label:
                        'Todos los temas',

                    value:
                        'todos',

                },

                ...themeIds.map(
                    themeId => ({

                        label:
                            `Tema ${getNumberFromId(
                                themeId,
                            )}`,

                        value:
                            themeId,

                    }),
                ),

            ];

        }, [

            questions,

            selectedBlock,

        ]);

    const hasActiveFilters =

        searchQuery.trim() !== ''

        ||

        selectedBlock !==
        'todos'

        ||

        selectedTheme !==
        'todos';

    return (

        <View
            style={
                styles.filterCard
            }
        >

            <Text
                style={
                    styles.oppositionName
                }
            >
                {oppositionName}
            </Text>

            <Text
                style={
                    styles.labelList
                }
            >
                Buscar pregunta
            </Text>

            <View
                style={
                    styles.searchContainer
                }
            >

                <Ionicons
                    name="search-outline"
                    size={20}
                    color="#64748B"
                />

                <TextInput

                    style={
                        styles.searchInput
                    }

                    placeholder={
                        'Escribe para buscar...'
                    }

                    placeholderTextColor={
                        '#94A3B8'
                    }

                    value={
                        searchQuery
                    }

                    onChangeText={
                        onSearchChange
                    }

                />

            </View>

            <Text
                style={
                    styles.labelList
                }
            >
                Filtrar por bloque
            </Text>

            <Dropdown

                style={
                    styles.dropdownList
                }

                placeholderStyle={
                    styles.placeholder
                }

                selectedTextStyle={
                    styles.selectedText
                }

                data={
                    blockOptions
                }

                labelField="label"

                valueField="value"

                value={
                    selectedBlock
                }

                onChange={(
                    item:
                        DropdownItem,
                ) => {

                    onBlockChange(
                        item.value,
                    );

                }}

            />

            <Text
                style={
                    styles.labelList
                }
            >
                Filtrar por tema
            </Text>

            <Dropdown

                style={
                    styles.dropdownList
                }

                placeholderStyle={
                    styles.placeholder
                }

                selectedTextStyle={
                    styles.selectedText
                }

                data={
                    themeOptions
                }

                labelField="label"

                valueField="value"

                value={
                    selectedTheme
                }

                onChange={(
                    item:
                        DropdownItem,
                ) => {

                    onThemeChange(
                        item.value,
                    );

                }}

            />

            <Text
                style={
                    styles.resultsText
                }
            >

                {filteredQuestionsCount}

                {' '}

                {

                    filteredQuestionsCount ===
                        1

                        ? 'pregunta encontrada'

                        : 'preguntas encontradas'

                }

            </Text>

            {

                hasActiveFilters && (

                    <TouchableOpacity

                        style={
                            styles.btnClearFilters
                        }

                        onPress={
                            onClearFilters
                        }

                    >

                        <Ionicons

                            name="refresh-outline"

                            size={18}

                            color="#FFFFFF"

                        />

                        <Text

                            style={
                                styles.btnClearFiltersText
                            }

                        >
                            Limpiar filtros
                        </Text>

                    </TouchableOpacity>

                )

            }

        </View>

    );

}