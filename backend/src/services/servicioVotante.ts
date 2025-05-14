import { PrismaClient, Votante } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function crearVotante(data: {
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  dni: string;
  correo?: string;
  hashContrasena: string;
}): Promise<Pick<Votante, 'id'>> {
  const contrasenaCifrada = await bcrypt.hash(data.hashContrasena, 10);
  const nuevo = await prisma.votante.create({
    data: { ...data, hashContrasena: contrasenaCifrada },
  });
  return { id: nuevo.id };
}

export async function obtenerVotantePorId(id: string): Promise<Votante | null> {
  return prisma.votante.findUnique({ where: { id } });
}

export async function obtenerVotantePorDNI(dni: string): Promise<Votante | null> {
  return prisma.votante.findUnique({ where: { dni } });
}

export async function listarVotantes(): Promise<Votante[]> {
  return prisma.votante.findMany();
}

export async function actualizarVotante(
  id: string,
  cambios: Partial<Omit<Votante, 'id' | 'hashContrasena'>> & { hashContrasena?: string }
): Promise<Votante> {
  if (cambios.hashContrasena) {
    cambios.hashContrasena = await bcrypt.hash(cambios.hashContrasena, 10);
  }
  return prisma.votante.update({ where: { id }, data: cambios });
}

export async function eliminarVotante(id: string): Promise<Votante> {
  return prisma.votante.delete({ where: { id } });
}