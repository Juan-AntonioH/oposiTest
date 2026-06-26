export type RootStackParamList = {
    Dashboard: undefined;
    Login: undefined;
    Register: undefined;
    Recovery: undefined;
    Authenticator: { email: string };
    Oppositions: undefined;
    OppositionScreen: { idDocument: string; id: string; name: string };
    ExamsScreen: { opositionId: string; name: string };
    BlocksScreen: { opositionId: string; name: string };
    ThemesScreen: { opositionId: string; name: string };
    CustomTestScreen: { opositionId: string; name: string };
    TestScreen: {
        opositionId: string;
        name: string;
        setTime: number;
        examType: string;
        year: number;
        immediateSolution: boolean;
        titleParam: string;
    };
    ExamSummaryScreen: undefined;
    ExamReviewScreen: { startIndex?: number };
};