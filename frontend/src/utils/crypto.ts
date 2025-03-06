import CryptoJS from 'crypto-js';

export const encriptar = (datos: string, clave: string): string => {
  return CryptoJS.AES.encrypt(datos, clave).toString();
};

export const desencriptar = (cifrado: string, clave: string): string => {
  const bytes = CryptoJS.AES.decrypt(cifrado, clave);
  return bytes.toString(CryptoJS.enc.Utf8);
};
