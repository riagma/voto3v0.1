import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const SECRETO_JWT = process.env.JWT_SECRET || 'super_secreto';

export async function autenticarUsuario(req: Request, res: Response, next: NextFunction) {
  const encabezado = req.headers.authorization?.split(' ');
  if (encabezado?.[0] !== 'Bearer' || !encabezado[1]) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }
  try {
    const contenido: any = jwt.verify(encabezado[1], SECRETO_JWT);
    const votante = await prisma.votante.findUnique({ where: { id: contenido.id } });
    if (!votante) return res.status(401).json({ error: 'Usuario no encontrado' });
    (req as any).votante = votante;
    next();
  } catch {
    return res.status(401).json({ error: 'Token inválido' });
  }
}

export async function autenticarAdmin(req: Request, res: Response, next: NextFunction) {
  const encabezado = req.headers.authorization?.split(' ');
  if (encabezado?.[0] !== 'Bearer' || !encabezado[1]) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }
  try {
    const contenido: any = jwt.verify(encabezado[1], SECRETO_JWT);
    if (!contenido.isAdmin) {
      return res.status(403).json({ error: 'Permiso denegado' });
    }
    next();
  } catch {
    return res.status(401).json({ error: 'Token inválido' });
  }
}