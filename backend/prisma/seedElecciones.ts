import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/es';
import { addDays, subDays } from 'date-fns';

const prisma = new PrismaClient();

async function main() {
  // Limpiar la base de datos
  await prisma.eleccion.deleteMany({});
  
  const hoy = new Date();
  
  // Elecciones de ejemplo
  const elecciones = [
    {
      // Elección pasada
      nombre: "Elecciones Generales 2024",
      fechaInicioRegistro: subDays(hoy, 60),
      fechaFinRegistro: subDays(hoy, 45),
      fechaInicioVotacion: subDays(hoy, 30),
      fechaFinVotacion: subDays(hoy, 29),
      fechaCelebracion: subDays(hoy, 29),
      estado: "cerrada"
    },
    {
      // Elección en periodo de registro
      nombre: "Elecciones Municipales 2025",
      fechaInicioRegistro: subDays(hoy, 5),
      fechaFinRegistro: addDays(hoy, 10),
      fechaInicioVotacion: addDays(hoy, 15),
      fechaFinVotacion: addDays(hoy, 16),
      fechaCelebracion: addDays(hoy, 16),
      estado: "registro"
    },
    {
      // Elección en periodo de votación
      nombre: "Referendum Constitucional 2025",
      fechaInicioRegistro: subDays(hoy, 15),
      fechaFinRegistro: subDays(hoy, 5),
      fechaInicioVotacion: subDays(hoy, 1),
      fechaFinVotacion: addDays(hoy, 1),
      fechaCelebracion: addDays(hoy, 1),
      estado: "votación"
    },
    {
      // Elección futura
      nombre: "Elecciones Autonómicas 2025",
      fechaInicioRegistro: addDays(hoy, 30),
      fechaFinRegistro: addDays(hoy, 45),
      fechaInicioVotacion: addDays(hoy, 60),
      fechaFinVotacion: addDays(hoy, 61),
      fechaCelebracion: addDays(hoy, 61),
      estado: "borrador"
    }
  ];

  for (const eleccion of elecciones) {
    await prisma.eleccion.create({
      data: eleccion
    });
  }
  
  console.log('✅ Seed de elecciones completado');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });