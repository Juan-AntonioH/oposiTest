export interface Question {
  id: string;
  statement: string; // Enfoque profesional: enunciado
  options: string[];
  correctIndex: number;
}

export interface Exam {
  id: string;
  title: string;
  syllabusCategory: string; // Bloques de la oposición (Ej: "Bloque I: Constitución")
  questions: Question[];
}
