import {
    collection,
    doc,
    getDoc,
    getDocs,
} from 'firebase/firestore';

import { db } from '@/core/config/firebase';
import { Opposition } from '../types/opposition';

const COLLECTION = 'oppositions';

export async function getOppositionsFromFirestore(): Promise<Opposition[]> {
    const snapshot = await getDocs(collection(db, COLLECTION));

    return snapshot.docs.map(document => ({
        idDocument: document.id,
        ...(document.data() as Omit<Opposition, 'idDocument'>),
    }));
}

export async function getOppositionFromFirestore(
    idDocument: string,
): Promise<Opposition | null> {

    const snapshot = await getDoc(doc(db, COLLECTION, idDocument));

    if (!snapshot.exists()) {
        return null;
    }

    return {
        idDocument: snapshot.id,
        ...(snapshot.data() as Omit<Opposition, 'idDocument'>),
    };
}