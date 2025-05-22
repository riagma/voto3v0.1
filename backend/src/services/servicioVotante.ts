import { PrismaClient, Votante } from '@prisma/client';
import bcrypt from 'bcrypt';
import { AppError } from '../utils/errors';

const prisma = new PrismaClient();

type VotanteData = {
  dni: string;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  correoElectronico?: string;
  hashContrasena: string;
};

type Credenciales = {
  dni: string;
  contrasena: string;
};

/**
 * Valida las credenciales de un votante.
 * @throws AppError si las credenciales son inválidas
 */
export async function validarCredenciales({ dni, contrasena }: Credenciales): Promise<Votante> {
  const votante = await prisma.votante.findUnique({ 
    where: { dni } 
  });

  if (!votante || !votante.hashContrasena) {
    throw new AppError(401, 'Credenciales inválidas');
  }

  const contrasenaValida = await bcrypt.compare(contrasena, votante.hashContrasena);
  
  if (!contrasenaValida) {
    throw new AppError(401, 'Credenciales inválidas');
  }

  return votante;
}

export async function crearVotante(data: VotanteData): Promise<Votante> {
  const contrasenaCifrada = await bcrypt.hash(data.hashContrasena, 10);
  return prisma.votante.create({
    data: { ...data, hashContrasena: contrasenaCifrada },
  });
}

export async function obtenerVotante(dni: string): Promise<Votante | null> {
  return prisma.votante.findUnique({ 
    where: { dni } 
  });
}

export async function actualizarVotante(
  dni: string,
  cambios: Partial<Omit<VotanteData, 'dni' | 'hashContrasena'>>
): Promise<Votante> {
  return prisma.votante.update({ 
    where: { dni }, 
    data: cambios 
  });
}

export async function actualizarContrasena(
  dni: string, 
  nuevaContrasena: string
): Promise<Votante> {
  const hashContrasena = await bcrypt.hash(nuevaContrasena, 10);
  return prisma.votante.update({
    where: { dni },
    data: { hashContrasena }
  });
}

export async function eliminarVotante(dni: string): Promise<Votante> {
  return prisma.votante.delete({ 
    where: { dni } 
  });
}