import {
    useCallback,
    useEffect,
    useState,
} from 'react';

import {
    getBlocks,
    // getThemes,
} from '../services/oppositionService';

import {
    getThemeQuestionCount,
} from '../services/questionService';

import {
    Block,
    SelectedTheme,
    ThemeWithCount,
} from '../types';
import {
    prepareExam,
} from '../services/examPreparationService';

export interface ThemeGroup {

    block: Block;

    themes: ThemeWithCount[];

}

interface UseThemesProps {

    navigation: any;

    oppositionId: string;

    name: string;

}

export function useThemes({

    navigation,

    oppositionId,

    name,

}: UseThemesProps) {

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        groups,
        setGroups,
    ] = useState<ThemeGroup[]>([]);

    const [selectedThemes, setSelectedThemes] =
        useState<SelectedTheme[]>([]);

    const [
        immediateSolution,
        setImmediateSolution,
    ] = useState(false);

    useEffect(() => {

        async function loadStructure() {

            try {

                const blocks =
                    await getBlocks(
                        oppositionId,
                    );

                const result =
                    await Promise.all(

                        blocks.map(async block => {

                            const totalThemes =
                                block.numThemes ?? 0;

                            const themesWithCount: ThemeWithCount[] =
                                await Promise.all(

                                    Array.from(
                                        {
                                            length: totalThemes,
                                        },
                                        async (_, index) => {

                                            const order =
                                                index + 1;

                                            const themeId =
                                                `tema_${order
                                                    .toString()
                                                    .padStart(2, '0')}`;

                                            const questionCount =
                                                await getThemeQuestionCount(
                                                    oppositionId,
                                                    block.id,
                                                    themeId,
                                                );

                                            return {

                                                idDocument: `${block.id}_${themeId}`,

                                                oppositionId,

                                                blockId: block.id,

                                                themeId,

                                                name: `Tema ${order}`,

                                                order,

                                                questionCount,

                                            };

                                        },

                                    ),

                                );

                            return {

                                block,

                                themes: themesWithCount,

                            };

                        }),

                    );

                setGroups(result);

            } catch (error) {

                console.error(
                    'LOAD THEMES ERROR',
                    error,
                );

            } finally {

                setLoading(false);

            }

        }

        loadStructure();

    }, [
        oppositionId,
    ]);

    const handleToggleTheme =
        useCallback((

            blockId: string,

            themeId: string,

        ) => {

            setSelectedThemes(previous => {

                const exists =
                    previous.some(theme =>

                        theme.blockId === blockId &&

                        theme.themeId === themeId,

                    );

                if (exists) {

                    return previous.filter(theme =>

                        !(

                            theme.blockId === blockId &&

                            theme.themeId === themeId

                        ),

                    );

                }

                return [

                    ...previous,

                    {

                        blockId,

                        themeId,

                    },

                ];

            });

        }, []);

    const handleStartTest =
        useCallback(async () => {

            if (selectedThemes.length === 0) {

                return;

            }

            const totalQuestions =
                await prepareExam({

                    examType: 'themes',

                    oppositionId,

                    selectedThemes,

                });

            navigation.navigate(

                'TestScreen',

                {

                    oppositionId,

                    name,

                    setTime: totalQuestions,

                    examType: 'themes',

                    immediateSolution,

                    titleParam: 'Test por Temas',

                    selectedThemes,

                },

            );

        }, [

            navigation,

            oppositionId,

            name,

            immediateSolution,

            selectedThemes,

        ]);
    return {

        loading,

        groups,

        selectedThemes,

        immediateSolution,

        setImmediateSolution,

        handleToggleTheme,

        handleStartTest,

    };
}