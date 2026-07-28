import {
    Block,
    Theme,
    Opposition,
} from '../types';

import {
    getOppositionFromFirestore,
    getOppositionsFromFirestore,
    getBlockFromFirestore,
    getBlocksFromFirestore,
    // getThemesFromFirestore,
} from './firestoreOppositionService';

/* -------------------------------------------------------------------------- */
/*                               OPPOSITIONS                                  */
/* -------------------------------------------------------------------------- */

export async function getActiveOppositions(): Promise<Opposition[]> {

    const oppositions =
        await getOppositionsFromFirestore();

    return oppositions.filter(
        opposition => opposition.active,
    );

}

export async function getOpposition(
    idDocument: string,
): Promise<Opposition | null> {

    return getOppositionFromFirestore(
        idDocument,
    );

}

/* -------------------------------------------------------------------------- */
/*                                  BLOCKS                                    */
/* -------------------------------------------------------------------------- */

export async function getBlock(
    oppositionId: string,
    blockId: string,
): Promise<Block | null> {

    return getBlockFromFirestore(

        oppositionId,

        blockId,

    );

}

export async function getBlocks(
    oppositionId: string,
): Promise<Block[]> {

    return getBlocksFromFirestore(
        oppositionId,
    );

}

// export async function getThemes(
//     oppositionId: string,
//     blockId: string,
// ): Promise<Theme[]> {

//     return getThemesFromFirestore(

//         oppositionId,

//         blockId,

//     );

// }