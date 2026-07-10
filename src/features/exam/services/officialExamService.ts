import {
    collection,
    getDocs,
    orderBy,
    query,
    where,
} from 'firebase/firestore';

import { db } from '@/core/config/firebase';

import { OfficialExam } from '../types';

const COLLECTION_NAME = 'official_exams';

export async function getOfficialExams(
    oppositionId: string,
): Promise<OfficialExam[]> {

    const examsRef = collection(db, COLLECTION_NAME);

    const q = query(
        examsRef,
        where('oppositionId', '==', oppositionId),
        orderBy('year', 'desc'),
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
        idDocument: doc.id,
        ...(doc.data() as Omit<OfficialExam, 'idDocument'>),
    }));

}