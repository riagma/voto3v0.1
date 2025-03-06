export interface DetalleEleccion {
    id: string;
    titulo: string;
    descripcion: string;
    fechaInicio: string;
    fechaFin: string;
    candidatos: string[];
    estado: 'abierta' | 'concluida';
    estadoUsuario?: 'votado' | 'registrable' | 'registrado' | 'cerrado' | 'no-censo';
  }
  