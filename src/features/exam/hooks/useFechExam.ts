import { useState, useEffect } from 'react';
import { examService } from '@/features/exam/services/examService';
import { Oposicion } from '@/features/exam';

export function useFetchExam() {
  const [oposiciones, setOposiciones] = useState<Oposicion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const cargarOposiciones = async () => {
    try {
      setLoading(true);
      setError(null);
      const datos = await examService.getOposicionesActivas();
      setOposiciones(datos);
    } catch (err) {
      setError('No se pudieron cargar las oposiciones. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarOposiciones();
  }, []);

  return { oposiciones, loading, error, refrescar: cargarOposiciones };
}
