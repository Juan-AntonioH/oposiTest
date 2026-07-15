import { Question } from './question';

export interface TestQuestion extends Question {
    numQuestion: number;

    userResponse: number | null;

    questionTimeSpent: number;
}