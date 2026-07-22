/**
 * Modelo principal de una pregunta.
 * Se utiliza para:
 * - Firestore
 * - Crear preguntas
 * - Editar preguntas
 * - Navegación entre pantallas
 */
export interface Question {

    idDocument: string;

    oppositionId: string;

    blockId: string;

    themeId: string;

    question: string;

    options: string[];

    correctAnswer: number;

    explanation: string;

    esOficial: boolean;

    examYear?: number | null;

    examConvocatoria?: string | null;

    randomId: number;

    active: boolean;

}

/**
 * Pregunta utilizada durante la realización de un examen.
 */
export interface TestQuestion extends Question {

    numQuestion: number;

    userResponse: number | null;

    questionTimeSpent: number;

}

/**
 * Datos utilizados por el formulario de alta/edición.
 * Actualmente coincide con Question, pero se mantiene
 * separado por si en el futuro el formulario necesita
 * campos adicionales (imágenes, archivos, etiquetas...).
 */
export type QuestionFormData = Question;

export interface DropdownItem {

    label: string;

    value: string;

}

export interface BuildQuestionParams {

    question?: Question;

    blockId: string;

    themeId: string;

    questionText: string;

    options: string[];

    correctAnswer: number;

    explanation: string;

}