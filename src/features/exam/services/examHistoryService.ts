import {
    Timestamp,
    addDoc,
    collection,
} from 'firebase/firestore';

import { db } from '@/core/config/firebase';

import { CompletedTest } from '../types';

const completedTestsCollection =
    collection(
        db,
        'tests_completed',
    );

export async function saveCompletedTest(
    completedTest: CompletedTest,
): Promise<string> {

    const document = {

        ...completedTest,

        date: Timestamp.fromDate(
            completedTest.date,
        ),

    };

    const docRef =
        await addDoc(
            completedTestsCollection,
            document,
        );

    return docRef.id;

}