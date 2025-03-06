import eleccionesMock from '../mocks/elecciones.json';

export const obtenerEleccionesService = async (idUsuario?: string) => {
  if (process.env.VITE_USE_MOCK_DATA === 'true') {
    return eleccionesMock.map(eleccion => ({
      ...eleccion,
      estadoUsuario: idUsuario ? 'registrable' : undefined
    }));
  }
  // Implementar lógica de base de datos aquí usando Prisma
};
