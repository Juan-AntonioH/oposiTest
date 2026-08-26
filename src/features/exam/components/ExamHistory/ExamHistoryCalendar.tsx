import React, {
    useMemo,
    useState,
} from 'react';

import {
    Modal,
    Pressable,
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
    historyStyles,
} from '../../styles/examHistory.styles';

interface ExamHistoryCalendarProps {

    visible:
    boolean;

    tests:
    CompletedTest[];

    selectedDates:
    string[];

    availableDateKeys:
    string[];

    onToggleDate: (
        dateKey: string,
    ) => void;

    onClearDates:
    () => void;

    onClose:
    () => void;

}

const WEEK_DAYS = [

    'L',

    'M',

    'X',

    'J',

    'V',

    'S',

    'D',

];

const MONTH_NAMES = [

    'Enero',

    'Febrero',

    'Marzo',

    'Abril',

    'Mayo',

    'Junio',

    'Julio',

    'Agosto',

    'Septiembre',

    'Octubre',

    'Noviembre',

    'Diciembre',

];

function getDateKey(
    year: number,
    month: number,
    day: number,
): string {

    const formattedMonth =
        String(
            month + 1,
        ).padStart(
            2,
            '0',
        );

    const formattedDay =
        String(
            day,
        ).padStart(
            2,
            '0',
        );

    return `${year}-${formattedMonth}-${formattedDay}`;

}

function getDaysInMonth(
    year: number,
    month: number,
): number {

    return new Date(

        year,

        month + 1,

        0,

    ).getDate();

}

function getMondayFirstWeekDay(
    year: number,
    month: number,
): number {

    const sundayFirstDay =
        new Date(

            year,

            month,

            1,

        ).getDay();

    return (

        sundayFirstDay + 6

    ) % 7;

}

