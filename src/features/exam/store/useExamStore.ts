// import { create } from 'zustand';

// interface ExamState {
//   currentQuestionIndex: number;
//   answers: Record<string, number>; // questionId -> selectedIndex
//   setAnswer: (questionId: string, index: number) => void;
//   nextQuestion: () => void;
//   resetExam: () => void;
// }

// export const useExamStore = create<ExamState>((set) => ({
//   currentQuestionIndex: 0,
//   answers: {},
//   setAnswer: (questionId, index) =>
//     set((state) => ({
//       answers: { ...state.answers, [questionId]: index },
//     })),
//   nextQuestion: () => set((state) => ({ currentQuestionIndex: state.currentQuestionIndex + 1 })),
//   resetExam: () => set({ currentQuestionIndex: 0, answers: {} }),
// }));

import { create } from 'zustand';
import { Question, MOCK_QUESTIONS } from '../constants/mockQuestions';

interface ExamState {
    questions: Question[];
    currentIndex: number;
    loading: boolean;

    // Acciones
    loadExamQuestions: (opositionId: string, examType: string) => Promise<void>;
    selectOption: (index: number) => void;
    answerQuestion: (response: number | null, timeSpent: number) => void;
    nextQuestion: () => void;
    finishExamEarly: (currentQuestionTime: number) => any; // Retorna el objeto listo para la DB
    resetExam: () => void;
}

export const useExamStore = create<ExamState>((set, get) => ({
    questions: [],
    currentIndex: 0,
    loading: false,

    // 1. Carga inicial: Ahora lee el Mock, en el futuro hará la Query a Firebase
    loadExamQuestions: async (opositionId, examType) => {
        set({ loading: true });

        // Simulación de retraso de red (opcional)
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Mapeamos los mocks garantizando que numQuestion sea su índice real + 1
        const initialQuestions = MOCK_QUESTIONS.map((q, index) => ({
            ...q,
            numQuestion: index + 1,
            userResponse: null,
            questionTimeSpent: 0
        }));

        set({ questions: initialQuestions, currentIndex: 0, loading: false });
    },

    // 2. Modifica temporalmente la respuesta de la pregunta actual
    selectOption: (index) => {
        const { questions, currentIndex } = get();
        const updated = [...questions];
        updated[currentIndex].userResponse = index;
        set({ questions: updated });
    },

    // 3. Guarda definitivamente la respuesta (o el nulo si es en blanco) y su tiempo acumulado
    answerQuestion: (response, timeSpent) => {
        const { questions, currentIndex } = get();
        const updated = [...questions];
        updated[currentIndex] = {
            ...updated[currentIndex],
            userResponse: response,
            questionTimeSpent: timeSpent
        };
        set({ questions: updated });
    },

    // 4. Incrementa el contador de la pregunta activa
    nextQuestion: () => {
        set((state) => ({ currentIndex: state.currentIndex + 1 }));
    },

    // 5. Procesa y rellena las preguntas restantes en blanco si el usuario abandona antes
    finishExamEarly: (currentQuestionTime) => {
        const { questions, currentIndex } = get();

        const fullyProcessedQuestions = questions.map((q, idx) => {
            // Guarda el tiempo en la pregunta actual donde se quedó
            if (idx === currentIndex) {
                return {
                    ...q,
                    userResponse: q.userResponse,
                    questionTimeSpent: currentQuestionTime
                };
            }
            // Las preguntas que no llegó a ver se quedan con userResponse: null y tiempo: 0
            if (idx > currentIndex) {
                return { ...q, userResponse: null, questionTimeSpent: 0 };
            }
            return q;
        });

        set({ questions: fullyProcessedQuestions });
        return fullyProcessedQuestions; // Devuelve el array listo para procesar totales
    },

    // 6. Limpiador del estado al salir de la pantalla
    resetExam: () => set({ questions: [], currentIndex: 0, loading: false })
}));

