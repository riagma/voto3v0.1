import { api } from './api';

export interface RegistroEleccion {
  eleccionId: number;
  votanteId: string;
  compromiso: string;
  datosPrivados?: string;
}

export interface RegistroResponse {
  eleccionId: number;
  votanteId: string;
  fechaRegistro: Date;
  compromiso: string;
  transaccion: string;
}

export const registrarEnEleccion = async (
  eleccionId: number, 
  datos: RegistroEleccion
): Promise<RegistroResponse> => {
  const response = await api.post<RegistroEleccion>(
    `/elecciones/${eleccionId}/registro`,
    datos
  );
  return response;
};

export const obtenerRegistroEleccion = async (
  eleccionId: number
): Promise<RegistroResponse | null> => {
  return api.get(`/elecciones/${eleccionId}/registro`);
};