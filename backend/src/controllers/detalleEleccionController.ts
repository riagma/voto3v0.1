import { Request, Response } from 'express';
import { obtenerDetalleEleccionService } from '../services/detalleEleccionService';

export const obtenerDetalleEleccion = async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuarioId = req.query.usuarioId as string | undefined;

  try {
    const detalle = await obtenerDetalleEleccionService(id, usuarioId);
    res.json(detalle);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener detalle de la elección' });
  }
};
