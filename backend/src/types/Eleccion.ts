export interface Eleccion {
    id: string;
    titulo: string;
    fechaCelebracion: string;
    estadoFecha: 'pasada' | 'abierta' | 'próxima';
    estadoUsuario?: 'votado' | 'registrable' | 'registrado' | 'cerrado' | 'no-censo';
  }
  