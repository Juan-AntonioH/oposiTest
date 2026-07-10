import {
    OppositionParams,
    TestScreenParams,
} from '@/features/exam/types';

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

    ///Exams
    ExamsScreen: OppositionParams;

    BlocksScreen: OppositionParams;

    ThemesScreen: OppositionParams;

    CustomTestScreen: OppositionParams;

    WrongQuestionsScreen: OppositionParams;

    TestScreen: TestScreenParams;
    /// Exam Summary and Review

    ExamSummaryScreen: undefined;

    ExamReviewScreen: {
        startIndex?: number;
    };

};