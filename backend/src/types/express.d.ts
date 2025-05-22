import { Votante } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      votante: Votante; // Votante será requerido, no opcional
    }
  }
}

export {};