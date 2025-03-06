// src/types/UsuarioLocal.ts
import { desencriptar } from '../utils/crypto';

export interface DatosUsuarioLocal {
  claveLocal: string;
  nif: string;
  claveServidor: string;
  idUnico: string;
  // Otros datos del servidor se pueden agregar aquí
}

export interface UsuarioLocal {
  nombre: string;
  datos: DatosUsuarioLocal;
}

export interface UsuarioLocalStorage {
  nombre: string;
  datosEncriptados: string;
}

export function convertirUsuarioLocalStorage(json: unknown): UsuarioLocalStorage {
  if (typeof json !== 'object' || json === null) {
    throw new Error("Usuario local almacenado inválido: no es un objeto");
  }
  const objeto = json as { [clave: string]: unknown };
  if (typeof objeto.nombre !== 'string') {
    throw new Error("Usuario local almacenado inválido: 'nombre' debe ser una cadena");
  }
  if (typeof objeto.datosEncriptados !== 'string') {
    throw new Error("Usuario local almacenado inválido: 'datosEncriptados' debe ser una cadena");
  }
  return {
    nombre: objeto.nombre,
    datosEncriptados: objeto.datosEncriptados,
  };
}

export function desencriptarUsuarioLocal(
  usuarioAlmacenado: UsuarioLocalStorage,
  clave: string
): UsuarioLocal {
  const datosDesencriptados = desencriptar(usuarioAlmacenado.datosEncriptados, clave);
  let datos: DatosUsuarioLocal;
  try {
    datos = JSON.parse(datosDesencriptados);
  } catch {
    throw new Error("Error al parsear los datos desencriptados");
  }
  if (
    typeof datos.claveLocal !== 'string' ||
    typeof datos.nif !== 'string' ||
    typeof datos.claveServidor !== 'string' ||
    typeof datos.idUnico !== 'string'
  ) {
    throw new Error("Datos de usuario local inválidos");
  }
  return {
    nombre: usuarioAlmacenado.nombre,
    datos,
  };
}
