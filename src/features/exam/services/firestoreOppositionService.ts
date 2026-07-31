import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
} from 'firebase/firestore';

import {
    db,
} from '@/core/config/firebase';

import {
    Block,
    Theme,
    Opposition,
} from '../types';

const OPPOSITIONS_COLLECTION = 'oppositions';
const BLOCKS_COLLECTION = 'blocks';
const THEMES_COLLECTION = 'themes';

/* -------------------------------------------------------------------------- */
/*                                OPPOSITIONS                                 */
/* -------------------------------------------------------------------------- */

export async function getOppositionsFromFirestore(): Promise<Opposition[]> {

    const snapshot =
        await getDocs(
            collection(
                db,
                OPPOSITIONS_COLLECTION,
            ),
        );

    return snapshot.docs.map(document => ({

        idDocument:
            document.id,

        ...(document.data() as Omit<Opposition, 'idDocument'>),

    }));

}

export async function getOppositionFromFirestore(
    idDocument: string,
): Promise<Opposition | null> {

    const snapshot =
        await getDoc(
            doc(
                db,
                OPPOSITIONS_COLLECTION,
                idDocument,
            ),
        );

    if (!snapshot.exists()) {

        return null;

    }

    return {

        idDocument:
            snapshot.id,

        ...(snapshot.data() as Omit<Opposition, 'idDocument'>),

    };

}

/* -------------------------------------------------------------------------- */
/*                                   BLOCKS                                   */
/* -------------------------------------------------------------------------- */

export async function getBlockFromFirestore(
    oppositionId: string,
    blockId: string,
): Promise<Block | null> {

    const q =
        query(

            collection(
                db,
                BLOCKS_COLLECTION,
            ),

            where(
                'oppositionId',
                '==',
                oppositionId,
            ),

            where(
                'id',
                '==',
                blockId,
            ),

        );

    const snapshot =
        await getDocs(q);

    if (snapshot.empty) {

        return null;

    }

    const document =
        snapshot.docs[0];

    return {

        idDocument:
            document.id,

        ...(document.data() as Omit<Block, 'idDocument'>),

    };

}

export async function getBlocksFromFirestore(
    oppositionId: string,
): Promise<Block[]> {

    const q =
        query(

            collection(
                db,
                BLOCKS_COLLECTION,
            ),

            where(
                'oppositionId',
                '==',
                oppositionId,
            ),

        );

    const snapshot =
        await getDocs(q);

    return snapshot.docs.map(document => ({

        idDocument:
            document.id,

        ...(document.data() as Omit<Block, 'idDocument'>),

    }));

}

/* -------------------------------------------------------------------------- */
/*                                   THEMES                                   */
/* -------------------------------------------------------------------------- */

// export async function getThemesFromFirestore(
//     oppositionId: string,
//     blockId: string,
// ): Promise<Theme[]> {

//     const q = query(
//         collection(db, THEMES_COLLECTION),
//         where('oppositionId', '==', oppositionId),
//         where('blockId', '==', blockId),
//     );

//     const snapshot = await getDocs(q);

//     return snapshot.docs.map(document => ({
//         idDocument: document.id,
//         ...(document.data() as Omit<Theme, 'idDocument'>),
//     }));
// }