import { ExamType } from './examType';

export interface SelectedTheme {

    blockId: string;

    themeId: string;

}

export interface QuestionFilters {

    examType: ExamType;

    oppositionId: string;

    year?: number;

    convocatoria?: string;

    blockIds?: string[];

    themeIds?: string[];

    numberQuestions?: number;

    selectedBlocks?: string[];

    selectedThemes?: SelectedTheme[];

    favoritesOnly?: boolean;

    wrongOnly?: boolean;

    limit?: number;

}