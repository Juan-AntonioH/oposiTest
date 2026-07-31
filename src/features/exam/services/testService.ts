import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    where,
} from 'firebase/firestore';

import { db } from '@/core/config/firebase';

import { CompletedTest } from '../types';

const completedTestsCollection = collection(
    db,
    'tests_completed',
);

/**
 * Saves a completed test.
 */
export async function saveCompletedTest(
    completedTest: CompletedTest,
): Promise<string> {

    try {

        const docRef = await addDoc(
            completedTestsCollection,
            completedTest,
        );

        return docRef.id;

    } catch (error) {

        if (error instanceof Error) {
            throw error;
        }

        throw new Error(
            'An unexpected error occurred while saving the completed test.',
        );

    }

}

/**
 * Gets a completed test by document id.
 */
export async function getCompletedTestById(
    idDocument: string,
): Promise<CompletedTest> {

    try {

        const snapshot = await getDoc(
            doc(
                db,
                'tests_completed',
                idDocument,
            ),
        );

        if (!snapshot.exists()) {
            throw new Error(
                'Completed test not found.',
            );
        }

        return {
            idDocument: snapshot.id,
            ...(snapshot.data() as Omit<
                CompletedTest,
                'idDocument'
            >),
        };

    } catch (error) {

        if (error instanceof Error) {
            throw error;
        }

        throw new Error(
            'An unexpected error occurred while loading the completed test.',
        );

    }

}

/**
 * Gets all completed tests of a user.
 */
export async function getCompletedTestsByUser(
    userId: string,
): Promise<CompletedTest[]> {

    try {

        const snapshot = await getDocs(
            query(
                completedTestsCollection,
                where('userId', '==', userId),
                orderBy('date', 'desc'),
            ),
        );

        return snapshot.docs.map((doc) => ({
            idDocument: doc.id,
            ...(doc.data() as Omit<
                CompletedTest,
                'idDocument'
            >),
        }));

    } catch (error) {

        if (error instanceof Error) {
            throw error;
        }

        throw new Error(
            'An unexpected error occurred while loading completed tests.',
        );

    }

}

/**
 * Deletes a completed test.
 */
export async function deleteCompletedTest(
    idDocument: string,
): Promise<void> {

    try {

        await deleteDoc(
            doc(
                db,
                'tests_completed',
                idDocument,
            ),
        );

    } catch (error) {

        if (error instanceof Error) {
            throw error;
        }

        throw new Error(
            'An unexpected error occurred while deleting the completed test.',
        );

    }

}