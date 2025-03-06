import { z } from 'zod';

export const autenticacionSchema = z.object({
  nif: z
    .string()
    .regex(/^[0-9]{8}[A-Za-z]$/, { message: 'NIF debe tener formato válido (8 números y 1 letra).' }),
  clave: z.string().min(6, { message: 'La clave debe tener al menos 6 caracteres.' }),
});

export type AutenticacionSchema = z.infer<typeof autenticacionSchema>;
