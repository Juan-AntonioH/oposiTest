import {
    useEffect,
    useState,
} from 'react';

import {
    getBlock,
    getOpposition,
} from '../../services/oppositionService';

export function useOppositionStructure(
    oppositionId: string,
    blockId?: string,
) {

    const [
        numBlocks,
        setNumBlocks,
    ] = useState(0);

    const [
        numThemes,
        setNumThemes,
    ] = useState(0);

    useEffect(() => {

        async function loadOpposition() {

            if (!oppositionId) {

                setNumBlocks(0);

                return;

            }

            const opposition =
                await getOpposition(
                    oppositionId,
                );

            setNumBlocks(
                opposition?.numBlocks ?? 0,
            );

        }

        loadOpposition();

    }, [oppositionId]);

    useEffect(() => {

        async function loadBlock() {

            if (!oppositionId || !blockId) {

                setNumThemes(0);

                return;

            }

            // Evita mostrar los temas del bloque anterior
            setNumThemes(0);

            const block =
                await getBlock(

                    oppositionId,

                    blockId,

                );

            setNumThemes(
                block?.numThemes ?? 0,
            );

        }

        loadBlock();

    }, [

        oppositionId,

        blockId,

    ]);

    return {

        numBlocks,

        numThemes,

    };

}