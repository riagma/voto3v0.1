import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppError, handleError } from '../utils/errors';
import * as servicioVotante from '../services/servicioVotante';
import * as servicioEleccion from '../services/servicioEleccion';
import * as servicioRegistro from '../services/servicioRegistro';

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

// Autenticación y registro
export const iniciarSesionUsuario = controladorWrapper(async (req: Request, res: Response) => {
  const { dni, contrasena } = req.body;
  if (!dni || !contrasena) {
    throw new AppError(400, 'Faltan credenciales');
  }
  
  const votante = await servicioVotante.validarCredenciales({ dni, contrasena });
  const token = jwt.sign({ dni: votante.dni }, SECRETO_JWT, { expiresIn: '8h' });
  res.json({ token });
});

// Autenticación
export const validarCredenciales = controladorWrapper(async (req: Request, res: Response) => {
  const { dni, contrasena } = req.body;
  if (!dni || !contrasena) {
    throw new AppError(400, 'Faltan credenciales');
  }
  
  const votante = await servicioVotante.validarCredenciales({ dni, contrasena });
  const token = jwt.sign({ dni: votante.dni }, SECRETO_JWT, { expiresIn: '8h' });
  res.json({ token });
});

// Perfil de votante
export const obtenerVotante = controladorWrapper(async (req: Request, res: Response) => {
  const { votante } = req;
  res.json(votante);
});

export const actualizarVotante = controladorWrapper(async (req: Request, res: Response) => {
  const votante = await servicioVotante.actualizarVotante(
    req.votante.dni,
    req.body
  );
  res.json(votante);
});

export const actualizarContrasena = controladorWrapper(async (req: Request, res: Response) => {
  const { contrasenaActual, nuevaContrasena } = req.body;

  // Validar la contraseña actual antes de actualizar
  await servicioVotante.validarCredenciales({
    dni: req.votante.dni,
    contrasena: contrasenaActual
  });

  await servicioVotante.actualizarContrasena(
    req.votante.dni,
    nuevaContrasena
  );

  res.status(204).send();
});

export const eliminarVotante = controladorWrapper(async (req: Request, res: Response) => {
  await servicioVotante.eliminarVotante(req.votante.dni);
  res.status(204).send();
});

// Elecciones
export const listarEleccionesDisponibles = controladorWrapper(async (req: Request, res: Response) => {
  const elecciones = await servicioEleccion.listarElecciones({
    estado: 'registro',
    registrado: false,
    votanteId: req.votante.dni
  });
  res.json(elecciones);
});

export const listarMisElecciones = controladorWrapper(async (req: Request, res: Response) => {
  const elecciones = await servicioEleccion.listarElecciones({
    registrado: true,
    votanteId: req.votante.dni
  });
  res.json(elecciones);
});

// Registros en elecciones
export const registrarEnEleccion = controladorWrapper(async (req: Request, res: Response) => {
  const registro = await servicioRegistro.registrarVotanteEleccion({
    votanteId: req.votante.dni,
    eleccionId: req.params.nombre,
    ...req.body
  });
  res.status(201).json(registro);
});

export const obtenerRegistroEleccion = controladorWrapper(async (req: Request, res: Response) => {
  const registro = await servicioRegistro.obtenerRegistroVotanteEleccion(
    req.votante.dni,
    parseInt(req.params.nombre, 10)
  );
  
  if (!registro) {
    throw new AppError(404, 'Registro no encontrado');
  }
  
  res.json(registro);
});
