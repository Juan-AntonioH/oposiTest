// Abstracción nativa de llamadas seguras con control de errores corporativo
export const apiClient = {
  get: async <T>(endpoint: string): Promise<T> => {
    const BASE_URL = 'https://tuoposicion.es'; // Dominios de producción en España
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer TOKEN_DEL_USUARIO' // Inyectado desde el core de autenticación
      }
    });
    
    if (!response.ok) {
      throw new Error(`[API Error] HTTP status ${response.status}`);
    }
    return response.json();
  }
};
