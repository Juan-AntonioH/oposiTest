import {
    useEffect,
    useState,
} from 'react';

import {
    getCompletedTestsByUser,
} from '@/features/exam/services/examHistoryService';

import {
    CompletedTest,
} from '@/features/exam/types';

interface UseDashboardStatsProps {

    userId:
    string;

}

interface DashboardStats {

    totalTests:
    number;

    averageNote:
    string;

    successRate:
    number;

    loading:
    boolean;

}

const INITIAL_STATS:
    DashboardStats = {

    totalTests:
        0,

    averageNote:
        '0,0',

    successRate:
        0,

    loading:
        true,

};

export function useDashboardStats({

    userId,

}: UseDashboardStatsProps) {

    const [

        stats,

        setStats,

    ] = useState<
        DashboardStats
    >(
        INITIAL_STATS,
    );

    useEffect(() => {

        let isMounted =
            true;

        async function loadStats() {

            if (
                !userId
            ) {

                if (
                    isMounted
                ) {

                    setStats({

                        totalTests:
                            0,

                        averageNote:
                            '0,0',

                        successRate:
                            0,

                        loading:
                            false,

                    });

                }

                return;

            }

            try {

                if (
                    isMounted
                ) {

                    setStats(
                        currentStats => ({

                            ...currentStats,

                            loading:
                                true,

                        }),
                    );

                }

                const tests:
                    CompletedTest[] =

                    await getCompletedTestsByUser(
                        userId,
                    );

                if (
                    !isMounted
                ) {

                    return;

                }

                const totalTests =
                    tests.length;

                if (
                    totalTests ===
                    0
                ) {

                    setStats({

                        totalTests:
                            0,

                        averageNote:
                            '0,0',

                        successRate:
                            0,

                        loading:
                            false,

                    });

                    return;

                }

                const totalNotes =

                    tests.reduce(

                        (
                            total,
                            test,
                        ) =>

                            total +
                            test.note,

                        0,

                    );

                const averageNote =

                    totalNotes /
                    totalTests;

                const totalSuccesses =

                    tests.reduce(

                        (
                            total,
                            test,
                        ) =>

                            total +
                            test.successes,

                        0,

                    );

                const totalQuestions =

                    tests.reduce(

                        (
                            total,
                            test,
                        ) =>

                            total +

                            test.successes +

                            test.errors +

                            test.unanswered,

                        0,

                    );

                const successRate =

                    totalQuestions > 0

                        ? Math.round(

                            (
                                totalSuccesses /
                                totalQuestions
                            )

                            * 100,

                        )

                        : 0;

                setStats({

                    totalTests,

                    averageNote:

                        averageNote
                            .toFixed(
                                1,
                            )
                            .replace(
                                '.',
                                ',',
                            ),

                    successRate,

                    loading:
                        false,

                });

            } catch (
            error
            ) {

                console.error(

                    'LOAD DASHBOARD STATS ERROR',

                    error,

                );

                if (
                    isMounted
                ) {

                    setStats({

                        totalTests:
                            0,

                        averageNote:
                            '0,0',

                        successRate:
                            0,

                        loading:
                            false,

                    });

                }

            }

        }

        loadStats();

        return () => {

            isMounted =
                false;

        };

    }, [

        userId,

    ]);

    return {

        totalTests:
            stats.totalTests,

        averageNote:
            stats.averageNote,

        successRate:
            stats.successRate,

        loading:
            stats.loading,

    };

}