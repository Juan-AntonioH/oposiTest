// Estructura oficial almacenada en la colección "preguntas" de Firestore
export interface FirebaseQuestion {
    id?: string;
    questionId?: string; // Soportamos ambos formatos por compatibilidad
    oppositionId: string;
    blockId: string;
    temaId: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    randomId: number;
    esOficial: boolean;
    examYear?: number;
    examConvocatoria?: string;
}

// Estructura que extiende la pregunta con la interacción del usuario en un examen
export interface Question extends FirebaseQuestion {
    numQuestion: number;
    userResponse: number | null;
    questionTimeSpent: number;
}

// Actualización oficial de los parámetros de navegación de tu RootStackParamList
export type AdminStackParamList = {
    QuestionForm: {
        idDocument: string;            // ID de la oposición
        nombreOposicion: string;       // Nombre legible
        questionData?: FirebaseQuestion; // Objeto de edición limpio
    };
};
