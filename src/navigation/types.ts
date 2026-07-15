import {
    OppositionParams,
    TestScreenParams,
} from '@/features/exam/types';
import { ExamType } from '@/features/exam/types/examTypes';

export interface ExamSummaryParams {

    oppositionId: string;

    oppositionName: string;

    examType: ExamType;

    timeConfigured: number;

    timeRemaining: number;

    totalConfiguredQuestions: number;

}

export interface ExamReviewParams {

    startIndex?: number;

}

export type RootStackParamList = {

    /// Auth

    Dashboard: undefined;

    Login: undefined;

    Register: undefined;

    Recovery: undefined;

    Authenticator: {
        email: string;
    };

    Profile: undefined;

    /// Oppositions

    Oppositions: undefined;

    OppositionScreen: {
        idDocument: string;
        code: string;
        name: string;
    };

    /// Exams

    ExamsScreen: OppositionParams;

    BlocksScreen: OppositionParams;

    ThemesScreen: OppositionParams;

    CustomTestScreen: OppositionParams;

    WrongQuestionsScreen: OppositionParams;

    TestScreen: TestScreenParams;

    /// Results

    ExamSummaryScreen: ExamSummaryParams;

    ExamReviewScreen: ExamReviewParams;

};