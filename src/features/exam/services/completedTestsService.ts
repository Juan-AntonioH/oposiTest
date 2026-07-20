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
    mapFirestoreToCompletedTest,
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

/* -------------------------------------------------------------------------- */
/*                                    READ                                    */
/* -------------------------------------------------------------------------- */

export async function getCompletedTests(
    userId: string,
): Promise<CompletedTest[]> {

    throw new Error(
        'Not implemented.',
    );

}

export async function getCompletedTest(
    completedTestId: string,
): Promise<CompletedTest | null> {

    throw new Error(
        'Not implemented.',
    );

}

/* -------------------------------------------------------------------------- */
/*                                   DELETE                                   */
/* -------------------------------------------------------------------------- */

export async function deleteCompletedTest(
    completedTestId: string,
): Promise<void> {

    throw new Error(
        'Not implemented.',
    );

}