export function ExamHistoryCalendar({

    visible,

    tests,

    selectedDates,

    availableDateKeys,

    onToggleDate,

    onClearDates,

    onClose,

}: ExamHistoryCalendarProps) {

    const currentDate =
        new Date();

    const [

        displayedYear,

        setDisplayedYear,

    ] = useState(
        currentDate.getFullYear(),
    );

    const [

        displayedMonth,

        setDisplayedMonth,

    ] = useState(
        currentDate.getMonth(),
    );

    /*
     * Número de exámenes
     * realizados cada día.
     */

    const examsByDate =
        useMemo(() => {

            const result =
                new Map<
                    string,
                    number
                >();

            tests.forEach(
                test => {

                    const date =

                        test.date;

                    const dateKey =

                        getDateKey(

                            date.getFullYear(),

                            date.getMonth(),

                            date.getDate(),

                        );

                    const currentCount =

                        result.get(
                            dateKey,
                        ) ?? 0;

                    result.set(

                        dateKey,

                        currentCount + 1,

                    );

                },
            );

            return result;

        }, [

            tests,

        ]);

    const days =
        useMemo(() => {

            const firstWeekDay =

                getMondayFirstWeekDay(

                    displayedYear,

                    displayedMonth,

                );

            const daysInMonth =

                getDaysInMonth(

                    displayedYear,

                    displayedMonth,

                );

            const calendarDays:
                Array<
                    number | null
                > = [];

            /*
             * Espacios antes
             * del primer día.
             */

            for (

                let index = 0;

                index <
                firstWeekDay;

                index += 1

            ) {

                calendarDays.push(
                    null,
                );

            }

            /*
             * Días del mes.
             */

            for (

                let day = 1;

                day <=
                daysInMonth;

                day += 1

            ) {

                calendarDays.push(
                    day,
                );

            }

            /*
             * Completamos la última
             * fila del calendario.
             */

            while (

                calendarDays.length %
                7 !==
                0

            ) {

                calendarDays.push(
                    null,
                );

            }

            return calendarDays;

        }, [

            displayedYear,

            displayedMonth,

        ]);

    function handlePreviousMonth() {

        if (
            displayedMonth ===
            0
        ) {

            setDisplayedMonth(
                11,
            );

            setDisplayedYear(
                currentYear =>

                    currentYear - 1,
            );

            return;

        }

        setDisplayedMonth(
            currentMonth =>

                currentMonth - 1,
        );

    }

    function handleNextMonth() {

        if (
            displayedMonth ===
            11
        ) {

            setDisplayedMonth(
                0,
            );

            setDisplayedYear(
                currentYear =>

                    currentYear + 1,
            );

            return;

        }

        setDisplayedMonth(
            currentMonth =>

                currentMonth + 1,
        );

    }

    return (

        <Modal

            visible={
                visible
            }

            transparent

            animationType={
                'fade'
            }

            onRequestClose={
                onClose
            }

        >

            <View
                style={
                    historyStyles.calendarOverlay
                }
            >

                <Pressable

                    style={
                        historyStyles.calendarBackdrop
                    }

                    onPress={
                        onClose
                    }

                />

                <View
                    style={
                        historyStyles.calendarModal
                    }
                >

                    <View
                        style={
                            historyStyles.calendarTopBar
                        }
                    >

                        <View>

                            <Text
                                style={
                                    historyStyles.calendarTitle
                                }
                            >
                                Seleccionar fechas
                            </Text>

                            <Text
                                style={
                                    historyStyles.calendarSubtitle
                                }
                            >

                                {

                                    selectedDates.length

                                } fechas seleccionadas

                            </Text>

                        </View>

                        <Pressable

                            style={
                                historyStyles.calendarCloseButton
                            }

                            onPress={
                                onClose
                            }

                        >

                            <MaterialCommunityIcons

                                name={
                                    'close'
                                }

                                size={
                                    24
                                }

                                color={
                                    '#334155'
                                }

                            />

                        </Pressable>

                    </View>

                    <View
                        style={
                            historyStyles.calendarMonthHeader
                        }
                    >

                        <Pressable

                            style={
                                historyStyles.calendarArrowButton
                            }

                            onPress={
                                handlePreviousMonth
                            }

                        >

                            <MaterialCommunityIcons

                                name={
                                    'chevron-left'
                                }

                                size={
                                    26
                                }

                                color={
                                    '#1E3A5F'
                                }

                            />

                        </Pressable>

                        <Text
                            style={
                                historyStyles.calendarMonthText
                            }
                        >

                            {

                                MONTH_NAMES[
                                displayedMonth
                                ]

                            }

                            {' '}

                            {

                                displayedYear

                            }

                        </Text>

                        <Pressable

                            style={
                                historyStyles.calendarArrowButton
                            }

                            onPress={
                                handleNextMonth
                            }

                        >

                            <MaterialCommunityIcons

                                name={
                                    'chevron-right'
                                }

                                size={
                                    26
                                }

                                color={
                                    '#1E3A5F'
                                }

                            />

                        </Pressable>

                    </View>

                    <View
                        style={
                            historyStyles.calendarWeekRow
                        }
                    >

                        {

                            WEEK_DAYS.map(
                                weekDay => (

                                    <View

                                        key={
                                            weekDay
                                        }

                                        style={
                                            historyStyles.calendarWeekDay
                                        }

                                    >

                                        <Text
                                            style={
                                                historyStyles.calendarWeekDayText
                                            }
                                        >

                                            {
                                                weekDay
                                            }

                                        </Text>

                                    </View>

                                ),
                            )

                        }

                    </View>

                    <View
                        style={
                            historyStyles.calendarDays
                        }
                    >

                        {

                            days.map(
                                (
                                    day,
                                    index,
                                ) => {

                                    if (
                                        day ===
                                        null
                                    ) {

                                        return (

                                            <View

                                                key={
                                                    `empty-${index}`
                                                }

                                                style={
                                                    historyStyles.calendarDayCell
                                                }

                                            />

                                        );

                                    }

                                    const dateKey =

                                        getDateKey(

                                            displayedYear,

                                            displayedMonth,

                                            day,

                                        );

                                    const hasExam =

                                        availableDateKeys.includes(
                                            dateKey,
                                        );

                                    const isSelected =

                                        selectedDates.includes(
                                            dateKey,
                                        );

                                    const examsCount =

                                        examsByDate.get(
                                            dateKey,
                                        ) ?? 0;

                                    return (

                                        <View

                                            key={
                                                dateKey
                                            }

                                            style={
                                                historyStyles.calendarDayCell
                                            }

                                        >

                                            <Pressable

                                                disabled={
                                                    !hasExam
                                                }

                                                onPress={() => {

                                                    onToggleDate(
                                                        dateKey,
                                                    );

                                                }}

                                                style={[

                                                    historyStyles.calendarDay,

                                                    hasExam &&

                                                    historyStyles.calendarDayAvailable,

                                                    isSelected &&

                                                    historyStyles.calendarDaySelected,

                                                ]}

                                            >

                                                <Text

                                                    style={[

                                                        historyStyles.calendarDayText,

                                                        !hasExam &&

                                                        historyStyles.calendarDayDisabledText,

                                                        isSelected &&

                                                        historyStyles.calendarDaySelectedText,

                                                    ]}

                                                >

                                                    {
                                                        day
                                                    }

                                                </Text>

                                                {

                                                    examsCount >
                                                    1

                                                    &&

                                                    (

                                                        <View

                                                            style={
                                                                historyStyles.calendarExamCount
                                                            }

                                                        >

                                                            <Text

                                                                style={
                                                                    historyStyles.calendarExamCountText
                                                                }

                                                            >

                                                                {

                                                                    examsCount

                                                                }

                                                            </Text>

                                                        </View>

                                                    )

                                                }

                                            </Pressable>

                                        </View>

                                    );

                                },
                            )

                        }

                    </View>

                    <View
                        style={
                            historyStyles.calendarFooter
                        }
                    >

                        <Pressable

                            style={
                                historyStyles.calendarClearButton
                            }

                            onPress={
                                onClearDates
                            }

                        >

                            <Text
                                style={
                                    historyStyles.calendarClearButtonText
                                }
                            >
                                Limpiar fechas
                            </Text>

                        </Pressable>

                        <Pressable

                            style={
                                historyStyles.calendarApplyButton
                            }

                            onPress={
                                onClose
                            }

                        >

                            <Text
                                style={
                                    historyStyles.calendarApplyButtonText
                                }
                            >
                                Aplicar
                            </Text>

                        </Pressable>

                    </View>

                </View>

            </View>

        </Modal>

    );

}