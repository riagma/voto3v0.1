// src/schemas.ts
import { z } from "zod";

// Enumerado para los estados de una elección
enum EstadoEleccion {
  BORRADOR = "borrador",
  ABIERTA  = "abierta",
  CERRADA  = "cerrada",
}

// Esquema para Votante
export const votanteSchema = z.object({
  id:               z.string().uuid(),
  nombre:           z.string().min(1, { message: "El nombre es obligatorio" }),
  primerApellido:   z.string().min(1, { message: "El primer apellido es obligatorio" }),
  segundoApellido:  z.string().min(1, { message: "El segundo apellido es obligatorio" }),
  dni:              z.string().length(9, { message: "El DNI debe tener 9 caracteres" }),
  correo:           z.string().email().optional(),
  hashContrasena:   z.string().min(60, { message: "Hash de contraseña inválido" }).optional(),
  registradoEn:     z.string().refine((d) => !isNaN(Date.parse(d)), { message: "Fecha inválida" }),
});

// Esquema para Elección
export const eleccionSchema = z.object({
  id:           z.string().uuid(),
  nombre:       z.string().min(1, { message: "El nombre de la elección es obligatorio" }),
  fechaInicio:  z.string().refine((d) => !isNaN(Date.parse(d)), { message: "Fecha de inicio inválida" }),
  fechaFin:     z.string().refine((d) => !isNaN(Date.parse(d)), { message: "Fecha de fin inválida" }),
  estado:       z.nativeEnum(EstadoEleccion, { message: "Estado de elección inválido" }),
});

// Esquema para Partido
export const partidoSchema = z.object({
  id:       z.string().uuid(),
  nombre:   z.string().min(1, { message: "El nombre del partido es obligatorio" }),
  siglas:   z.string().min(1, { message: "Las siglas son obligatorias" }),
  logoUrl:  z.string().url().optional(),
});

// Esquema para PartidoElección (asignación de partido a elección)
export const partidoEleccionSchema = z.object({
  id:        z.string().uuid(),
  partidoId: z.string().uuid(),
  eleccionId:z.string().uuid(),
});

// Esquema para RegistroVotanteElección (inscripción de votante en elección)
export const registroVotanteEleccionSchema = z.object({
  id:             z.string().uuid(),
  votanteId:      z.string().uuid(),
  eleccionId:     z.string().uuid(),
  fechaRegistro:  z.string().refine((d) => !isNaN(Date.parse(d)), { message: "Fecha de registro inválida" }),
});

// Esquema para Votante
export const administradorSchema = z.object({
  correo:           z.string().email("Debe ser un email válido"),
  hashContrasena:   z.string().min(60, { message: "Hash de contraseña inválido" }),
});

export { EstadoEleccion };
