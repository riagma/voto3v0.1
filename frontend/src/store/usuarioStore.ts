// src/store/usuarioStore.ts
import { create } from 'zustand';
import type { UsuarioLocal } from '../types/UsuarioLocal';

interface UsuarioStore {
  usuario: UsuarioLocal | null;
  setUsuario: (usuario: UsuarioLocal | null) => void;
}

const useUsuarioStore = create<UsuarioStore>((set) => ({
  usuario: null,
  setUsuario: (usuario) => set({ usuario }),
}));

export default useUsuarioStore;
