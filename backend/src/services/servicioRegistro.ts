import { PrismaClient, RegistroVotanteEleccion } from '@prisma/client';
const prisma = new PrismaClient();

export async function inscribirVotanteAEleccionServicio(data: {
  votanteId: string;
  eleccionId: string;
}): Promise<RegistroVotanteEleccion> {
  return prisma.registroVotanteEleccion.create({ data });
}

export async function listarInscripcionesServicio(): Promise<RegistroVotanteEleccion[]> {
  return prisma.registroVotanteEleccion.findMany();
}

export async function actualizarInscripcionServicio(
  id: string,
  cambios: Partial<Omit<RegistroVotanteEleccion, 'id'>>
): Promise<RegistroVotanteEleccion> {
  return prisma.registroVotanteEleccion.update({ where: { id }, data: cambios });
}

export async function eliminarInscripcionServicio(
  id: string
): Promise<RegistroVotanteEleccion> {
  return prisma.registroVotanteEleccion.delete({ where: { id } });
}