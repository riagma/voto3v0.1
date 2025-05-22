import { PrismaClient, RegistroVotanteEleccion } from '@prisma/client';
const prisma = new PrismaClient();

type RegistroData = {
  votanteId: string;
  eleccionId: string;
  compromiso: string;
  transaccion: string;
  datosPrivados?: string;
};

export async function registrarVotanteEleccion(data: RegistroData): Promise<RegistroVotanteEleccion> {
  return prisma.registroVotanteEleccion.create({
    data: {
      ...data,
      fechaRegistro: new Date()
    }
  });
}

export async function listarVotantesEleccion(eleccionId: string): Promise<RegistroVotanteEleccion[]> {
  return prisma.registroVotanteEleccion.findMany({
    where: { eleccionId },
    include: {
      votante: {
        select: {
          nombre: true,
          primerApellido: true,
          segundoApellido: true
        }
      }
    }
  });
}

export async function actualizarVotanteEleccion(
  votanteId: string,
  eleccionId: string,
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
  eleccionId: string
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