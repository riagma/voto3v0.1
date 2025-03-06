// src/hooks/useDetalleEleccion.ts
import { useState, useEffect } from 'react';
import { DetalleEleccion } from '../types/DetalleEleccion';
import { servicioDetalleEleccion } from '../services/servicioDetalleEleccion';
import useUsuarioStore from '../store/usuarioStore';

export const useDetalleEleccion = (id: string) => {
  const [detalle, setDetalle] = useState<DetalleEleccion | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  
  // Obtener el usuario desde el contexto (Zustand)
  const { usuario } = useUsuarioStore();
  // Suponiendo que el id del usuario se encuentra en usuario.datos.idUnico
  const idUsuario = usuario ? usuario.datos.idUnico : undefined;

  useEffect(() => {
    const obtenerDetalle = async () => {
      try {
        const datos = await servicioDetalleEleccion(id, idUsuario);
        setDetalle(datos);
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

    obtenerDetalle();
  }, [id, idUsuario]);

  return { detalle, cargando, error };
};
