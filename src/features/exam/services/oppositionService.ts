import { Opposition } from '../types/opposition';
import {
    getOppositionFromFirestore,
    getOppositionsFromFirestore,
} from './firestoreOppositionService';

export async function getActiveOppositions(): Promise<Opposition[]> {

    const oppositions = await getOppositionsFromFirestore();

    return oppositions.filter(opposition => opposition.active);
}

export async function getOpposition(
    idDocument: string,
): Promise<Opposition | null> {

    return getOppositionFromFirestore(idDocument);
}