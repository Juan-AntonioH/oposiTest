import {
    collection,
    deleteDoc,
    doc,
    documentId,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    setDoc,
    updateDoc,
    where,
} from 'firebase/firestore';

import {
    db,
} from '@/core/config/firebase';

import {
    Question,
} from '../types';

const COLLECTION = 'questions';

/* -------------------------------------------------------------------------- */
/*                                   CREATE                                   */
/* -------------------------------------------------------------------------- */

export async function createQuestionInFirestore(
    question: Question,
): Promise<void> {

    await setDoc(

        doc(
            db,
            COLLECTION,
            question.idDocument,
        ),

        question,

    );

}

/* -------------------------------------------------------------------------- */
/*                                   UPDATE                                   */
/* -------------------------------------------------------------------------- */

export async function updateQuestionInFirestore(
    question: Question,
): Promise<void> {

    await updateDoc(

        doc(
            db,
            COLLECTION,
            question.idDocument,
        ),

        {

            ...question,

        },

    );

}

/* -------------------------------------------------------------------------- */
/*                                   DELETE                                   */
/* -------------------------------------------------------------------------- */

export async function deleteQuestionFromFirestore(
    questionId: string,
): Promise<void> {

    await updateDoc(

        doc(
            db,
            COLLECTION,
            questionId,
        ),

        {
            active: false,
        },

    );

}

/* -------------------------------------------------------------------------- */
/*                                    GET                                     */
/* -------------------------------------------------------------------------- */

export async function getQuestionFromFirestore(
    questionId: string,
): Promise<Question | null> {

    const snapshot =
        await getDoc(

            doc(
                db,
                COLLECTION,
                questionId,
            ),

        );

    if (!snapshot.exists()) {

        return null;

    }

    return snapshot.data() as Question;

}

/* -------------------------------------------------------------------------- */
/*                                   LIST                                     */
/* -------------------------------------------------------------------------- */

export async function getQuestionsFromFirestore(
    oppositionId: string,
): Promise<Question[]> {

    const q =
        query(

            collection(
                db,
                COLLECTION,
            ),

            where(
                'oppositionId',
                '==',
                oppositionId,
            ),

        );

    const snapshot =
        await getDocs(q);

    return snapshot.docs.map(
        document => ({

            idDocument:
                document.id,

            ...(
                document.data() as
                Omit<
                    Question,
                    'idDocument'
                >
            ),

        }),
    );

}

/* -------------------------------------------------------------------------- */
/*                              NEXT QUESTION ID                              */
/* -------------------------------------------------------------------------- */

export async function generateNextQuestionIdFromFirestore(): Promise<string> {

    const q =
        query(

            collection(
                db,
                COLLECTION,
            ),

            orderBy(
                documentId(),
                'desc',
            ),

            limit(1),

        );

    const snapshot =
        await getDocs(q);

    if (snapshot.empty) {

        return 'p001';

    }

    const lastId =
        snapshot.docs[0].id;

    const lastNumber =
        parseInt(

            lastId.replace('p', ''),

            10,

        );

    const nextNumber =
        lastNumber + 1;

    return `p${nextNumber
        .toString()
        .padStart(3, '0')}`;

}