import { z } from 'zod';

export const detalleEleccionSchema = z.object({
  id: z.string().uuid(),
  titulo: z.string().min(3),
  descripcion: z.string(),
  fechaInicio: z.string().datetime(),
  fechaFin: z.string().datetime(),
  candidatos: z.array(z.string().min(1)),
  estado: z.enum(['abierta', 'concluida']),
  estadoUsuario: z.enum(['votado', 'registrable', 'registrado', 'cerrado', 'no-censo']).optional(),
});

export type DetalleEleccionSchema = z.infer<typeof detalleEleccionSchema>;
