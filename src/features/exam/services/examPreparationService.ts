import { loadQuestions } from './questionService';
import { QuestionFilters } from '../types/questionFilters';
import { useTestStore } from '../store/useTestStore';

export async function prepareExam(
    filters: QuestionFilters,
): Promise<number> {
    console.log(
        'PREPARE: inicio',
        filters,
    );
    const {
        resetTest,
        initializeTestQuestions,
    } = useTestStore.getState();

    resetTest();

    try {
        console.log(
            'PREPARE: antes de loadQuestions',
        );
        const questions =
            await loadQuestions(filters);
        console.log(
            'PREPARE: loadQuestions terminado',
            questions.length,
        );
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

    }

}