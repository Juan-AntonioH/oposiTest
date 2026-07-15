import { Timestamp } from 'firebase/firestore';
import { ExamType } from './examTypes';

export interface CompletedAnswer {
    numQuestion: number;

    questionId: string;

    blockId: string;

    themeId: string;

    question: string;

    options: string[];

    userResponse: number | null;

    correctAnswer: number;

    explanation: string;

    questionTimeSpent: number;
}

export interface CompletedTest {
    idDocument?: string;

    userId: string;

    oppositionId: string;

    oppositionName: string;

    examType: ExamType;

    numberOfConfiguredQuestions: number;

    timeConfigured: number;

    date: Timestamp;

    blocksIds: string[];

    themesIds: string[];

    successes: number;

    errors: number;

    unanswered: number;

    note: number;

    timeSpent: number;

    answers: CompletedAnswer[];
}