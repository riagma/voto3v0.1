import { PrismaClient, Eleccion } from '@prisma/client';
const prisma = new PrismaClient();

export async function crearEleccionServicio(data: {
  nombre: string;
  fechaInicio: Date;
  fechaFin: Date;
  estado: string;
}): Promise<Eleccion> {
  return prisma.eleccion.create({ data });
}

export async function obtenerEleccionPorId(id: string): Promise<Eleccion | null> {
  return prisma.eleccion.findUnique({ where: { id } });
}

export async function listarEleccionesServicio(): Promise<Eleccion[]> {
  return prisma.eleccion.findMany();
}

export async function actualizarEleccionServicio(
  id: string,
  cambios: Partial<Omit<Eleccion, 'id'>>
): Promise<Eleccion> {
  return prisma.eleccion.update({ where: { id }, data: cambios });
}

export async function eliminarEleccionServicio(id: string): Promise<Eleccion> {
  return prisma.eleccion.delete({ where: { id } });
}

