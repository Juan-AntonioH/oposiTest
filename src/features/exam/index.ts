export interface Oposicion {
  idDocumento: string; // ID autogenerado de Firestore (ej: "opo_01")
  id: string;          // Código corto (ej: "TAI")
  nombre: string;
  descripcion: string;
  activo: boolean;
}
