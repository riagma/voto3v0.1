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
export async function obtenerAdministrador(correo: string): Promise<Administrador | null> {
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

type Credenciales = {
  correo: string;
  contrasena: string;
};

/**
 * Valida las credenciales de un administrador.
 * @throws Error si las credenciales son inválidas
 */
export async function validarCredenciales({ correo, contrasena }: Credenciales): Promise<Administrador> {
  const admin = await prisma.administrador.findUnique({ 
    where: { correo } 
  });

  if (!admin) {
    throw new Error('Credenciales inválidas');
  }

  const contrasenaValida = await bcrypt.compare(contrasena, admin.hashContrasena);
  
  if (!contrasenaValida) {
    throw new Error('Credenciales inválidas');
  }

  return admin;
}
