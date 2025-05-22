import { PrismaClient, PartidoEleccion } from '@prisma/client';
const prisma = new PrismaClient();

export async function asignarPartidoEleccion(data: {
  partidoId: string;
  eleccionId: number;
}): Promise<PartidoEleccion> {
  return prisma.partidoEleccion.create({ data });
}

export async function listarPartidosEleccion(
  eleccionId: number
): Promise<PartidoEleccion[]> {
  return prisma.partidoEleccion.findMany({ where: { eleccionId } });
}

export async function eliminarPartidoEleccion(
  partidoId: string,
  eleccionId: number
): Promise<PartidoEleccion> {
  return prisma.partidoEleccion.delete({
    where: {
      partidoId_eleccionId: {
        partidoId,
        eleccionId
      }
    }
  });
}
