import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export function validarEsquema(esquema: ZodSchema<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const resultado = esquema.safeParse(req.body);
    if (!resultado.success) {
      return res.status(400).json({ errores: resultado.error.format() });
    }
    req.body = resultado.data;
    next();
  };
}