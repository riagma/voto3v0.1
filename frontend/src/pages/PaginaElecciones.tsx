import React from 'react';
import { Link } from 'react-router-dom';
import { useElecciones } from '../hooks/useElecciones';
import { Eleccion } from '../types/Eleccion';

const PaginaElecciones: React.FC = () => {
  const { elecciones, cargando, error } = useElecciones();

  if (cargando) {
    return <div className="container mt-5">Cargando elecciones...</div>;
  }

  if (error) {
    return <div className="container mt-5 text-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Listado de Elecciones</h2>
      <ul className="list-group">
        {elecciones.map((eleccion: Eleccion) => (
          <li key={eleccion.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5>{eleccion.titulo}</h5>
              <small>Fecha: {eleccion.fechaCelebracion}</small>
              <br />
              <small>Estado (fecha): {eleccion.estadoFecha}</small>
              <br />
              <small>Estado (usuario): {eleccion.estadoUsuario || '–'}</small>
            </div>
            <div>
              <Link to={`/detalle/${eleccion.id}`} className="btn btn-primary" aria-label={`Ver detalle de ${eleccion.titulo}`}>
                Ver Detalle
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaginaElecciones;
