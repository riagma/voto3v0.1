import { PrismaClient, RegistroVotanteEleccion } from '@prisma/client';
const prisma = new PrismaClient();

type RegistroData = {
  votanteId: string;
  eleccionId: string;
  compromiso: string;
  transaccion: string;
  datosPrivados?: string;
};

export async function registrarVotanteEleccion(data: {
  votanteId: string;
  eleccionId: number;
  compromiso: string;
  transaccion: string;
  datosPrivados?: string;
}): Promise<RegistroVotanteEleccion> {
  return prisma.registroVotanteEleccion.create({
    data
  });
}

export async function listarVotantesEleccion(eleccionId: number): Promise<RegistroVotanteEleccion[]> {
  return prisma.registroVotanteEleccion.findMany({
    where: { eleccionId }
  });
}

export async function actualizarVotanteEleccion(
  votanteId: string,
  eleccionId: number,
  cambios: Partial<Omit<RegistroData, 'votanteId' | 'eleccionId'>>
): Promise<RegistroVotanteEleccion> {
  return prisma.registroVotanteEleccion.update({
    where: {
      votanteId_eleccionId: {
        votanteId,
        eleccionId
      }
    },
    data: cambios
  });
}

export async function eliminarVotanteEleccion(
  votanteId: string,
  eleccionId: number
): Promise<RegistroVotanteEleccion> {
  return prisma.registroVotanteEleccion.delete({
    where: {
      votanteId_eleccionId: {
        votanteId,
        eleccionId
      }
    }
  });
}

export async function obtenerRegistroVotanteEleccion(
  votanteId: string,
  eleccionId: number
): Promise<RegistroVotanteEleccion | null> {
  return prisma.registroVotanteEleccion.findUnique({
    where: {
      votanteId_eleccionId: {
        votanteId,
        eleccionId
      }
    }
  });
}