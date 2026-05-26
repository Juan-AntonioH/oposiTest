import { create } from 'zustand';

interface ExamState {
  currentQuestionIndex: number;
  answers: Record<string, number>; // questionId -> selectedIndex
  setAnswer: (questionId: string, index: number) => void;
  nextQuestion: () => void;
  resetExam: () => void;
}

export const useExamStore = create<ExamState>((set) => ({
  currentQuestionIndex: 0,
  answers: {},
  setAnswer: (questionId, index) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: index },
    })),
  nextQuestion: () => set((state) => ({ currentQuestionIndex: state.currentQuestionIndex + 1 })),
  resetExam: () => set({ currentQuestionIndex: 0, answers: {} }),
}));
