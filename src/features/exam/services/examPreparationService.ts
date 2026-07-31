import { loadQuestions } from './questionService';
import { QuestionFilters } from '../types/questionFilters';
import { useTestStore } from '../store/useTestStore';

export async function prepareExam(
    filters: QuestionFilters,
): Promise<number> {

    const {
        resetTest,
        initializeTestQuestions,
    } = useTestStore.getState();

    resetTest();

    try {

        const questions =
            await loadQuestions(filters);

        initializeTestQuestions(
            questions,
        );

        return questions.length;

    } catch (error) {

        resetTest();

        throw error;

    }

}