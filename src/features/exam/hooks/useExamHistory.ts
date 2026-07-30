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

    const availableDateKeys =
        useMemo(() => {

            return [

                ...new Set(

                    allTests.map(
                        test =>

                            getDateKey(
                                test.date,
                            ),
                    ),

                ),

            ];

        }, [

            allTests,

        ]);

    const clearDates =
        useCallback(() => {

            setSelectedDates(
                [],
            );

        }, []);

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

        // Datos

        tests,

        allTests,

        // Estados

        loading,

        error,

        // Opciones del selector

        oppositionOptions,

        // Filtros

        selectedOppositionId,

        selectedDates,

        availableDateKeys,

        // Acciones

        setSelectedOppositionId,

        setSelectedDates,

        clearDates,

        clearFilters,

        reload:
            loadTests,

    };

}