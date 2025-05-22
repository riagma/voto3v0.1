import { PrismaClient, Partido } from '@prisma/client';
const prisma = new PrismaClient();

export async function crearPartido(data: {
  siglas: string;
  nombre: string;
  descripcion: string;
}): Promise<Partido> {
  return prisma.partido.create({ data });
}

export async function obtenerPartido(siglas: string): Promise<Partido | null> {
  return prisma.partido.findUnique({ 
    where: { siglas } 
  });
}

export async function listarPartidos(eleccionId?: string): Promise<Partido[]> {
  if (eleccionId) {
    return prisma.partido.findMany({
      where: {
        presentaciones: {
          some: {
            eleccionId
          }
        }
      }
    });
  }
  return prisma.partido.findMany();
}

export async function actualizarPartido(
  siglas: string,
  cambios: Partial<Omit<Partido, 'siglas'>>
): Promise<Partido> {
  return prisma.partido.update({ 
    where: { siglas }, 
    data: cambios 
  });
}

export async function eliminarPartido(siglas: string): Promise<Partido> {
  return prisma.partido.delete({ 
    where: { siglas } 
  });
}