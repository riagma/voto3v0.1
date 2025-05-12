import { Router } from 'express';
import { validarEsquema } from '../middlewares/validar';
import { autenticarUsuario } from '../middlewares/autenticacion';
import { votanteSchema, registroVotanteEleccionSchema } from '../schemas/schemas';
import {
  registrarUsuario,
  iniciarSesionUsuario,
  verPerfil,
  actualizarPerfil,
  eliminarPerfil,
  listarEleccionesDisponibles,
  inscribirEnEleccion,
  listarMisInscripciones,
} from '../controllers/controladorUsuario';

const rutasUsuario = Router();
rutasUsuario.post('/registrar', validarEsquema(votanteSchema), registrarUsuario);
rutasUsuario.post('/login', iniciarSesionUsuario);
rutasUsuario.get('/perfil', autenticarUsuario, verPerfil);
rutasUsuario.put('/perfil', autenticarUsuario, validarEsquema(votanteSchema), actualizarPerfil);
rutasUsuario.delete('/perfil', autenticarUsuario, eliminarPerfil);
rutasUsuario.get('/elecciones', autenticarUsuario, listarEleccionesDisponibles);
rutasUsuario.post('/eleccion/inscripcion', autenticarUsuario, validarEsquema(registroVotanteEleccionSchema), inscribirEnEleccion);
rutasUsuario.get('/inscripciones', autenticarUsuario, listarMisInscripciones);
export default rutasUsuario;
