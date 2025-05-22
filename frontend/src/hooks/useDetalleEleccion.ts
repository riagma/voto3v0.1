// src/hooks/useDetalleEleccion.ts
import { useState, useEffect } from 'react';
import { DetalleEleccion } from '../types/DetalleEleccion';
import { servicioDetalleEleccion } from '../services/servicioDetalleEleccion';
import { useUsuarioStore } from '../stores/usuarioStore';

export const useDetalleEleccion = (id: string) => {
  const [detalle, setDetalle] = useState<DetalleEleccion | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  
  // Obtener el votante desde el store
  const votante = useUsuarioStore(state => state.votante);

  useEffect(() => {
    const obtenerDetalle = async () => {
      try {
        const datos = await servicioDetalleEleccion(id, votante?.dni);
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
  }, [id, votante?.dni]);

  return { detalle, cargando, error };
};
