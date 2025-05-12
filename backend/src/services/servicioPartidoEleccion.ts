import { PrismaClient, PartidoEleccion } from '@prisma/client';
const prisma = new PrismaClient();

export async function asignarPartidoAEleccionServicio(data: {
  partidoId: string;
  eleccionId: string;
}): Promise<PartidoEleccion> {
  return prisma.partidoEleccion.create({ data });
}

export async function listarPartidosPorEleccionServicio(
  eleccionId: string
): Promise<PartidoEleccion[]> {
  return prisma.partidoEleccion.findMany({ where: { eleccionId } });
}

export async function eliminarAsignacionPartido(
  id: string
): Promise<PartidoEleccion> {
  return prisma.partidoEleccion.delete({ where: { id } });
}
