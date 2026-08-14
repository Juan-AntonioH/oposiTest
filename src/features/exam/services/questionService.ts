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

        const snapshot =
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

                ),

            );

        const questions =
            snapshot.docs

                .map(document => ({

                    idDocument:
                        document.id,

                    ...(document.data() as Omit<Question, 'idDocument'>),

                }))

                .filter(
                    question =>
                        question.active !== false,
                )

                .sort(
                    (a, b) =>
                        a.randomId - b.randomId,
                );

        if (questions.length === 0) {

            continue;

        }

        /*
        ------------------------------------------------------------------------

        TEMPORAL

        Cuando el número de preguntas sea muy elevado,
        esta selección deberá hacerse directamente desde Firestore
        utilizando consultas sobre randomId.

        Ahora mismo se ordenan por randomId y se comienza desde
        una posición aleatoria.

        ------------------------------------------------------------------------
        */

        const start =
            Math.floor(
                Math.random() *
                questions.length,
            );

        const rotated = [

            ...questions.slice(start),

            ...questions.slice(0, start),

        ];

        result.push(

            ...rotated.slice(
                0,
                40,
            ),

        );

    }

    if (result.length <= 100) {

        return result;

    }

    const ordered =
        [...result].sort(
            (a, b) =>
                a.randomId - b.randomId,
        );

    const start =
        Math.floor(
            Math.random() *
            ordered.length,
        );

    const rotated = [

        ...ordered.slice(start),

        ...ordered.slice(0, start),

    ];

    return rotated.slice(
        0,
        100,
    );

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

        const snapshot =
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

                ),

            );

        const questions =
            snapshot.docs

                .map(document => ({

                    idDocument:
                        document.id,

                    ...(document.data() as Omit<Question, 'idDocument'>),

                }))

                .filter(
                    question =>
                        question.active !== false,
                )

                .sort(
                    (a, b) =>
                        a.randomId - b.randomId,
                );

        if (questions.length === 0) {

            continue;

        }

        /*
        ------------------------------------------------------------------------

        TEMPORAL

        Cuando el número de preguntas sea muy elevado,
        esta selección deberá hacerse directamente desde Firestore
        utilizando consultas sobre randomId.

        Ahora mismo se ordenan por randomId y se comienza desde
        una posición aleatoria.

        ------------------------------------------------------------------------
        */

        const start =
            Math.floor(
                Math.random() *
                questions.length,
            );

        const rotated = [

            ...questions.slice(start),

            ...questions.slice(0, start),

        ];

        result.push(

            ...rotated.slice(
                0,
                20,
            ),

        );

    }

    if (result.length <= 100) {

        return result;

    }

    const ordered =
        [...result].sort(
            (a, b) =>
                a.randomId - b.randomId,
        );

    const start =
        Math.floor(
            Math.random() *
            ordered.length,
        );

    const rotated = [

        ...ordered.slice(start),

        ...ordered.slice(0, start),

    ];

    return rotated.slice(
        0,
        100,
    );

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

        // Si hay temas seleccionados del bloque,
        // usamos únicamente esos temas.

        if (blockThemes.length > 0) {

            for (const selectedTheme of blockThemes) {

                const snapshot =
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

                        ),

                    );

                result.push(

                    ...snapshot.docs

                        .map(document => ({

                            idDocument:
                                document.id,

                            ...(document.data() as Omit<Question, 'idDocument'>),

                        }))

                        .filter(
                            question =>
                                question.active !== false,
                        ),

                );

            }

        }

        // Si no se han seleccionado temas,
        // cogemos todo el bloque.

        else {

            const snapshot =
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

                    ),

                );

            result.push(

                ...snapshot.docs

                    .map(document => ({

                        idDocument:
                            document.id,

                        ...(document.data() as Omit<Question, 'idDocument'>),

                    }))

                    .filter(
                        question =>
                            question.active !== false,
                    ),

            );

        }

    }

    const shuffled =
        [...result].sort(
            () => Math.random() - 0.5,
        );

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

    const constraints: QueryConstraint[] = [

        where(
            'oppositionId',
            '==',
            oppositionId,
        ),

    ];

    const snapshot =
        await getDocs(

            query(

                questionsCollection,

                ...constraints,

            ),

        );

    const questions =
        snapshot.docs
            .map(document => ({

                idDocument:
                    document.id,

                ...(document.data() as Omit<Question, 'idDocument'>),

            }))
            .filter(
                question =>
                    question.active !== false,
            );

    /* ---------------------------------------------------------------------- */
    /* TEMPORAL                                                               */
    /* ---------------------------------------------------------------------- */
    /*
     * Actualmente la colección contiene pocas preguntas, por lo que se
     * descargan todas las preguntas de la oposición, se mezclan en memoria
     * y se seleccionan las primeras.
     *
     * FUTURO:
     * Cuando la colección tenga miles de preguntas, esta parte deberá
     * sustituirse por consultas utilizando el campo "randomId".
     *
     * Idea:
     *
     *  const seed = Math.random();
     *
     *  Primera consulta:
     *      where('randomId', '>=', seed)
     *      limit(SIMULACRUM_LIMIT)
     *
     *  Si no devuelve suficientes preguntas:
     *
     *      Segunda consulta:
     *      where('randomId', '<', seed)
     *      limit(restantes)
     *
     * De esta forma solo se descargan las preguntas necesarias sin recorrer
     * toda la colección.
     */

    const shuffled =
        [...questions].sort(
            () => Math.random() - 0.5,
        );

    return shuffled.slice(
        0,
        Math.min(
            SIMULACRUM_LIMIT,
            shuffled.length,
        ),
    );

}