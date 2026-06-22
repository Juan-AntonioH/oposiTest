export interface Question {
    numQuestion: number;
    questionId: string;
    blockId: string;
    temaId: string;
    question: string;
    options: string[];
    userResponse: number | null;
    correctAnswer: number;
    questionTimeSpent: number;
    explanation?: string;

    // 👈 AÑADIMOS ESTOS METADATOS DE FIRESTORE COMO OPCIONALES
    id?: string;
    oppositionId?: string;
    randomId?: number;
    esOficial?: boolean;
    examYear?: number;
    examConvocatoria?: string;
}

export const MOCK_QUESTIONS: Question[] = [
    {
        numQuestion: 1,
        questionId: "p320",
        blockId: "bloque_01",
        temaId: "tema_01",
        question: "¿Cuál es la respuesta correcta para este caso de ejemplo de la oposición?",
        options: [
            "Opción A de la pregunta 1",
            "Opción B de la pregunta 1",
            "Opción C de la pregunta 1",
            "Opción D de la pregunta 1"
        ],
        userResponse: null,
        correctAnswer: 2,
        questionTimeSpent: 0,
        explanation: "Esta es la explicación detallada de por qué la opción correcta es la respuesta adecuada para la pregunta 1. En el contexto de la oposición, este concepto es fundamental porque...",
        // Opcionales simulados para pruebas
        oppositionId: "opo_01",
        esOficial: true,
        examYear: 2011,
        examConvocatoria: "Libre"
    },
    {
        numQuestion: 2,
        questionId: "p321",
        blockId: "bloque_01",
        temaId: "tema_02",
        question: "¿Cuál es el plazo general para interponer un recurso de alzada?",
        options: [
            "Un mes",
            "Dos meses",
            "Quince días",
            "Diez días"
        ],
        userResponse: null,
        correctAnswer: 0,
        questionTimeSpent: 0,
        explanation: "El plazo para la interposición del recurso de alzada será de un mes si el acto fuera expreso, de acuerdo con la Ley de Procedimiento Administrativo Común.",
        oppositionId: "opo_01"
    },
    {
        numQuestion: 3,
        questionId: "p322",
        blockId: "bloque_02",
        temaId: "tema_05",
        question: "Según la Constitución Española, ¿en quién reside la soberanía nacional?",
        options: [
            "En el Rey",
            "En las Cortes Generales",
            "En el Pueblo Español",
            "En el Gobierno de la Nación"
        ],
        userResponse: null,
        correctAnswer: 2,
        questionTimeSpent: 0,
        explanation: "El artículo 1.2 de la Constitución establece explícitamente que la soberanía nacional reside en el pueblo español, del que emanan los poderes del Estado.",
        oppositionId: "opo_01"
    },
    {
        numQuestion: 4,
        questionId: "p323",
        blockId: "bloque_03",
        temaId: "tema_08",
        question: "¿Qué tipo de norma jurídica tiene rango de Ley y es dictada por el Gobierno en caso de extraordinaria y urgente necesidad?",
        options: [
            "Real Decreto Legislativo",
            "Real Decreto-Ley",
            "Ley Orgánica",
            "Reglamento"
        ],
        userResponse: null,
        correctAnswer: 1,
        questionTimeSpent: 0,
        explanation: "En caso de extraordinaria y urgente necesidad, el Gobierno podrá dictar disposiciones legislativas provisionales que tomarán la forma de Decretos-leyes.",
        oppositionId: "opo_01"
    },
    {
        numQuestion: 5,
        questionId: "p324",
        blockId: "bloque_03",
        temaId: "tema_10",
        question: "¿Cuál es la capital de España?",
        options: [
            "Madrid",
            "Barcelona",
            "Valencia",
            "Sevilla"
        ],
        userResponse: null,
        correctAnswer: 0,
        questionTimeSpent: 0,
        explanation: "La capital del Estado es la villa de Madrid, tal y como recoge el artículo 5 de la Constitución Española.",
        oppositionId: "opo_01"
    }
];
