import {
    useCallback,
    useEffect,
    useState,
} from 'react';
import {
    prepareExam,
} from '../services/examPreparationService';
import {
    getBlocks,
} from '../services/oppositionService';

import {
    Block,
} from '../types';

interface UseBlocksProps {

    navigation: any;

    oppositionId: string;

    name: string;

}

export function useBlocks({

    navigation,

    oppositionId,

    name,

}: UseBlocksProps) {

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        blocks,
        setBlocks,
    ] = useState<Block[]>([]);

    const [
        selectedBlocks,
        setSelectedBlocks,
    ] = useState<string[]>([]);

    const [
        immediateSolution,
        setImmediateSolution,
    ] = useState(false);

    useEffect(() => {

        async function loadBlocks() {

            try {

                const result =
                    await getBlocks(
                        oppositionId,
                    );

                setBlocks(result);

            } finally {

                setLoading(false);

            }

        }

        loadBlocks();

    }, [
        oppositionId,
    ]);

    const handleToggleBlock =
        useCallback((
            blockId: string,
        ) => {

            setSelectedBlocks(previous => {

                if (
                    previous.includes(blockId)
                ) {

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

    const handleStartTest =
        useCallback(async () => {

            if (
                selectedBlocks.length === 0
            ) {

                return;

            }

            const totalQuestions =
                await prepareExam({

                    examType: 'blocks',

                    oppositionId,

                    selectedBlocks,

                });

            navigation.navigate(

                'TestScreen',

                {

                    oppositionId,

                    name,

                    setTime: totalQuestions,

                    examType: 'blocks',

                    immediateSolution,

                    titleParam: 'Test por Bloques',

                    selectedBlocks,

                },

            );

        }, [

            navigation,

            oppositionId,

            name,

            immediateSolution,

            selectedBlocks,

        ]);

    return {

        loading,

        blocks,

        selectedBlocks,

        immediateSolution,

        setImmediateSolution,

        handleToggleBlock,

        handleStartTest,

    };

}