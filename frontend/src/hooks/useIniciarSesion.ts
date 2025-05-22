import { useState } from 'react';
import { iniciarSesion as iniciarSesionService } from '../services/servicioAutenticacion';
import { useUsuarioStore } from '../stores/usuarioStore';

interface Credenciales {
  dni: string;
  contrasena: string;
}

export const useIniciarSesion = () => {
  const [cargando, setCargando] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const votante = useUsuarioStore(state => state.votante);

  const login = async (credenciales: Credenciales): Promise<boolean> => {
    setCargando(true);
    setError(null);

    try {
      await iniciarSesionService(credenciales);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      return false;
    } finally {
      setCargando(false);
    }
  };

  return {
    login,
    votante,
    cargando,
    error
  };
};
