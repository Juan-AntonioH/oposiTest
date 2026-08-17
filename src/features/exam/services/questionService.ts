import {
    collection,
    getDocs,
    query,
    QueryConstraint,
    where,
    limit as firestoreLimit,
    orderBy,
} from 'firebase/firestore';

import { db } from '@/core/config/firebase';

import {
    Question,
    QuestionFilters,
} from '../types';
import { shuffleQuestions } from '../utils/shuffleQuestions';
const questionsCollection = collection(
    db,
    'questions',
);

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

        // case 'wrongQuestions':
        //     return loadWrongQuestions(filters);

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
export const SIMULACRUM_LIMIT = 80;

async function loadOfficialQuestions(
    filters: QuestionFilters,
): Promise<Question[]> {

    const {
        oppositionId,
        year,
        convocatoria,
    } = filters;

    if (!oppositionId) {
        throw new Error('Opposition id is required.');
    }

    if (!year) {
        throw new Error('Exam year is required.');
    }

    if (!convocatoria) {
        throw new Error('Exam convocatoria is required.');
    }

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

    return snapshot.docs.map((doc) => ({
        idDocument: doc.id,
        ...(doc.data() as Omit<Question, 'idDocument'>),
    }));

}

async function loadBlockQuestions(
    filters: QuestionFilters,
): Promise<Question[]> {

    const {
        oppositionId,
        selectedBlocks,
    } = filters;

    if (!oppositionId) {

        throw new Error(
            'Opposition id is required.',
        );

    }

    if (
        !selectedBlocks ||
        selectedBlocks.length === 0
    ) {

        throw new Error(
            'At least one block must be selected.',
        );

    }

    const result: Question[] = [];

    for (const blockId of selectedBlocks) {

        const randomStart = Math.random();

        const firstSnapshot =
            await getDocs(

                query(

                    questionsCollection,

                    where(
                        'oppositionId',
                        '==',
                        oppositionId,
                    ),

                    where(
                        'blockId',
                        '==',
                        blockId,
                    ),

                    where(
                        'active',
                        '==',
                        true,
                    ),

                    where(
                        'randomId',
                        '>=',
                        randomStart,
                    ),

                    orderBy(
                        'randomId',
                    ),

                    firestoreLimit(40),

                ),

            );

        let questions =
            firstSnapshot.docs

                .map(document => ({

                    idDocument:
                        document.id,

                    ...(document.data() as Omit<
                        Question,
                        'idDocument'
                    >),

                }));

        if (questions.length < 40) {

            const remaining =
                40 - questions.length;

            const secondSnapshot =
                await getDocs(

                    query(

                        questionsCollection,

                        where(
                            'oppositionId',
                            '==',
                            oppositionId,
                        ),

                        where(
                            'blockId',
                            '==',
                            blockId,
                        ),

                        where(
                            'active',
                            '==',
                            true,
                        ),

                        where(
                            'randomId',
                            '<',
                            randomStart,
                        ),

                        orderBy(
                            'randomId',
                        ),

                        firestoreLimit(remaining),

                    ),

                );

            questions.push(

                ...secondSnapshot.docs

                    .map(document => ({

                        idDocument:
                            document.id,

                        ...(document.data() as Omit<
                            Question,
                            'idDocument'
                        >),

                    })),

            );

        }

        result.push(
            ...questions,
        );

    }

    const shuffled =
        shuffleQuestions(result);

    return shuffled.slice(0, 100);

}

async function loadThemeQuestions(
    filters: QuestionFilters,
): Promise<Question[]> {

    const {

        oppositionId,

        selectedThemes,

    } = filters;

    if (!oppositionId) {

        throw new Error(
            'Opposition id is required.',
        );

    }

    if (

        !selectedThemes ||

        selectedThemes.length === 0

    ) {

        throw new Error(
            'At least one theme must be selected.',
        );

    }

    const result: Question[] = [];

    for (const selectedTheme of selectedThemes) {

        const randomStart = Math.random();

        const firstSnapshot =
            await getDocs(

                query(

                    questionsCollection,

                    where(
                        'oppositionId',
                        '==',
                        oppositionId,
                    ),

                    where(
                        'blockId',
                        '==',
                        selectedTheme.blockId,
                    ),

                    where(
                        'themeId',
                        '==',
                        selectedTheme.themeId,
                    ),

                    where(
                        'active',
                        '==',
                        true,
                    ),

                    where(
                        'randomId',
                        '>=',
                        randomStart,
                    ),

                    orderBy(
                        'randomId',
                    ),

                    firestoreLimit(20),

                ),

            );

        let questions =
            firstSnapshot.docs

                .map(document => ({

                    idDocument:
                        document.id,

                    ...(document.data() as Omit<
                        Question,
                        'idDocument'
                    >),

                }));

        if (questions.length < 20) {

            const remaining =
                20 - questions.length;

            const secondSnapshot =
                await getDocs(

                    query(

                        questionsCollection,

                        where(
                            'oppositionId',
                            '==',
                            oppositionId,
                        ),

                        where(
                            'blockId',
                            '==',
                            selectedTheme.blockId,
                        ),

                        where(
                            'themeId',
                            '==',
                            selectedTheme.themeId,
                        ),

                        where(
                            'active',
                            '==',
                            true,
                        ),

                        where(
                            'randomId',
                            '<',
                            randomStart,
                        ),

                        orderBy(
                            'randomId',
                        ),

                        firestoreLimit(remaining),

                    ),

                );

            questions.push(

                ...secondSnapshot.docs

                    .map(document => ({

                        idDocument:
                            document.id,

                        ...(document.data() as Omit<
                            Question,
                            'idDocument'
                        >),

                    })),

            );

        }

        result.push(
            ...questions,
        );

    }

    const shuffled =
        shuffleQuestions(result);

    return shuffled.slice(0, 100);

}

