import { Request, Response } from 'express';
import {
  crearEleccionServicio,
  obtenerEleccionPorId,
  listarEleccionesServicio,
  actualizarEleccionServicio,
  eliminarEleccionServicio,
} from '../services/servicioEleccion';
import {
  crearPartidoServicio,
  obtenerPartidoPorId,
  listarPartidosServicio,
  actualizarPartidoServicio,
  eliminarPartidoServicio,
} from '../services/servicioPartido';
import {
  asignarPartidoAEleccionServicio,
  listarPartidosPorEleccionServicio,
  eliminarAsignacionPartido,
} from '../services/servicioPartidoEleccion';
import {
  listarInscripcionesServicio,
  actualizarInscripcionServicio,
  eliminarInscripcionServicio,
} from '../services/servicioRegistro';
import {
  listarVotantes,
  obtenerVotantePorId,
  actualizarVotante,
  eliminarVotante,
} from '../services/servicioVotante';

// CRUD Elecciones
export async function crearEleccion(req: Request, res: Response) {
  const eleccion = await crearEleccionServicio(req.body);
  res.status(201).json(eleccion);
}
export async function obtenerEleccion(req: Request, res: Response) {
  const eleccion = await obtenerEleccionPorId(req.params.id);
  if (!eleccion) return res.status(404).json({ error: 'Elección no encontrada' });
  res.json(eleccion);
}
export async function listarElecciones(req: Request, res: Response) {
  const elecciones = await listarEleccionesServicio();
  res.json(elecciones);
}
export async function actualizarEleccion(req: Request, res: Response) {
  const eleccion = await actualizarEleccionServicio(req.params.id, req.body);
  res.json(eleccion);
}
export async function eliminarEleccion(req: Request, res: Response) {
  await eliminarEleccionServicio(req.params.id);
  res.status(204).send();
}

// CRUD Partidos
export async function crearPartido(req: Request, res: Response) {
  const partido = await crearPartidoServicio(req.body);
  res.status(201).json(partido);
}
export async function obtenerPartido(req: Request, res: Response) {
  const partido = await obtenerPartidoPorId(req.params.id);
  if (!partido) return res.status(404).json({ error: 'Partido no encontrado' });
  res.json(partido);
}
export async function listarPartidos(req: Request, res: Response) {
  const partidos = await listarPartidosServicio();
  res.json(partidos);
}
export async function actualizarPartido(req: Request, res: Response) {
  const partido = await actualizarPartidoServicio(req.params.id, req.body);
  res.json(partido);
}
export async function eliminarPartido(req: Request, res: Response) {
  await eliminarPartidoServicio(req.params.id);
  res.status(204).send();
}

// CRUD Asignación Partido-Elección
export async function asignarPartido(req: Request, res: Response) {
  const asignacion = await asignarPartidoAEleccionServicio(req.body);
  res.status(201).json(asignacion);
}
export async function listarPartidosDeEleccion(req: Request, res: Response) {
  const lista = await listarPartidosPorEleccionServicio(req.params.eleccionId);
  res.json(lista);
}
export async function eliminarAsignacion(req: Request, res: Response) {
  await eliminarAsignacionPartido(req.params.id);
  res.status(204).send();
}

// CRUD Inscripciones (Admin)
export async function listarInscripciones(req: Request, res: Response) {
  const lista = await listarInscripcionesServicio();
  res.json(lista);
}
export async function actualizarInscripcion(req: Request, res: Response) {
  const insc = await actualizarInscripcionServicio(req.params.id, req.body);
  res.json(insc);
}
export async function eliminarInscripcion(req: Request, res: Response) {
  await eliminarInscripcionServicio(req.params.id);
  res.status(204).send();
}

// CRUD Votantes (Admin)
export async function listarTodosVotantes(req: Request, res: Response) {
  const lista = await listarVotantes();
  res.json(lista);
}
export async function obtenerVotanteAdmin(req: Request, res: Response) {
  const votante = await obtenerVotantePorId(req.params.id);
  if (!votante) return res.status(404).json({ error: 'Votante no encontrado' });
  res.json(votante);
}
export async function actualizarVotanteAdmin(req: Request, res: Response) {
  const votante = await actualizarVotante(req.params.id, req.body);
  res.json(votante);
}
export async function eliminarVotanteAdmin(req: Request, res: Response) {
  await eliminarVotante(req.params.id);
  res.status(204).send();
}
