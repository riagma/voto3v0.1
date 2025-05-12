/**
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import eleccionesRoutes from './routes/elecciones';
import detalleRoutes from './routes/detalleEleccion';
import authRoutes from './routes/autenticacion';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/elecciones', eleccionesRoutes);
app.use('/api/detalleEleccion', detalleRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
*/

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
app.use(cors());

// Registrar rutas
app.use('/usuario', rutasUsuario);
app.use('/admin', rutasAdmin);

const PUERTO = process.env.PORT || 3000;
app.listen(PUERTO, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PUERTO}`);
});


