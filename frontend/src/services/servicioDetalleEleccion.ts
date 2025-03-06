// src/services/servicioDetalleEleccion.ts
import { DetalleEleccion, convertirDetalleEleccion } from '../types/DetalleEleccion';

export const servicioDetalleEleccion = async (
  idEleccion: string,
  idUsuario?: string
): Promise<DetalleEleccion> => {
  if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
    // Cargar el fichero JSON de mocks para el detalle de elecciones
    const datosModule = await import('../mocks/detalleElecciones.json');
    const detalles: unknown[] = datosModule.default;
    
    // Buscar el detalle que corresponda con el id de la elección solicitada
    const detalleMock = detalles.find(item => {
      try {
        const detalle = convertirDetalleEleccion(item);
        return detalle.id === idEleccion;
      } catch {
        return false;
      }
    });
    
    if (!detalleMock) {
      throw new Error("Detalle de elección no encontrado");
    }
    
    // Convertir y retornar el detalle
    let detalleConvertido = convertirDetalleEleccion(detalleMock);
    
    // Si no se ha enviado idUsuario, se puede eliminar o dejar en blanco el estadoUsuario
    if (!idUsuario) {
      detalleConvertido = { ...detalleConvertido, estadoUsuario: undefined };
    }
    
    return detalleConvertido;
  } else {
    // Modo real: se envía el id del usuario (si existe) como parámetro de consulta
    let url = `${import.meta.env.VITE_SERVER_URL}/elecciones/${idEleccion}`;
    if (idUsuario) {
      url += `?idUsuario=${encodeURIComponent(idUsuario)}`;
    }
    const respuesta = await fetch(url);
    if (!respuesta.ok) {
      throw new Error("Error al obtener el detalle de la elección");
    }
    const datosJSON = await respuesta.json();
    try {
      return convertirDetalleEleccion(datosJSON);
    } catch (error) {
      throw new Error("Error al convertir el detalle de la elección: " + (error as Error).message);
    }
  }
};
