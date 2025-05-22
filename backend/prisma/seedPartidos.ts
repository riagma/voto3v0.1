import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/es';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const args = process.argv.slice(2);
const cantidad = args[0] ? parseInt(args[0], 10) : 100;
if (isNaN(cantidad) || cantidad <= 0) {
  console.error(`Cantidad inválida: ${args[0]}`);
  process.exit(1);
}

async function main() {
  // Borra todos los datos existentes
  await prisma.partido.deleteMany({});
  console.log('Tabla vaciada. Iniciando seed...');

  // Crear partidos políticos
  const partidos = [
    {
      nombre: 'Partido Progreso Democrático',
      siglas: 'PPD',
      descripcion: 'Partido centrado en el desarrollo sostenible y la innovación social'
    },
    {
      nombre: 'Unión Liberal Reformista',
      siglas: 'ULR',
      descripcion: 'Partido enfocado en reformas económicas y libertades individuales'
    },
    {
      nombre: 'Alianza Verde Ciudadana',
      siglas: 'AVC',
      descripcion: 'Partido comprometido con la protección del medio ambiente'
    },
    {
      nombre: 'Movimiento Solidario Nacional',
      siglas: 'MSN',
      descripcion: 'Partido centrado en políticas sociales y bienestar comunitario'
    }
  ];

  for (const partido of partidos) {
    await prisma.partido.create({
      data: partido
    });
  }
  
  // Mostrar partidos creados
  const partidosCreados = await prisma.partido.findMany();
  console.log('\nPartidos creados:');
  partidosCreados.forEach(p => {
    console.log(`- ${p.nombre} (${p.siglas})`);
  });

  console.log('\n✅ Seed de partidos completado');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });