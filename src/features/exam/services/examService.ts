import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/core/config/firebase'; // Asegúrate de que apunte a tu instancia de Firestore
import { Oposicion } from '@/features/exam';

export const examService = {
  /**
   * Obtiene todas las oposiciones activas de la base de datos
   */
  getOposicionesActivas: async (): Promise<Oposicion[]> => {
    try {
      const oposicionesRef = collection(db, 'oppositions');
      // Filtramos directamente en la consulta de Firestore por rendimiento
      const q = query(oposicionesRef, where('activo', '==', true));
      const querySnapshot = await getDocs(q);
      
      const oposiciones: Oposicion[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        oposiciones.push({
          idDocumento: doc.id, // Capturamos el ID del documento de Firestore
          id: data.id,
          nombre: data.nombre,
          descripcion: data.descripcion,
          activo: data.activo,
        });
      });
      
      return oposiciones;
    } catch (error) {
      console.error("Error obteniendo oposiciones: ", error);
      throw error;
    }
  }
};
