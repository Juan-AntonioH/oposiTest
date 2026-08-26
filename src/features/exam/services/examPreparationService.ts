import { loadQuestions } from './questionService';
import { QuestionFilters } from '../types/questionFilters';
import { useTestStore } from '../store/useTestStore';

export async function prepareExam(
    filters: QuestionFilters,
): Promise<number> {

    const {
        resetTest,
        initializeTestQuestions,
        setLoading,
    } = useTestStore.getState();

    resetTest();

    try {
        setLoading(true);

        const questions =
            await loadQuestions(filters);

        initializeTestQuestions(
            questions,
        );

        return questions.length;

    } catch (error) {
        console.error(
            'PREPARE: error',
            error,
        );
        resetTest();

        throw error;

    } finally {

        setLoading(false);

    }

}