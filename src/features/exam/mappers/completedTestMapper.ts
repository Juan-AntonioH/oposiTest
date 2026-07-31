import {
    Timestamp,
} from 'firebase/firestore';

import {
    CompletedTest,
} from '../types';

export function mapCompletedTestToFirestore(
    completedTest: CompletedTest,
) {

    return {

        ...completedTest,

        date: Timestamp.fromDate(
            completedTest.date,
        ),

    };

}

export function mapFirestoreToCompletedTest<
    T extends {
        date: Timestamp;
    },
>(
    firestoreDocument: T,
): Omit<T, 'date'> & {
    date: Date;
} {

    return {

        ...firestoreDocument,

        date:
            firestoreDocument.date.toDate(),

    };

}