import { db } from '@/core/config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Exam } from '../types';

export const examService = {
  getExamById: async (id: string): Promise<Exam> => {
    // Apuntamos al documento exacto en la colección 'exams' de Firestore
    const examRef = doc(db, 'exams', id);
    const examSnap = await getDoc(examRef);

    if (!examSnap.exists()) {
      throw new Error('El examen solicitado no existe en las bases de datos.');
    }

    // Mapeamos los datos de Firebase con nuestra interfaz de TypeScript
    const data = examSnap.data();
    return {
      id: examSnap.id,
      title: data.title,
      syllabusCategory: data.syllabusCategory,
      questions: data.questions || [],
    } as Exam;
  }
};
