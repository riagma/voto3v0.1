import { Router } from 'express';
import { validarEsquema } from '../middlewares/validar';
import { autenticarAdmin } from '../middlewares/autenticacion';
import {
  eleccionSchema,
  partidoSchema,
} from '../schemas/schemas';
import {
  iniciarSesionAdministrador,
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
  obtenerVotante,
  listarVotantesDeEleccion,
  listarPartidosDeEleccion,
} from '../controllers/controladorAdmin';

const rutasAdmin = Router();

// Autenticación
rutasAdmin.post('/login', iniciarSesionAdministrador);

// Elecciones
rutasAdmin.post('/elecciones', autenticarAdmin, validarEsquema(eleccionSchema), crearEleccion);
rutasAdmin.get('/elecciones/:nombre', autenticarAdmin, obtenerEleccion);
rutasAdmin.get('/elecciones', autenticarAdmin, listarElecciones);
rutasAdmin.put('/elecciones/:nombre', autenticarAdmin, validarEsquema(eleccionSchema), actualizarEleccion);
rutasAdmin.delete('/elecciones/:nombre', autenticarAdmin, eliminarEleccion);

// Partidos
rutasAdmin.post('/partidos', autenticarAdmin, validarEsquema(partidoSchema), crearPartido);
rutasAdmin.get('/partidos/:siglas', autenticarAdmin, obtenerPartido);
rutasAdmin.get('/partidos', autenticarAdmin, listarPartidos);
rutasAdmin.put('/partidos/:siglas', autenticarAdmin, validarEsquema(partidoSchema), actualizarPartido);
rutasAdmin.delete('/partidos/:siglas', autenticarAdmin, eliminarPartido);

// Listados especiales
rutasAdmin.get('/elecciones/:nombre/partidos', autenticarAdmin, listarPartidosDeEleccion);
rutasAdmin.get('/elecciones/:nombre/votantes', autenticarAdmin, listarVotantesDeEleccion);

// Votantes
rutasAdmin.get('/votantes/:dni', autenticarAdmin, obtenerVotante);

export default rutasAdmin;