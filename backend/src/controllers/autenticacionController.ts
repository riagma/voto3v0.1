import { Request, Response } from 'express';
import { autenticarUsuarioService } from '../services/autenticacionService';
import { autenticacionSchema } from '../schemas/autenticacionSchema';

export const autenticarUsuario = async (req: Request, res: Response) => {
  try {
    const datosValidados = autenticacionSchema.parse(req.body);
    const usuarioAutenticado = await autenticarUsuarioService(datosValidados);

    if (!usuarioAutenticado) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    res.json(usuarioAutenticado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error en la autenticación', error: error.message });
  }
};