export async function getThemeQuestionCount(
    oppositionId: string,
    blockId: string,
    themeId: string,
): Promise<number> {

    const snapshot = await getDocs(

        query(

            questionsCollection,

            where(
                'oppositionId',
                '==',
                oppositionId,
            ),

            where(
                'blockId',
                '==',
                blockId,
            ),

            where(
                'themeId',
                '==',
                themeId,
            ),

        ),

    );

    return snapshot.docs.filter(
        document => document.data().active !== false,
    ).length;

}

// async function loadFavoriteQuestions(
//     filters: QuestionFilters,
// ): Promise<Question[]> {

//     throw new Error('Not implemented.');

// }

// async function loadWrongQuestions(
//     filters: QuestionFilters,
// ): Promise<Question[]> {

//     throw new Error('Not implemented.');

// }

async function loadCustomQuestions(
    filters: QuestionFilters,
): Promise<Question[]> {

    const {
        oppositionId,
        selectedBlocks,
        selectedThemes,
        limit = 20,
    } = filters;

    if (!oppositionId) {

        throw new Error(
            'Opposition id is required.',
        );

    }

    if (
        !selectedBlocks ||
        selectedBlocks.length === 0
    ) {

        throw new Error(
            'Select at least one block.',
        );

    }

    const result: Question[] = [];

    for (const blockId of selectedBlocks) {

        const blockThemes =
            selectedThemes?.filter(
                theme =>
                    theme.blockId === blockId,
            ) ?? [];

        if (blockThemes.length > 0) {

            for (const selectedTheme of blockThemes) {

                const randomStart =
                    Math.random();

                const firstSnapshot =
                    await getDocs(

                        query(

                            questionsCollection,

                            where(
                                'oppositionId',
                                '==',
                                oppositionId,
                            ),

                            where(
                                'blockId',
                                '==',
                                blockId,
                            ),

                            where(
                                'themeId',
                                '==',
                                selectedTheme.themeId,
                            ),

                            where(
                                'active',
                                '==',
                                true,
                            ),

                            where(
                                'randomId',
                                '>=',
                                randomStart,
                            ),

                            orderBy(
                                'randomId',
                            ),

                            firestoreLimit(limit),

                        ),

                    );

                result.push(

                    ...firstSnapshot.docs

                        .map(document => ({

                            idDocument:
                                document.id,

                            ...(document.data() as Omit<
                                Question,
                                'idDocument'
                            >),

                        })),

                );

            }

        }

        else {

            const randomStart =
                Math.random();

            const firstSnapshot =
                await getDocs(

                    query(

                        questionsCollection,

                        where(
                            'oppositionId',
                            '==',
                            oppositionId,
                        ),

                        where(
                            'blockId',
                            '==',
                            blockId,
                        ),

                        where(
                            'active',
                            '==',
                            true,
                        ),

                        where(
                            'randomId',
                            '>=',
                            randomStart,
                        ),

                        orderBy(
                            'randomId',
                        ),

                        firestoreLimit(limit),

                    ),

                );

            result.push(

                ...firstSnapshot.docs

                    .map(document => ({

                        idDocument:
                            document.id,

                        ...(document.data() as Omit<
                            Question,
                            'idDocument'
                        >),

                    })),

            );

        }

    }

    const shuffled =
        shuffleQuestions(result);

    return shuffled.slice(
        0,
        Math.min(
            limit,
            shuffled.length,
        ),
    );

}

async function loadSimulacrumQuestions(
    filters: QuestionFilters,
): Promise<Question[]> {

    const {
        oppositionId,
    } = filters;

    if (!oppositionId) {

        throw new Error(
            'Opposition id is required.',
        );

    }

    const randomStart = Math.random();

    const firstSnapshot =
        await getDocs(

            query(

                questionsCollection,

                where(
                    'oppositionId',
                    '==',
                    oppositionId,
                ),

                where(
                    'active',
                    '==',
                    true,
                ),

                where(
                    'randomId',
                    '>=',
                    randomStart,
                ),

                orderBy(
                    'randomId',
                ),

                firestoreLimit(
                    SIMULACRUM_LIMIT,
                ),

            ),

        );

    let questions =
        firstSnapshot.docs
            .map(document => ({

                idDocument:
                    document.id,

                ...(document.data() as Omit<
                    Question,
                    'idDocument'
                >),

            }));

    if (
        questions.length <
        SIMULACRUM_LIMIT
    ) {

        const remaining =
            SIMULACRUM_LIMIT -
            questions.length;

        const secondSnapshot =
            await getDocs(

                query(

                    questionsCollection,

                    where(
                        'oppositionId',
                        '==',
                        oppositionId,
                    ),

                    where(
                        'active',
                        '==',
                        true,
                    ),

                    where(
                        'randomId',
                        '<',
                        randomStart,
                    ),

                    orderBy(
                        'randomId',
                    ),

                    firestoreLimit(
                        remaining,
                    ),

                ),

            );

        questions.push(

            ...secondSnapshot.docs
                .map(document => ({

                    idDocument:
                        document.id,

                    ...(document.data() as Omit<
                        Question,
                        'idDocument'
                    >),

                })),

        );

    }

    return shuffleQuestions(
        questions,
    );

}