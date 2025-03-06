// src/types/DetalleEleccion.ts
import { z } from 'zod';

export const DetalleEleccionSchema = z.object({
  id: z.string(),
  titulo: z.string(),
  descripcion: z.string(),
  fechaInicio: z.string(),
  fechaFin: z.string(),
  candidatos: z.array(z.string()),
  estado: z.enum(["abierta", "concluida"]),
  estadoUsuario: z.enum(["votado", "registrable", "registrado", "cerrado", "no-censo"]).optional(),
});

export type DetalleEleccion = z.infer<typeof DetalleEleccionSchema>;

export function convertirDetalleEleccion(json: unknown): DetalleEleccion {
  return DetalleEleccionSchema.parse(json);
}
