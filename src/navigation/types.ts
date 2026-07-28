import { Question } from '@/features/admin/types/question';
import {
    OppositionParams,
    TestScreenParams,
} from '@/features/exam/types';
import { ExamType } from '@/features/exam/types/examType';

export interface ExamSummaryParams {

    oppositionId: string;

    oppositionName: string;

    examName: string;

    examType: ExamType;

    timeConfigured: number;

    finishedByTime: boolean;

    finishedEarly: boolean;

}

export interface ExamReviewParams {

    startIndex?: number;

}

export interface QuestionFormParams {

    idDocument: string;

    question?: Question;

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

    /// Questions

    QuestionFormScreen: QuestionFormParams;

};