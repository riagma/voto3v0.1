// src/hooks/useElecciones.ts
import { useState, useEffect } from 'react';
import { Eleccion } from '../types/Eleccion';
import { servicioElecciones } from '../services/servicioElecciones';
import useUsuarioStore from '../stores/usuarioStore';

export const useElecciones = () => {
  const [elecciones, setElecciones] = useState<Eleccion[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  
  // Obtener el usuario desde el contexto (Zustand)
  const { usuario } = useUsuarioStore();
  // Suponiendo que el id a enviar es usuario.datos.idUnico si existe
  const idUsuario = usuario ? usuario.datos.idUnico : undefined;

  useEffect(() => {
    const obtenerElecciones = async () => {
      try {
        const datos = await servicioElecciones(idUsuario);
        setElecciones(datos);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error desconocido");
        }
      } finally {
        setCargando(false);
      }
    };

    obtenerElecciones();
  }, [idUsuario]);

  return { elecciones, cargando, error };
};
