import { useState } from 'react';
import { useUsuarioStore } from '../stores/usuarioStore';
import { 
  registrarEnEleccion,
  type RegistroEleccion,
  type RegistroResponse
} from '../services/servicioRegistro';

export const useRegistrar = (eleccionId: number) => {
  const [cargando, setCargando] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [registro, setRegistro] = useState<RegistroResponse | null>(null);
  const votante = useUsuarioStore(state => state.votante);

  const registrar = async (datos: RegistroEleccion): Promise<boolean> => {
    if (!votante) {
      setError('Debes estar autenticado para registrarte en una elección');
      return false;
    }

    setCargando(true);
    setError(null);

    try {
      const response = await registrarEnEleccion(eleccionId, {
        ...datos,
        votanteId: votante.dni
      });
      
      setRegistro(response);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al registrarse en la elección");
      return false;
    } finally {
      setCargando(false);
    }
  };

  return { 
    registrar, 
    registro, 
    cargando, 
    error 
  };
};
