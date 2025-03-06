import { useState } from 'react';
import { iniciarSesionLocal } from '../services/servicioAutenticacionLocal';
import useUsuarioStore from '../store/usuarioStore';
import type { UsuarioLocal } from '../types/UsuarioLocal';

export const useIniciarSesion = () => {
  const [cargando, setCargando] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { usuario, setUsuario } = useUsuarioStore();

  const iniciarSesion = async (credenciales: { nombre: string; clave: string }): Promise<UsuarioLocal | null> => {
    setCargando(true);
    setError(null);
    try {
      const usuarioLogueado = iniciarSesionLocal(credenciales);
      // Actualizamos el contexto global con el usuario desencriptado
      setUsuario(usuarioLogueado);
      console.log(usuarioLogueado);
      return usuarioLogueado;
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

  return { iniciarSesion, usuario, cargando, error };
};
