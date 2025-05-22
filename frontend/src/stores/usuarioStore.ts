import { create } from 'zustand'

interface Votante {
  dni: string;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  correoElectronico: string;
}

interface UsuarioEstado {
  token: string | null;
  votante: Votante | null;
  estaAutenticado: boolean;
  login: (token: string, votante: Votante) => void;
  logout: () => void;
}

export const useUsuarioStore = create<UsuarioEstado>((set) => ({
  token: null,
  votante: null,
  estaAutenticado: false,
  login: (token: string, votante: Votante) => 
    set({ token, votante, estaAutenticado: true }),
  logout: () => 
    set({ token: null, votante: null, estaAutenticado: false }),
}));