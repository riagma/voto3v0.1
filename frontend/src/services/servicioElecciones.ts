// src/services/servicioElecciones.ts
import { Eleccion, convertirEleccion } from '../types/Eleccion';

export const servicioElecciones = async (idUsuario?: string): Promise<Eleccion[]> => {
  if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
    // Cargar el fichero JSON de mock
    const datosModule = await import('../mocks/elecciones.json');
    const datosJSON = datosModule.default; // Se importa desde el fichero JSON
    try {
      const datos = datosJSON.map((item: unknown) => {
        const eleccion = convertirEleccion(item);
        // Si no se envía id de usuario, se omite el estado de usuario
        if (!idUsuario) {
          eleccion.estadoUsuario = undefined;
        }
        return eleccion;
      });
      return datos;
    } catch (error) {
      throw new Error("Error al convertir las elecciones: " + (error as Error).message);
    }
  } else {
    // Si no se usan datos mock, se hace el fetch real
    let url = `${import.meta.env.VITE_SERVER_URL}/elecciones`;
    if (idUsuario) {
      url += `?idUsuario=${encodeURIComponent(idUsuario)}`;
    }
    const respuesta = await fetch(url);
    if (!respuesta.ok) {
      throw new Error("Error al obtener la lista de elecciones");
    }
    const datosJSON = await respuesta.json();
    if (!Array.isArray(datosJSON)) {
      throw new Error("Respuesta inválida: se esperaba un arreglo");
    }
    try {
      return datosJSON.map((item: unknown) => convertirEleccion(item));
    } catch (error) {
      throw new Error("Error al convertir las elecciones: " + (error as Error).message);
    }
  }
};
