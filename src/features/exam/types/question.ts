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

    examYear?: number;
    examConvocatoria?: string;

    randomId: number;
}