import {
    useCallback,
    useEffect,
    useState,
} from 'react';

import {
    getBlocks,
} from '../../services/oppositionService';

import {
    getThemeQuestionCount,
} from '../../services/questionService';

import {
    Block,
    ThemeWithCount,
    SelectedTheme,
} from '../../types';

export interface ThemeGroup {

    block: Block;

    themes: ThemeWithCount[];

}

export function useCustomSelection(
    oppositionId: string,
) {

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        groups,
        setGroups,
    ] = useState<ThemeGroup[]>([]);

    const [
        selectedBlocks,
        setSelectedBlocks,
    ] = useState<string[]>([]);

    const [
        selectedThemes,
        setSelectedThemes,
    ] = useState<SelectedTheme[]>([]);

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

                            const themes: ThemeWithCount[] =
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

                                                idDocument:
                                                    `${block.id}_${themeId}`,

                                                oppositionId,

                                                blockId:
                                                    block.id,

                                                themeId,

                                                name:
                                                    `Tema ${order}`,

                                                order,

                                                questionCount,

                                            };

                                        },

                                    ),

                                );

                            return {

                                block,

                                themes,

                            };

                        }),

                    );

                setGroups(result);

            } catch (error) {

                console.error(
                    'LOAD CUSTOM STRUCTURE ERROR',
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

    const handleToggleBlock =
        useCallback((

            blockId: string,

        ) => {

            setSelectedBlocks(previous => {

                const exists =
                    previous.includes(blockId);

                if (exists) {

                    setSelectedThemes(previousThemes =>

                        previousThemes.filter(

                            theme =>
                                theme.blockId !== blockId,

                        ),

                    );

                    return previous.filter(

                        id => id !== blockId,

                    );

                }

                return [

                    ...previous,

                    blockId,

                ];

            });

        }, []);

    const handleToggleTheme =
        useCallback((

            blockId: string,

            themeId: string,

        ) => {

            setSelectedThemes(previous => {

                const exists =
                    previous.some(

                        theme =>

                            theme.blockId === blockId &&

                            theme.themeId === themeId,

                    );

                if (exists) {

                    return previous.filter(

                        theme => !(

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

    return {

        loading,

        groups,

        selectedBlocks,

        selectedThemes,

        handleToggleBlock,

        handleToggleTheme,

    };

}