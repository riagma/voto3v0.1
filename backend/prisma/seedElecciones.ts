import { PrismaClient } from '@prisma/client';
import { addDays, subDays } from 'date-fns';

const prisma = new PrismaClient();

// Estados válidos para una elección
type EstadoEleccion = 'borrador' | 'registro' | 'votacion' | 'cerrada';

async function main() {
  // Limpiar la base de datos
  await prisma.eleccion.deleteMany({});
  console.log('Tabla vaciada. Iniciando seed...');
  
  const hoy = new Date();
  
  // Elecciones de ejemplo
  const elecciones = [
    {
      nombre: "Elecciones Generales 2024",
      fechaInicioRegistro: subDays(hoy, 60),
      fechaFinRegistro: subDays(hoy, 45),
      fechaInicioVotacion: subDays(hoy, 30),
      fechaFinVotacion: subDays(hoy, 29),
      fechaCelebracion: subDays(hoy, 29),
      estado: "cerrada" as EstadoEleccion
    },
    {
      nombre: "Elecciones Municipales 2025",
      fechaInicioRegistro: subDays(hoy, 5),
      fechaFinRegistro: addDays(hoy, 10),
      fechaInicioVotacion: addDays(hoy, 15),
      fechaFinVotacion: addDays(hoy, 16),
      fechaCelebracion: addDays(hoy, 16),
      estado: "registro" as EstadoEleccion
    },
    {
      nombre: "Referendum Constitucional 2025",
      fechaInicioRegistro: subDays(hoy, 15),
      fechaFinRegistro: subDays(hoy, 5),
      fechaInicioVotacion: subDays(hoy, 1),
      fechaFinVotacion: addDays(hoy, 1),
      fechaCelebracion: addDays(hoy, 1),
      estado: "votacion" as EstadoEleccion
    },
    {
      nombre: "Elecciones Autonómicas 2025",
      fechaInicioRegistro: addDays(hoy, 30),
      fechaFinRegistro: addDays(hoy, 45),
      fechaInicioVotacion: addDays(hoy, 60),
      fechaFinVotacion: addDays(hoy, 61),
      fechaCelebracion: addDays(hoy, 61),
      estado: "borrador" as EstadoEleccion
    }
  ];

  for (const eleccion of elecciones) {
    const eleccionCreada = await prisma.eleccion.create({
      data: eleccion
    });
    console.log(`Creada elección "${eleccionCreada.nombre}" con ID ${eleccionCreada.id}`);
  }
  
  console.log('\n✅ Seed de elecciones completado');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });