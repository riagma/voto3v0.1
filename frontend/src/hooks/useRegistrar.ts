import { useState } from 'react';
import { DatosRegistro, registrarUsuarioLocal } from '../services/servicioAutenticacionLocal';
import type { UsuarioLocal } from '../types/UsuarioLocal';

export const useRegistrar = () => {
  const [cargando, setCargando] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [usuario, setUsuario] = useState<UsuarioLocal | null>(null);

  const registrar = async (datos: DatosRegistro): Promise<UsuarioLocal | null> => {
    setCargando(true);
    setError(null);
    try {
      const nuevoUsuario = await registrarUsuarioLocal(datos);
      setUsuario(nuevoUsuario);
      return nuevoUsuario;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error desconocido");
      }
      return null;
    } finally {
      setCargando(false);
    }
  };

  return { registrar, usuario, cargando, error };
};
