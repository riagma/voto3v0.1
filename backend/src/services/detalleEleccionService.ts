import { DetalleEleccion } from '../types/DetalleEleccion';
import detalleEleccionesMock from '../mocks/detalleElecciones.json';

export const obtenerDetalleEleccionService = async (id: string, idUsuario?: string): Promise<DetalleEleccion | null> => {
  if (process.env.VITE_USE_MOCK_DATA === 'true') {
    const detalle = detalleEleccionesMock.find(eleccion => eleccion.id === id);
    if (!detalle) {
      throw new Error('Elección no encontrada');
    }
    return {
      ...detalle,
      estado: detalle.estado as "abierta" | "concluida",
      estadoUsuario: idUsuario ? (detalle.estadoUsuario as "registrado" | "votado" | "registrable" | "cerrado" | "no-censo") : undefined
    };
  }

  // Aquí implementarás la lógica real con Prisma para base de datos cuando VITE_USE_MOCK_DATA sea false
  return null; // Temporal hasta la implementación de DB
};
