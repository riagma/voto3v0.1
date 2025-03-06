// src/pages/PaginaDetalleEleccion.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDetalleEleccion } from '../hooks/useDetalleEleccion';

const PaginaDetalleEleccion: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { detalle, cargando, error } = useDetalleEleccion(id || '');

  if (cargando) {
    return <div className="container mt-5">Cargando detalle...</div>;
  }

  if (error || !detalle) {
    return <div className="container mt-5 text-danger">{error || 'No se encontraron detalles.'}</div>;
  }

  return (
    <div className="container mt-5">
      <h2>{detalle.titulo}</h2>
      <p>{detalle.descripcion}</p>
      <p>
        <strong>Desde:</strong> {detalle.fechaInicio} <br />
        <strong>Hasta:</strong> {detalle.fechaFin}
      </p>
      <h4>Candidatos:</h4>
      <ul>
        {detalle.candidatos.map((candidato: string, indice: number) => (
          <li key={indice}>{candidato}</li>
        ))}
      </ul>
      {detalle.estadoUsuario && (
        <p>
          <strong>Estado (usuario):</strong> {detalle.estadoUsuario}
        </p>
      )}
      {detalle.estado === 'abierta' ? (
        <div className="mt-4">
          <button className="btn btn-primary me-2" onClick={() => alert('Registrarse')}>Registrarse</button>
          <button className="btn btn-success" onClick={() => alert('Votar')}>Votar</button>
        </div>
      ) : (
        <div className="mt-4">
          <h4>Resultados</h4>
          <p>Resultados finales de la elección.</p>
        </div>
      )}
      <button className="btn btn-secondary mt-3" onClick={() => navigate('/elecciones')}>Volver</button>
    </div>
  );
};

export default PaginaDetalleEleccion;
