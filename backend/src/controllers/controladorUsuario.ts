import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {
  crearVotante,
  obtenerVotantePorId,
  obtenerVotantePorDNI,
  listarVotantes,
  actualizarVotante,
  eliminarVotante,
} from '../services/servicioVotante';
import { listarEleccionesServicio } from '../services/servicioEleccion';
import {
  inscribirVotanteAEleccionServicio,
  listarInscripcionesServicio,
  actualizarInscripcionServicio,
  eliminarInscripcionServicio,
} from '../services/servicioRegistro';

const SECRETO_JWT = process.env.JWT_SECRET || 'super_secreto';

// Registro e inicio de sesión
export async function registrarUsuario(req: Request, res: Response) {
  try {
    const { id } = await crearVotante(req.body);
    res.status(201).json({ id });
  } catch (error: any) {
    if (error.code === 'P2002') return res.status(409).json({ error: 'DNI o correo ya en uso' });
    throw error;
  }
}

export async function iniciarSesionUsuario(req: Request, res: Response) {
  console.log('🛠️  LOGIN - req.body:', req.body);
  const { dni, password } = req.body;
  if (!dni || !password) return res.status(400).json({ error: 'Faltan credenciales' });
  const votante = await obtenerVotantePorDNI(dni);
  if (!votante) return res.status(404).json({ error: 'Usuario no encontrado' });
  if (!votante.hashContrasena) return res.status(401).json({ error: 'Credenciales inválidas' });
  const esValido = await bcrypt.compare(password, votante.hashContrasena);
  if (!esValido) return res.status(401).json({ error: 'Credenciales inválidas' });
  const token = jwt.sign({ id: votante.id }, SECRETO_JWT, { expiresIn: '8h' });
  res.json({ token });
}

// Perfil de usuario
export async function verPerfil(req: Request, res: Response) {
  const votante = (req as any).votante;
  res.json(votante);
}

export async function actualizarPerfil(req: Request, res: Response) {
  const id = (req as any).votante.id;
  const actualizado = await actualizarVotante(id, req.body);
  res.json(actualizado);
}

export async function eliminarPerfil(req: Request, res: Response) {
  const id = (req as any).votante.id;
  await eliminarVotante(id);
  res.status(204).send();
}

// Elecciones e inscripciones
export async function listarEleccionesDisponibles(req: Request, res: Response) {
  const elecciones = await listarEleccionesServicio();
  const ahora = new Date();
  res.json(elecciones.filter(e => e.fechaInicio <= ahora && e.fechaFin >= ahora));
}

export async function inscribirEnEleccion(req: Request, res: Response) {
  try {
    const registro = await inscribirVotanteAEleccionServicio({
      votanteId: (req as any).votante.id,
      eleccionId: req.body.eleccionId,
    });
    res.status(201).json(registro);
  } catch (error: any) {
    if (error.code === 'P2002') return res.status(409).json({ error: 'Ya inscrito en esta elección' });
    throw error;
  }
}

export async function listarMisInscripciones(req: Request, res: Response) {
  const lista = await listarInscripcionesServicio();
  res.json(lista.filter(r => r.votanteId === (req as any).votante.id));
}
