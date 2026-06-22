export interface FirebaseQuestion {
  id?: string;
  oppositionId: string;
  blockId: string;
  temaId: string;
  question: string;
  options: string[]; // ["Opción A", "Opción B", "Opción C", "Opción D"]
  correctAnswer: number; // 0, 1, 2, o 3
  explanation: string;
  randomId: number;
  esOficial: boolean;
  examYear?: number;
  examConvocatoria?: string;
}

export type AdminStackParamList = {
  QuestionForm: {
    idDocument: string;            // ID de la oposición (p. ej., 'opo_01')
    nombreOposicion: string;       // Nombre de la oposición (p. ej., 'Técnico auxiliar informática')
    questionData?: FirebaseQuestion; // Si viene, es EDICIÓN
  };
};