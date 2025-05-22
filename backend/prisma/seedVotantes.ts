import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/es';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Obtener número de votantes desde línea de comandos: ts-node prisma/seed.ts <cantidad>
const args = process.argv.slice(2);
const cantidad = args[0] ? parseInt(args[0], 10) : 100;
if (isNaN(cantidad) || cantidad <= 0) {
  console.error(`Cantidad inválida: ${args[0]}`);
  process.exit(1);
}

// Función para normalizar texto (quitar tildes y caracteres especiales)
function normalizeText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Eliminar tildes
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_'); // Reemplazar caracteres especiales por guión bajo
}

async function main() {
  // Borra todos los votantes antes de crear nuevos
  await prisma.votante.deleteMany({});
  console.log(`Tabla vaciada. Iniciando seed para ${cantidad} votantes...`);
  
  for (let i = 0; i < cantidad; i++) {
    const nombre = faker.person.firstName();
    const apellidos = faker.person.lastName().split(' ');
    const primerApellido = apellidos[0];
    const segundoApellido = apellidos[1] || faker.person.lastName(); // Asegurar segundo apellido

    // Formatear nombre y apellidos para el correo
    const nombreEmail = normalizeText(nombre);
    const apellidosEmail = `${normalizeText(primerApellido)}.${normalizeText(segundoApellido)}`;
    const correoElectronico = `${nombreEmail}.${apellidosEmail}@fake.com`;

    // Generar DNI español: 8 dígitos + letra
    const numeroDNI = faker.number.int({ min: 0, max: 99999999 }).toString().padStart(8, '0');
    const letraDNI = faker.helpers.arrayElement(['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E']);
    const dni = `${numeroDNI}${letraDNI}`;

    // Generar correo y contraseña siempre
    const password = 'Password123!'; // Contraseña por defecto para seeding
    const hashContrasena = await bcrypt.hash(password, 10);

    await prisma.votante.create({
      data: {
        dni,
        nombre,
        primerApellido,
        segundoApellido,
        correoElectronico,
        hashContrasena,
      },
    });
  }
  console.log(`✅ Seed completado: ${cantidad} votantes creados.`);

  // Mostrar algunos ejemplos de votantes creados
  const ejemplos = await prisma.votante.findMany({ take: 5 });
  console.log('\nEjemplos de votantes creados:');
  ejemplos.forEach(v => {
    console.log(`- ${v.nombre} ${v.primerApellido} (${v.dni}) - ${v.correoElectronico}`);
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
