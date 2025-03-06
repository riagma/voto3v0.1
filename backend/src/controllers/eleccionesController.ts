import { Request, Response } from 'express';
import { obtenerEleccionesService } from '../services/eleccionesService';

export const obtenerElecciones = async (req: Request, res: Response) => {
  const idUsuario = req.query.usuarioId as string | undefined;
  try {
    const elecciones = await obtenerEleccionesService(idUsuario);
    res.json(elecciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener elecciones' });
  }
};
