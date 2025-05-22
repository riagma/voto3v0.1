import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as servicioAdmin from '../services/servicioAdministrador';
import * as servicioEleccion from '../services/servicioEleccion';
import * as servicioPartido from '../services/servicioPartido';
import { listarPartidosEleccion } from '../services/servicioPartidoEleccion';
import { listarVotantesEleccion } from '../services/servicioRegistro';
import * as servicioVotante from '../services/servicioVotante';
import { AppError, handleError } from '../utils/errors';

const SECRETO_JWT = process.env.JWT_SECRET || 'super_secreto';

const controladorWrapper = (fn: (req: Request, res: Response) => Promise<void>) => {
  return async (req: Request, res: Response) => {
    try {
      await fn(req, res);
    } catch (error) {
      const { statusCode, message } = handleError(error);
      res.status(statusCode).json({ error: message });
    }
  };
};

// Administrador
export const iniciarSesionAdministrador = controladorWrapper(async (req: Request, res: Response) => {
  const admin = await servicioAdmin.validarCredenciales(req.body);
  const token = jwt.sign({ correo: admin.correo }, SECRETO_JWT, { expiresIn: '24h' });
  res.json({ token });
});

// CRUD Elecciones
export const crearEleccion = controladorWrapper(async (req: Request, res: Response) => {
  const eleccion = await servicioEleccion.crearEleccion(req.body);
  res.status(201).json(eleccion);
});

export const obtenerEleccion = controladorWrapper(async (req: Request, res: Response) => {
  const eleccion = await servicioEleccion.obtenerEleccion(req.params.nombre);
  if (!eleccion) throw new AppError(404, 'Elección no encontrada');
  res.json(eleccion);
});

export const listarElecciones = controladorWrapper(async (req: Request, res: Response) => {
  const elecciones = await servicioEleccion.listarElecciones();
  res.json(elecciones);
});

export const actualizarEleccion = controladorWrapper(async (req: Request, res: Response) => {
  const eleccion = await servicioEleccion.actualizarEleccion(req.params.nombre, req.body);
  res.json(eleccion);
});

export const eliminarEleccion = controladorWrapper(async (req: Request, res: Response) => {
  await servicioEleccion.eliminarEleccion(req.params.nombre);
  res.status(204).send();
});

// CRUD Partidos
export const crearPartido = controladorWrapper(async (req: Request, res: Response) => {
  const partido = await servicioPartido.crearPartido(req.body);
  res.status(201).json(partido);
});

export const obtenerPartido = controladorWrapper(async (req: Request, res: Response) => {
  const partido = await servicioPartido.obtenerPartido(req.params.siglas);
  if (!partido) throw new AppError(404, 'Partido no encontrado');
  res.json(partido);
});

export const listarPartidos = controladorWrapper(async (req: Request, res: Response) => {
  const partidos = await servicioPartido.listarPartidos();
  res.json(partidos);
});

export const actualizarPartido = controladorWrapper(async (req: Request, res: Response) => {
  const partido = await servicioPartido.actualizarPartido(req.params.siglas, req.body);
  res.json(partido);
});

export const eliminarPartido = controladorWrapper(async (req: Request, res: Response) => {
  await servicioPartido.eliminarPartido(req.params.siglas);
  res.status(204).send();
});

// Gestión de Votantes
export const obtenerVotante = controladorWrapper(async (req: Request, res: Response) => {
  const votante = await servicioVotante.obtenerVotante(req.params.dni);
  if (!votante) throw new AppError(404, 'Votante no encontrado');
  res.json(votante);
});

// Listados especiales
export const listarVotantesDeEleccion = controladorWrapper(async (req: Request, res: Response) => {
  const votantes = await listarVotantesEleccion(req.params.nombre);
  res.json(votantes);
});

export const listarPartidosDeEleccion = controladorWrapper(async (req: Request, res: Response) => {
  const partidos = await listarPartidosEleccion(req.params.nombre);
  res.json(partidos);
});
