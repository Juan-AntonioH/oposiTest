import { ExamType } from "./examType";
import { TestQuestion } from "./testQuestion";

export interface TestSummary {

    userId: string;

    oppositionId: string;

    oppositionName: string;

    examType: ExamType;

    configuredQuestions: number;

    configuredMinutes: number;

    completedAt: Date;

    successes: number;

    errors: number;

    unanswered: number;

    score: number;

    timeSpent: number;

    answers: TestQuestion[];

}