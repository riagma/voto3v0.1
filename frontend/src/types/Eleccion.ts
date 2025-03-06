import { z } from 'zod';

export const EleccionSchema = z.object({
  id: z.string(),
  titulo: z.string(),
  fechaCelebracion: z.string(),
  // Estado según la fecha: "pasada", "abierta" o "próxima"
  estadoFecha: z.enum(["pasada", "abierta", "próxima"]),
  // Estado según el usuario: puede estar ausente (opcional)
  estadoUsuario: z.enum(["votado", "registrable", "registrado", "cerrado", "no-censo"]).optional()
});

export type Eleccion = z.infer<typeof EleccionSchema>;

/**
 * Convierte y valida un JSON a un objeto de tipo Eleccion.
 * Si la validación falla, se lanza un ZodError con detalles.
 */
export function convertirEleccion(json: unknown): Eleccion {
  return EleccionSchema.parse(json);
}
