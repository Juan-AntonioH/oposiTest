import React from 'react';

import {
    Pressable,
    Text,
    View,
} from 'react-native';

import {
    Dropdown,
} from 'react-native-element-dropdown';

import {
    Ionicons,
} from '@expo/vector-icons';

import {
    styles,
} from '../../styles/examHistory.styles';

export interface ExamHistoryOppositionOption {

    label: string;

    value: string;

}

interface ExamHistoryHeaderProps {

    oppositionOptions:
    ExamHistoryOppositionOption[];

    selectedOppositionId: string;

    selectedDates: string[];

    filteredResultsCount: number;

    totalResultsCount: number;

    onOppositionChange: (
        oppositionId: string,
    ) => void;

    onOpenDatePicker: () => void;

}

function getDateSelectorText(
    selectedDates: string[],
): string {

    if (
        selectedDates.length === 0
    ) {

        return 'Seleccionar fechas...';

    }

    if (
        selectedDates.length === 1
    ) {

        return '1 fecha seleccionada';

    }

    return `${selectedDates.length} fechas seleccionadas`;

}

export function ExamHistoryHeader({

    oppositionOptions,

    selectedOppositionId,

    selectedDates,

    filteredResultsCount,

    totalResultsCount,

    onOppositionChange,

    onOpenDatePicker,

}: ExamHistoryHeaderProps) {

    const dateSelectorText =
        getDateSelectorText(
            selectedDates,
        );

    return (

        <View
            style={
                styles.filterCard
            }
        >

            {/* ---------------------------------------------------------- */}
            {/* TÍTULO                                                     */}
            {/* ---------------------------------------------------------- */}

            <View
                style={
                    styles.filterTitleRow
                }
            >

                <Ionicons
                    name="filter-outline"
                    size={20}
                    color="#475569"
                />

                <Text
                    style={
                        styles.filterTitle
                    }
                >
                    Filtros
                </Text>

            </View>

            {/* ---------------------------------------------------------- */}
            {/* Oposiciones                                                */}
            {/* ---------------------------------------------------------- */}

            <Text
                style={
                    styles.filterLabel
                }
            >
                Oposiciones
            </Text>

            <Dropdown

                style={
                    styles.dropdown
                }

                placeholderStyle={
                    styles.dropdownPlaceholder
                }

                selectedTextStyle={
                    styles.dropdownSelectedText
                }

                data={
                    oppositionOptions
                }

                labelField="label"

                valueField="value"

                value={
                    selectedOppositionId
                }

                onChange={(
                    item:
                        ExamHistoryOppositionOption,
                ) => {

                    onOppositionChange(
                        item.value,
                    );

                }}

                renderRightIcon={() => (

                    <Ionicons
                        name="chevron-down"
                        size={20}
                        color="#1E293B"
                    />

                )}

            />

            {/* ---------------------------------------------------------- */}
            {/* FECHA                                                     */}
            {/* ---------------------------------------------------------- */}

            <Text
                style={
                    styles.filterLabel
                }
            >

                Fecha

            </Text>

            <Pressable

                style={
                    styles.dateSelector
                }

                onPress={
                    onOpenDatePicker
                }

            >

                <View
                    style={
                        styles.dateSelectorLeft
                    }
                >

                    <Ionicons
                        name="calendar-outline"
                        size={18}
                        color="#64748B"
                    />

                    <Text
                        style={
                            styles.dateSelectorText
                        }
                    >

                        {
                            dateSelectorText
                        }

                    </Text>

                </View>

                <Ionicons
                    name="chevron-forward"
                    size={18}
                    color="#475569"
                />

            </Pressable>

            {/* ---------------------------------------------------------- */}
            {/* RESULTADOS                                                */}
            {/* ---------------------------------------------------------- */}

            <Text
                style={
                    styles.resultsText
                }
            >

                Mostrando

                {' '}

                {
                    filteredResultsCount
                }

                {' de '}

                {
                    totalResultsCount
                }

                {' '}

                {
                    totalResultsCount === 1

                        ? 'resultado'

                        : 'resultados'
                }

            </Text>

        </View>

    );

}