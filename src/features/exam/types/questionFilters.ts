import { ExamType } from './examType';

export interface QuestionFilters {
    examType: ExamType;

    oppositionId: string;

    year?: number;

    convocatoria?: string;

    blockIds?: string[];

    themeIds?: string[];

    numberQuestions?: number;
}