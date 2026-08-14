import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';

import {
    CompletedTest,
    ExamHistoryOppositionOption,
} from '../types';

import {
    getCompletedTestsByUser,
} from '../services/examHistoryService';

interface UseExamHistoryProps {

    userId: string;

}

function getDateKey(
    date: Date,
): string {

    const year =
        date.getFullYear();

    const month =
        String(
            date.getMonth() + 1,
        ).padStart(
            2,
            '0',
        );

    const day =
        String(
            date.getDate(),
        ).padStart(
            2,
            '0',
        );

    return `${year}-${month}-${day}`;

}

export function useExamHistory({

    userId,

}: UseExamHistoryProps) {

    const [

        allTests,

        setAllTests,

    ] = useState<
        CompletedTest[]
    >([]);

    const [

        loading,

        setLoading,

    ] = useState(true);

    const [

        error,

        setError,

    ] = useState<
        string | null
    >(null);

    const [

        selectedOppositionId,

        setSelectedOppositionId,

    ] = useState(
        'all',
    );

    const [

        selectedDates,

        setSelectedDates,

    ] = useState<
        string[]
    >([]);

    const loadTests =
        useCallback(async () => {

            if (!userId) {

                setAllTests([]);

                setLoading(false);

                setError(null);

                return;

            }

            try {

                setLoading(true);

                setError(null);

                const result =
                    await getCompletedTestsByUser(
                        userId,
                    );

                setAllTests(
                    result,
                );

            } catch (error) {

                console.error(
                    'LOAD EXAM HISTORY ERROR',
                    error,
                );

                setError(

                    error instanceof Error

                        ? error.message

                        : 'No se pudo cargar el historial de exámenes.',

                );

            } finally {

                setLoading(false);

            }

        }, [

            userId,

        ]);

    useEffect(() => {

        loadTests();

    }, [

        loadTests,

    ]);

    /*
     * Opciones del selector
     * de oposiciones.
     *
     * Solo se muestran las
     * oposiciones que tienen
     * exámenes en el historial.
     */

    const oppositionOptions =
        useMemo<
            ExamHistoryOppositionOption[]
        >(() => {

            const oppositions =
                new Map<
                    string,
                    string
                >();

            allTests.forEach(
                test => {

                    oppositions.set(

                        test.oppositionId,

                        test.oppositionName,

                    );

                },
            );

            const options =
                Array.from(
                    oppositions.entries(),
                )
                    .map(([
                        oppositionId,
                        oppositionName,
                    ]) => ({

                        label:
                            oppositionName,

                        value:
                            oppositionId,

                    }))
                    .sort(
                        (a, b) =>

                            a.label.localeCompare(
                                b.label,
                                'es',
                            ),
                    );

            return [

                {

                    label:
                        'Todas las oposiciones',

                    value:
                        'all',

                },

                ...options,

            ];

        }, [

            allTests,

        ]);

    /*
     * Exámenes filtrados.
     *
     * Si no hay fechas
     * seleccionadas, se muestran
     * todos los exámenes que
     * coincidan con la oposición.
     */

    const tests =
        useMemo<
            CompletedTest[]
        >(() => {

            return allTests.filter(
                test => {

                    const matchesOpposition =

                        selectedOppositionId
                        ===
                        'all'

                        ||

                        test.oppositionId
                        ===
                        selectedOppositionId;

                    const testDateKey =
                        getDateKey(
                            test.date,
                        );

                    const matchesDate =

                        selectedDates.length
                        ===
                        0

                        ||

                        selectedDates.includes(
                            testDateKey,
                        );

                    return (

                        matchesOpposition

                        &&

                        matchesDate

                    );

                },
            );

        }, [

            allTests,

            selectedOppositionId,

            selectedDates,

        ]);

    /*
     * Días que pueden seleccionarse
     * en el calendario.
     *
     * Si se ha elegido una oposición,
     * solo se muestran los días que
     * contienen exámenes de esa
     * oposición.
     */

    const availableDateKeys =
        useMemo<
            string[]
        >(() => {

            const testsForCalendar =

                selectedOppositionId ===
                    'all'

                    ? allTests

                    : allTests.filter(
                        test =>

                            test.oppositionId ===
                            selectedOppositionId,
                    );

            return [

                ...new Set(

                    testsForCalendar.map(
                        test =>

                            getDateKey(
                                test.date,
                            ),
                    ),

                ),

            ].sort();

        }, [

            allTests,

            selectedOppositionId,

        ]);

    /*
     * Cambiar de oposición también
     * elimina las fechas anteriores.
     *
     * Así no quedan seleccionados
     * días que pertenecen a otra
     * oposición.
     */

    const handleOppositionChange =
        useCallback((

            oppositionId: string,

        ) => {

            setSelectedOppositionId(
                oppositionId,
            );

            setSelectedDates(
                [],
            );

        }, []);

    /*
     * Añade o elimina una fecha
     * del filtro.
     */

    const toggleDate =
        useCallback((

            dateKey: string,

        ) => {

            setSelectedDates(
                currentDates => {

                    const isSelected =

                        currentDates.includes(
                            dateKey,
                        );

                    if (
                        isSelected
                    ) {

                        return currentDates.filter(
                            currentDate =>

                                currentDate !==
                                dateKey,
                        );

                    }

                    return [

                        ...currentDates,

                        dateKey,

                    ];

                },
            );

        }, []);

    /*
     * Elimina únicamente el
     * filtro de fechas.
     */

    const clearDates =
        useCallback(() => {

            setSelectedDates(
                [],
            );

        }, []);

    /*
     * Restablece todos los filtros.
     */

    const clearFilters =
        useCallback(() => {

            setSelectedOppositionId(
                'all',
            );

            setSelectedDates(
                [],
            );

        }, []);

    return {

        tests,

        allTests,

        loading,

        error,

        oppositionOptions,

        selectedOppositionId,

        selectedDates,

        availableDateKeys,

        handleOppositionChange,

        toggleDate,

        clearDates,

        clearFilters,

        reload:
            loadTests,

    };

}