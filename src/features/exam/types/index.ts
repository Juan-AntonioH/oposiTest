export * from './opposition';
export * from './officialExam';
export * from './navigation';

export interface Question {
  id: string;
  statement: string; // Enunciado
  options: string[];
  correctIndex: number;
}

export interface Exam {
  id: string;
  title: string;
  syllabusCategory: string; // Bloques de la oposición (Ej: "Bloque I: Constitución")
  questions: Question[];
}

