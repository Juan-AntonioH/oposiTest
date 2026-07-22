import {
    Block,
    Opposition,
} from '../types';

import {
    getOppositionFromFirestore,
    getOppositionsFromFirestore,
    getBlockFromFirestore,
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
console.log({
    oppositionId,
    blockId,
});
    return getBlockFromFirestore(

        oppositionId,

        blockId,

    );

}