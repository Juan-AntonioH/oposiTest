import {
    Timestamp,
    addDoc,
    collection,
    getDocs,
    orderBy,
    query,
    where,
} from 'firebase/firestore';

import {
    db,
} from '@/core/config/firebase';

import {
    CompletedTest,
} from '../types';

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

export async function getCompletedTestsByUser(
    userId: string,
): Promise<CompletedTest[]> {

    const completedTestsQuery =
        query(

            completedTestsCollection,

            where(
                'userId',
                '==',
                userId,
            ),

            orderBy(
                'date',
                'desc',
            ),

        );

    const snapshot =
        await getDocs(
            completedTestsQuery,
        );

    return snapshot.docs.map(
        document => {

            const data =
                document.data();

            return {

                ...data,

                idDocument:
                    document.id,

                date:
                    data.date instanceof Timestamp

                        ? data.date.toDate()

                        : data.date,

            } as CompletedTest;

        },
    );

}