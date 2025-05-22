import { Router } from 'express';
import { validarEsquema } from '../middlewares/validar';
import { autenticarUsuario } from '../middlewares/autenticacion';
import { 
  votanteSchema, 
  registroVotanteEleccionSchema,
  contrasenaSchema 
} from '../schemas/schemas';
import {
  iniciarSesionUsuario,
  obtenerVotante,
  actualizarVotante,
  actualizarContrasena,
  listarEleccionesDisponibles,
  listarMisElecciones,
  registrarEnEleccion,
  obtenerRegistroEleccion
} from '../controllers/controladorUsuario';

const rutasUsuario = Router();

// Rutas públicas
rutasUsuario.post('/login', iniciarSesionUsuario);

// Rutas protegidas - Votante
rutasUsuario.get('/votante', autenticarUsuario, obtenerVotante);
rutasUsuario.put('/votante', autenticarUsuario, validarEsquema(votanteSchema), actualizarVotante);
rutasUsuario.put('/votante/contrasena', autenticarUsuario, validarEsquema(contrasenaSchema), actualizarContrasena);

// Rutas protegidas - Elecciones
rutasUsuario.get('/elecciones/disponibles', autenticarUsuario, listarEleccionesDisponibles);
rutasUsuario.get('/elecciones/mis-elecciones', autenticarUsuario, listarMisElecciones);

// Rutas protegidas - Registros en elecciones
rutasUsuario.post('/elecciones/:id/registro', 
  autenticarUsuario, 
  validarEsquema(registroVotanteEleccionSchema), 
  registrarEnEleccion
);
rutasUsuario.get('/elecciones/:id/registro', 
  autenticarUsuario, 
  obtenerRegistroEleccion
);

export default rutasUsuario;
