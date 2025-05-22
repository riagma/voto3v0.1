import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rutasUsuario from './routes/rutasUsuario';
import rutasAdmin from './routes/rutasAdmin';

const environment = process.env.NODE_ENV || 'development';
const envFile = environment === 'production' ? '.env.production' : '.env.development';

// Carga de variables
dotenv.config({ path: envFile });

console.log(`🌐 Entorno actual: ${environment}`);
console.log(`📌 Variables cargadas desde: ${envFile}`);


const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));  // o '*' en desarrollo

// Registrar rutas
app.use('/api', rutasUsuario);
app.use('/api/admin', rutasAdmin);

const PUERTO = process.env.PORT || 3000;
app.listen(PUERTO, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PUERTO}`);
});


