import { useQuery } from '@tanstack/react-query';
import { examService } from '../services/examService';
import { Exam } from '../types';

export const useFetchExam = (examId: string) => {
  return useQuery<Exam, Error>({
    queryKey: ['exam', examId],
    queryFn: () => examService.getExamById(examId),
    staleTime: 1000 * 60 * 10, // 10 minutos de caché (Estándar de rendimiento en apps móviles)
  });
};
