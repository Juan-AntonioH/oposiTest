import {
    addDoc,
    collection,
} from 'firebase/firestore';

import { db } from '@/core/config/firebase';

import {
    CompletedTest,
} from '../types';

import {
    mapCompletedTestToFirestore,
} from '../mappers/completedTestMapper';

const completedTestsCollection =
    collection(
        db,
        'tests_completed',
    );

/* -------------------------------------------------------------------------- */
/*                                   CREATE                                   */
/* -------------------------------------------------------------------------- */

export async function saveCompletedTest(
    completedTest: CompletedTest,
): Promise<string> {

    const firestoreDocument =
        mapCompletedTestToFirestore(
            completedTest,
        );

    const documentReference =
        await addDoc(
            completedTestsCollection,
            firestoreDocument,
        );

    return documentReference.id;

}