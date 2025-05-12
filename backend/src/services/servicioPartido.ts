import { PrismaClient, Partido } from '@prisma/client';
const prisma = new PrismaClient();

export async function crearPartidoServicio(data: {
  nombre: string;
  siglas: string;
  logoUrl?: string;
}): Promise<Partido> {
  return prisma.partido.create({ data });
}

export async function obtenerPartidoPorId(id: string): Promise<Partido | null> {
  return prisma.partido.findUnique({ where: { id } });
}

export async function listarPartidosServicio(): Promise<Partido[]> {
  return prisma.partido.findMany();
}

export async function actualizarPartidoServicio(
  id: string,
  cambios: Partial<Omit<Partido, 'id'>>
): Promise<Partido> {
  return prisma.partido.update({ where: { id }, data: cambios });
}

export async function eliminarPartidoServicio(id: string): Promise<Partido> {
  return prisma.partido.delete({ where: { id } });
}