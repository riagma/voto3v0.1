// src/services/servicioAutenticacionLocal.ts
import { encriptar } from '../utils/crypto';
import type { UsuarioLocal, DatosUsuarioLocal, UsuarioLocalStorage } from '../types/UsuarioLocal';
import { convertirUsuarioLocalStorage, desencriptarUsuarioLocal } from '../types/UsuarioLocal';
import { convertirDatosServidor } from '../types/DatosServidor';

const CLAVE_USUARIOS_LOCALES = "usuariosLocales";

// Obtiene los usuarios almacenados en localStorage
export function obtenerUsuariosLocales(): UsuarioLocalStorage[] {
  const usuariosStr = localStorage.getItem(CLAVE_USUARIOS_LOCALES);
  if (usuariosStr) {
    try {
      const parseado = JSON.parse(usuariosStr);
      if (!Array.isArray(parseado)) {
        throw new Error("Formato de usuarios locales inválido");
      }
      return parseado.map((u: unknown) => convertirUsuarioLocalStorage(u));
    } catch (err) {
      console.error("Error al parsear los usuarios locales:", err);
      return [];
    }
  }
  return [];
}

// Guarda los usuarios en localStorage
export function guardarUsuariosLocales(usuarios: UsuarioLocalStorage[]): void {
  localStorage.setItem(CLAVE_USUARIOS_LOCALES, JSON.stringify(usuarios));
}

// Autenticación local: busca el usuario almacenado y desencripta sus datos usando la clave proporcionada
export function iniciarSesionLocal(credenciales: { nombre: string; clave: string }): UsuarioLocal {
  const usuariosAlmacenados = obtenerUsuariosLocales();
  const usuarioAlmacenado = usuariosAlmacenados.find(u => u.nombre === credenciales.nombre);
  if (!usuarioAlmacenado) {
    throw new Error("Usuario no encontrado");
  }
  try {
    return desencriptarUsuarioLocal(usuarioAlmacenado, credenciales.clave);
  } catch {
    throw new Error("Clave incorrecta o datos corruptos");
  }
}

// Autenticación en el servidor: en modo mock carga el fichero JSON y busca el usuario cuyo nif y clave coincidan
export async function autenticarServidor(nif: string, claveServidor: string): Promise<{ idUnico: string; nif: string; }> {
  if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
    const datosModule = await import('../mocks/datosServidor.json');
    const usuariosMock: unknown[] = datosModule.default;
    const usuarioEncontrado = usuariosMock.find(item => {
      try {
        const datos = convertirDatosServidor(item);
        return datos.nif === nif && datos.clave === claveServidor;
      } catch {
        return false;
      }
    });
    if (!usuarioEncontrado) {
      throw new Error("Credenciales del servidor inválidas");
    }
    return convertirDatosServidor(usuarioEncontrado);
  } else {
    const respuesta = await fetch(`${import.meta.env.VITE_SERVER_URL}/autenticar`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nif, clave: claveServidor })
    });
    if (!respuesta.ok) {
      throw new Error("Error al autenticar en el servidor");
    }
    const datosJSON: unknown = await respuesta.json();
    try {
      return convertirDatosServidor(datosJSON);
    } catch (error) {
      throw new Error("Error al convertir los datos del servidor: " + (error as Error).message);
    }
  }
}

// Datos para el registro de un usuario (se definen aquí para este servicio)
export interface DatosRegistro {
  nombre: string;
  claveLocal: string;
  nif: string;
  claveServidor: string;
}

// Registra un nuevo usuario en localStorage:
// 1. Valida que el nombre tenga al menos 3 caracteres y la contraseña al menos 8.
// 2. Verifica que el usuario no exista.
// 3. Autentica en el servidor para obtener datos adicionales (por ejemplo, idUnico).
// 4. Crea un objeto de tipo DatosUsuarioLocal, lo encripta con la clave local y lo guarda.
export async function registrarUsuarioLocal(datos: DatosRegistro): Promise<UsuarioLocal> {
  if (datos.nombre.length < 3) {
    throw new Error("El nombre de usuario debe tener al menos 3 caracteres");
  }
  if (datos.claveLocal.length < 8) {
    throw new Error("La contraseña debe tener al menos 8 caracteres");
  }
  const usuariosAlmacenados = obtenerUsuariosLocales();
  if (usuariosAlmacenados.find(u => u.nombre === datos.nombre)) {
    throw new Error("El usuario ya existe");
  }
  const datosServidor = await autenticarServidor(datos.nif, datos.claveServidor);
  const datosUsuario: DatosUsuarioLocal = {
    claveLocal: datos.claveLocal,
    nif: datos.nif,
    claveServidor: datos.claveServidor,
    idUnico: datosServidor.idUnico,
  };
  // Encriptar los datos con la clave local
  const datosEncriptados = encriptar(JSON.stringify(datosUsuario), datos.claveLocal);
  const nuevoUsuarioAlmacenado: UsuarioLocalStorage = {
    nombre: datos.nombre,
    datosEncriptados,
  };
  const usuariosActuales = obtenerUsuariosLocales();
  usuariosActuales.push(nuevoUsuarioAlmacenado);
  guardarUsuariosLocales(usuariosActuales);
  return {
    nombre: nuevoUsuarioAlmacenado.nombre,
    datos: datosUsuario,
  };
}
