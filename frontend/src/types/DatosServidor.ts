// src/types/DatosServidor.ts
import { z } from 'zod';

// Definición del esquema con Zod
export const DatosServidorSchema = z.object({
  idUnico: z.string(),
  nif: z.string(),
  clave: z.string()
  // Puedes agregar más campos si fuera necesario
});

// Tipo derivado del esquema
export type DatosServidor = z.infer<typeof DatosServidorSchema>;

/**
 * Convierte y valida un objeto JSON a DatosServidor.
 * Si la validación falla, lanza un ZodError.
 */
export function convertirDatosServidor(json: unknown): DatosServidor {
  return DatosServidorSchema.parse(json);
}
