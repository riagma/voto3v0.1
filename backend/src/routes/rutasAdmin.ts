import { Router } from 'express';
import { validarEsquema } from '../middlewares/validar';
import { autenticarAdmin } from '../middlewares/autenticacion';
import {
  eleccionSchema,
  partidoSchema,
  partidoEleccionSchema,
  registroVotanteEleccionSchema,
  votanteSchema,
} from '../schemas/schemas';
import {
  crearEleccion,
  obtenerEleccion,
  listarElecciones,
  actualizarEleccion,
  eliminarEleccion,
  crearPartido,
  obtenerPartido,
  listarPartidos,
  actualizarPartido,
  eliminarPartido,
  asignarPartido,
  listarPartidosDeEleccion,
  eliminarAsignacion,
  listarInscripciones,
  actualizarInscripcion,
  eliminarInscripcion,
  listarTodosVotantes,
  obtenerVotanteAdmin,
  actualizarVotanteAdmin,
  eliminarVotanteAdmin,
} from '../controllers/controladorAdmin';

const rutasAdmin = Router();
// Elecciones
rutasAdmin.post('/eleccion', autenticarAdmin, validarEsquema(eleccionSchema), crearEleccion);
rutasAdmin.get('/eleccion/:id', autenticarAdmin, obtenerEleccion);
rutasAdmin.get('/elecciones', autenticarAdmin, listarElecciones);
rutasAdmin.put('/eleccion/:id', autenticarAdmin, validarEsquema(eleccionSchema), actualizarEleccion);
rutasAdmin.delete('/eleccion/:id', autenticarAdmin, eliminarEleccion);
// Partidos
rutasAdmin.post('/partido', autenticarAdmin, validarEsquema(partidoSchema), crearPartido);
rutasAdmin.get('/partido/:id', autenticarAdmin, obtenerPartido);
rutasAdmin.get('/partidos', autenticarAdmin, listarPartidos);
rutasAdmin.put('/partido/:id', autenticarAdmin, validarEsquema(partidoSchema), actualizarPartido);
rutasAdmin.delete('/partido/:id', autenticarAdmin, eliminarPartido);
// Asignaciones Partido-Elección
rutasAdmin.post('/partido/eleccion', autenticarAdmin, validarEsquema(partidoEleccionSchema), asignarPartido);
rutasAdmin.get('/partido/eleccion/:eleccionId', autenticarAdmin, listarPartidosDeEleccion);
rutasAdmin.delete('/partido/eleccion/:id', autenticarAdmin, eliminarAsignacion);
// Inscripciones
rutasAdmin.get('/inscripciones', autenticarAdmin, listarInscripciones);
rutasAdmin.put('/inscripcion/:id', autenticarAdmin, validarEsquema(registroVotanteEleccionSchema), actualizarInscripcion);
rutasAdmin.delete('/inscripcion/:id', autenticarAdmin, eliminarInscripcion);
// Votantes
rutasAdmin.get('/votantes', autenticarAdmin, listarTodosVotantes);
rutasAdmin.get('/votante/:id', autenticarAdmin, obtenerVotanteAdmin);
rutasAdmin.put('/votante/:id', autenticarAdmin, validarEsquema(votanteSchema), actualizarVotanteAdmin);
rutasAdmin.delete('/votante/:id', autenticarAdmin, eliminarVotanteAdmin);

export default rutasAdmin;