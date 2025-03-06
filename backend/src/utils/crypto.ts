import CryptoJS from 'crypto-js';

export const encriptarDatos = (datos: object, clave: string): string => {
  return CryptoJS.AES.encrypt(JSON.stringify(datos), clave).toString();
};

export const desencriptarDatos = (textoEncriptado: string, clave: string) => {
  const bytes = CryptoJS.AES.decrypt(textoEncriptado, clave);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
