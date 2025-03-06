import { z } from 'zod';

export const eleccionSchema = z.object({
  id: z.string().uuid(),
  titulo: z.string().min(1),
  descripcion: z.string(),
  fechaInicio: z.string().datetime(),
  fechaFin: z.string().datetime(),
  candidatos: z.array(z.string())
});

export type Eleccion = z.infer<typeof eleccionSchema>;
