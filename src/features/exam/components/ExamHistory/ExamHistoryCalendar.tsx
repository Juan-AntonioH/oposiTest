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
    styles,
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
                    styles.calendarOverlay
                }
            >

                <Pressable

                    style={
                        styles.calendarBackdrop
                    }

                    onPress={
                        onClose
                    }

                />

                <View
                    style={
                        styles.calendarModal
                    }
                >

                    <View
                        style={
                            styles.calendarTopBar
                        }
                    >

                        <View>

                            <Text
                                style={
                                    styles.calendarTitle
                                }
                            >
                                Seleccionar fechas
                            </Text>

                            <Text
                                style={
                                    styles.calendarSubtitle
                                }
                            >

                                {

                                    selectedDates.length

                                } fechas seleccionadas

                            </Text>

                        </View>

                        <Pressable

                            style={
                                styles.calendarCloseButton
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
                            styles.calendarMonthHeader
                        }
                    >

                        <Pressable

                            style={
                                styles.calendarArrowButton
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
                                styles.calendarMonthText
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
                                styles.calendarArrowButton
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
                            styles.calendarWeekRow
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
                                            styles.calendarWeekDay
                                        }

                                    >

                                        <Text
                                            style={
                                                styles.calendarWeekDayText
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
                            styles.calendarDays
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
                                                    styles.calendarDayCell
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
                                                styles.calendarDayCell
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

                                                    styles.calendarDay,

                                                    hasExam &&

                                                    styles.calendarDayAvailable,

                                                    isSelected &&

                                                    styles.calendarDaySelected,

                                                ]}

                                            >

                                                <Text

                                                    style={[

                                                        styles.calendarDayText,

                                                        !hasExam &&

                                                        styles.calendarDayDisabledText,

                                                        isSelected &&

                                                        styles.calendarDaySelectedText,

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
                                                                styles.calendarExamCount
                                                            }

                                                        >

                                                            <Text

                                                                style={
                                                                    styles.calendarExamCountText
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
                            styles.calendarFooter
                        }
                    >

                        <Pressable

                            style={
                                styles.calendarClearButton
                            }

                            onPress={
                                onClearDates
                            }

                        >

                            <Text
                                style={
                                    styles.calendarClearButtonText
                                }
                            >
                                Limpiar fechas
                            </Text>

                        </Pressable>

                        <Pressable

                            style={
                                styles.calendarApplyButton
                            }

                            onPress={
                                onClose
                            }

                        >

                            <Text
                                style={
                                    styles.calendarApplyButtonText
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