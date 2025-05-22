import { useUsuarioStore } from '../stores/usuarioStore';
import api from './api';

interface LoginCredentials {
  dni: string;
  contrasena: string;
}

interface LoginResponse {
  token: string;
  votante: {
    dni: string;
    nombre: string;
    primerApellido: string;
    segundoApellido: string;
    correoElectronico: string;
  };
}

export async function iniciarSesion({ dni, contrasena }: LoginCredentials): Promise<void> {
  try {
    const data: LoginResponse = await api.post('/login', { dni, contrasena });
    useUsuarioStore.getState().login(data.token, data.votante);
  } catch (error) {
    throw new Error('Error al iniciar sesión: ' + (error as Error).message);
  }
}

export function cerrarSesion(): void {
  useUsuarioStore.getState().logout();
}

export function obtenerToken(): string | null {
  return useUsuarioStore.getState().token;
}

export function obtenerVotante() {
  return useUsuarioStore.getState().votante;
}

export function estaAutenticado(): boolean {
  return useUsuarioStore.getState().estaAutenticado;
}