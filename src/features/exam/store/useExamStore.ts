import { create } from 'zustand';
import { Question, MOCK_QUESTIONS } from '../constants/mockQuestions';

interface ExamState {
    questions: Question[];
    currentIndex: number;
    loading: boolean;

    // Acciones
    loadExamQuestions: (opositionId: string, examType: string) => Promise<void>;
    // 1. En la interfaz ExamState añade la firma de la nueva acción:
    loadSimulacrumQuestions: (opositionId: string) => Promise<void>;
    selectOption: (index: number) => void;
    answerQuestion: (response: number | null, timeSpent: number) => void;
    nextQuestion: () => void;
    finishExamEarly: (currentQuestionTime: number) => any; // Retorna el objeto listo para la DB
    resetExam: () => void;
    getExamSummary: (userId: string) => {
        userId: string;
        oppositionId: string;
        oppositionName: string;
        examType: string;
        numberOfConfiguredQuestions: number;
        timeConfigured: number;
        date: Date;
        successes: number;
        errors: number;
        unanswered: number;
        note: number;
        timeSpent: number;
        answers: Question[];
    };
}

export const useExamStore = create<ExamState>((set, get) => ({
    questions: [],
    currentIndex: 0,
    loading: false,
    loadSimulacrumQuestions: async (opositionId) => {
        set({ loading: true });

        // Simulación de retraso de red
        await new Promise((resolve) => setTimeout(resolve, 500));

        // 1. Añadimos el campo aleatorio a nuestros mocks
        const questionsWithRandom = MOCK_QUESTIONS.map(q => ({
            ...q,
            random: Math.random() // Simula el campo de la base de datos
        }));

        // 2. Mezclamos el array basándonos en ese número aleatorio
        const shuffledMocks = [...questionsWithRandom].sort((a, b) => a.random - b.random);

        // 3. Mapeamos directamente el array mezclado (sin multiplicar)
        // Garantizamos que numQuestion sea correlativo del 1 al total de preguntas disponibles
        const processedQuestions = shuffledMocks.map((q, index) => ({
            ...q,
            numQuestion: index + 1,
            userResponse: null,
            questionTimeSpent: 0
        }));

        set({ questions: processedQuestions, currentIndex: 0, loading: false });
    },

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
    resetExam: () => set({ questions: [], currentIndex: 0, loading: false }),

    // 7. Genera el objeto estructurado listo para mandar a la DB
    getExamSummary: (userId) => {
        const { questions } = get();

        let successes = 0;
        let errors = 0;
        let unanswered = 0;
        let totalTime = 0;

        questions.forEach((q) => {
            totalTime += q.questionTimeSpent || 0;
            if (q.userResponse === null || q.userResponse === undefined) {
                unanswered++;
            } else if (q.userResponse === q.correctAnswer) {
                successes++;
            } else {
                errors++;
            }
        });

        // Fórmula estándar de oposición penalizando errores (Aciertos - (Errores / (4 opciones - 1)))
        const totalQuestions = questions.length || 1;
        const rawNote = ((successes - (errors / 3)) / totalQuestions) * 10;
        const note = Math.max(0, parseFloat(rawNote.toFixed(2)));

        return {
            userId,
            oppositionId: "opo_01",
            oppositionName: "Técnico Auxiliar Informática",
            examType: "Examen_oficiales",
            numberOfConfiguredQuestions: totalQuestions,
            timeConfigured: 90,
            date: new Date(),
            successes,
            errors,
            unanswered,
            note,
            timeSpent: Math.ceil(totalTime / 60),
            answers: questions
        };
    }
}));