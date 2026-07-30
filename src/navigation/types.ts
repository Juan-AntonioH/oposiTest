import { Question } from '@/features/admin/types/question';
import {
    OppositionParams,
    TestScreenParams,
} from '@/features/exam/types';
import { ExamType } from '@/features/exam/types/examType';

import {
    CompletedTest,
} from '@/features/exam/types';

export interface ExamSummaryParams {

    oppositionId:
    string;

    oppositionName:
    string;

    examName:
    string;

    examType:
    ExamType;

    timeConfigured:
    number;

    finishedByTime:
    boolean;

    finishedEarly:
    boolean;

    completedTest?:
    CompletedTestNavigationData;

}

export type CompletedTestNavigationData =

    Omit<
        CompletedTest,
        'date'
    >

    & {

        date:
        string;

    };

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

    ExamHistoryScreen: undefined;

    /// Questions

    QuestionFormScreen: QuestionFormParams;

    QuestionsListScreen: {
        idDocument: string;
        code: string;
        name: string;
    };

};