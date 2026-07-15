import {
    collection,
    getDocs,
    query,
    QueryConstraint,
    where,
} from 'firebase/firestore';

import { db } from '@/core/config/firebase';

import {
    Question,
    QuestionFilters,
} from '../types';

const questionsCollection = collection(
    db,
    'questions',
);

/**
 * Public function.
 * Loads questions depending on the exam type.
 */
export async function loadQuestions(
    filters: QuestionFilters,
): Promise<Question[]> {

    switch (filters.examType) {

        case 'official':
            return loadOfficialQuestions(filters);

        case 'blocks':
            return loadBlockQuestions(filters);

        case 'themes':
            return loadThemeQuestions(filters);

        case 'favorites':
            return loadFavoriteQuestions(filters);

        case 'wrongQuestions':
            return loadWrongQuestions(filters);

        case 'custom':
            return loadCustomQuestions(filters);

        case 'simulacrum':
            return loadSimulacrumQuestions(filters);

        default:
            throw new Error('Unsupported exam type.');

    }

}

/* -------------------------------------------------------------------------- */
/*                              PRIVATE FUNCTIONS                             */
/* -------------------------------------------------------------------------- */

async function loadOfficialQuestions(
    filters: QuestionFilters,
): Promise<Question[]> {

    const {
        oppositionId,
        year,
        convocatoria,
    } = filters;

    console.log({
        oppositionId,
        year,
        convocatoria,
    });

    if (!oppositionId) {
        throw new Error('Opposition id is required.');
    }

    if (!year) {
        throw new Error('Exam year is required.');
    }

    if (!convocatoria) {
        throw new Error('Exam convocatoria is required.');
    }

    // 👇 AÑADE ESTO
    const allQuestions = await getDocs(
        questionsCollection,
    );

    console.log(
        'FIRST QUESTION:',
        allQuestions.docs[0]?.data(),
    );

    const constraints: QueryConstraint[] = [
        where('oppositionId', '==', oppositionId),
        where('esOficial', '==', true),
        where('examYear', '==', year),
        where(
    'examConvocatoria',
    '==',
    'Libre',
),
    ];

    const snapshot = await getDocs(
        query(
            questionsCollection,
            ...constraints,
        ),
    );

    console.log(
        'QUESTIONS',
        snapshot.size,
    );

    return snapshot.docs.map((doc) => ({
        idDocument: doc.id,
        ...(doc.data() as Omit<Question, 'idDocument'>),
    }));

}

/* ----------------------------- FUTURE FEATURES ---------------------------- */

async function loadBlockQuestions(
    filters: QuestionFilters,
): Promise<Question[]> {

    throw new Error('Not implemented.');

}

async function loadThemeQuestions(
    filters: QuestionFilters,
): Promise<Question[]> {

    throw new Error('Not implemented.');

}

async function loadFavoriteQuestions(
    filters: QuestionFilters,
): Promise<Question[]> {

    throw new Error('Not implemented.');

}

async function loadWrongQuestions(
    filters: QuestionFilters,
): Promise<Question[]> {

    throw new Error('Not implemented.');

}

async function loadCustomQuestions(
    filters: QuestionFilters,
): Promise<Question[]> {

    throw new Error('Not implemented.');

}

async function loadSimulacrumQuestions(
    filters: QuestionFilters,
): Promise<Question[]> {

    throw new Error('Not implemented.');

}