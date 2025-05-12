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

async function main() {
  // Borra todos los votantes antes de crear nuevos
  await prisma.votante.deleteMany({});
  console.log(`Tabla vaciada. Iniciando seed para ${cantidad} votantes...`);


  console.log(`Iniciando seed para ${cantidad} votantes...`);
  for (let i = 0; i < cantidad; i++) {
    const nombre = faker.person.firstName();
    const primerApellido = faker.person.lastName();
    const segundoApellido = faker.person.lastName();
    // Generar DNI español: 8 dígitos + letra
    const numeroDNI = faker.number.int({ min: 0, max: 99999999 }).toString().padStart(8, '0');
    const letraDNI = faker.helpers.arrayElement(['T','R','W','A','G','M','Y','F','P','D','X','B','N','J','Z','S','Q','V','H','L','C','K','E']);
    const dni = `${numeroDNI}${letraDNI}`;
 // const correo = faker.internet.email();
    const correo = `${nombre.toLowerCase()}.${primerApellido.toLowerCase()}.${segundoApellido.toLowerCase()}@fake.com`;
 
    const password = 'Password123!'; // Contraseña por defecto para seeding
    const hashContrasena = await bcrypt.hash(password, 10);

    await prisma.votante.create({
      data: {
        nombre,
        primerApellido,
        segundoApellido,
        dni,
        correo,
        hashContrasena,
      },
    });
  }
  console.log(`✅ Seed completado: ${cantidad} votantes creados.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
