import { PrismaClient, Administrador } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

/**
 * Crea un nuevo administrador con correo y hash de contraseña.
 * @param data { correo, hashContrasena (plaintext) }
 */
export async function crearAdministrador(data: {
  correo: string;
  hashContrasena: string;
}): Promise<{ correo: string }> {
  const contrasenaCifrada = await bcrypt.hash(data.hashContrasena, 10);
  const admin = await prisma.administrador.create({
    data: {
      correo: data.correo,
      hashContrasena: contrasenaCifrada,
    },
  });
  return { correo: admin.correo };
}

/**
 * Obtiene un administrador por su correo.
 */
export async function obtenerAdministradorPorCorreo(correo: string): Promise<Administrador | null> {
  return prisma.administrador.findUnique({ where: { correo } });
}

/**
 * Lista todos los administradores.
 */
export async function listarAdministradores(): Promise<Administrador[]> {
  return prisma.administrador.findMany();
}

/**
 * Actualiza la contraseña de un administrador.
 */
export async function actualizarAdministrador(
  correo: string,
  nuevaContrasena: string
): Promise<Administrador> {
  const contrasenaCifrada = await bcrypt.hash(nuevaContrasena, 10);
  return prisma.administrador.update({
    where: { correo },
    data: { hashContrasena: contrasenaCifrada },
  });
}

/**
 * Elimina un administrador.
 */
export async function eliminarAdministrador(correo: string): Promise<Administrador> {
  return prisma.administrador.delete({ where: { correo } });
}