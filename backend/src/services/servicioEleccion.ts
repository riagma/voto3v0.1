import { PrismaClient, Eleccion } from '@prisma/client';

const prisma = new PrismaClient();

type EleccionData = {
  nombre: string;
  fechaInicioRegistro: Date;
  fechaFinRegistro: Date;
  fechaInicioVotacion: Date;
  fechaFinVotacion: Date;
  fechaCelebracion: Date;
  estado: string;
};

type EleccionConDetalles = Eleccion & {
  registro?: {
    fechaRegistro: Date;
    compromiso: string;
    transaccion: string;
  } | null;
  partidos: {
    siglas: string;
    nombre: string;
    descripcion: string;
  }[];
};

export async function crearEleccion(data: EleccionData): Promise<Eleccion> {
  return prisma.eleccion.create({ data });
}

export async function obtenerEleccion(
  nombre: string, 
  votanteId?: string
): Promise<EleccionConDetalles | null> {
  return prisma.eleccion.findUnique({
    where: { nombre },
    include: {
      presentaciones: {
        include: {
          partido: true
        }
      },
      registros: votanteId ? {
        where: { votanteId },
        select: {
          fechaRegistro: true,
          compromiso: true,
          transaccion: true
        }
      } : false
    }
  }).then(eleccion => {
    if (!eleccion) return null;
    return {
      ...eleccion,
      registro: eleccion.registros?.[0] || null,
      partidos: eleccion.presentaciones.map(p => p.partido)
    };
  });
}

export async function listarElecciones(options?: {
  estado?: string;
  registrado?: boolean;
  votanteId?: string;
}): Promise<EleccionConDetalles[]> {
  const { estado, registrado, votanteId } = options || {};
  
  return prisma.eleccion.findMany({
    where: {
      ...(estado && { estado }),
      ...(registrado !== undefined && votanteId && {
        registros: registrado ? {
          some: { votanteId }
        } : {
          none: { votanteId }
        }
      })
    },
    include: {
      presentaciones: {
        include: {
          partido: true
        }
      },
      registros: votanteId ? {
        where: { votanteId },
        select: {
          fechaRegistro: true,
          compromiso: true,
          transaccion: true
        }
      } : false
    }
  }).then(elecciones => 
    elecciones.map(eleccion => ({
      ...eleccion,
      registro: eleccion.registros?.[0] || null,
      partidos: eleccion.presentaciones.map(p => p.partido)
    }))
  );
}

export async function actualizarEleccion(
  nombre: string,
  cambios: Partial<Omit<EleccionData, 'nombre'>>
): Promise<Eleccion> {
  return prisma.eleccion.update({
    where: { nombre },
    data: cambios
  });
}

export async function eliminarEleccion(nombre: string): Promise<Eleccion> {
  return prisma.eleccion.delete({
    where: { nombre }
  });
}

