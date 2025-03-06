import usuariosMock from '../mocks/datosServidor.json';
import { DatosServidor } from '../types/DatosServidor';

interface Credenciales {
  nif: string;
  clave: string;
}

export const autenticarUsuarioService = async (credenciales: Credenciales): Promise<DatosServidor | null> => {
  if (process.env.VITE_USE_MOCK_DATA === 'true') {
    const usuarioEncontrado = usuariosMock.find(
      usuario => usuario.nif === credenciales.nif && usuario.clave === credenciales.clave
    );

    return usuarioEncontrado || null;
  }

  // Aquí implementarás la lógica real con Prisma cuando VITE_USE_MOCK_DATA sea false
  return null; // Temporal hasta la implementación de base de datos
};
