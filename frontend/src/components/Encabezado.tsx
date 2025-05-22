import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUsuarioStore } from '../stores/usuarioStore';
import { cerrarSesion } from '../services/servicioAutenticacion';

const Encabezado: React.FC = () => {
  const { votante, estaAutenticado } = useUsuarioStore();
  const navigate = useNavigate();

  const handleCerrarSesion = () => {
    cerrarSesion();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <Link to="/elecciones" className="navbar-brand">
        Sistema de Votación
      </Link>
      <div>
        {estaAutenticado && votante ? (
          <>
            <span className="text-light me-3">
              {votante.nombre} {votante.primerApellido}
            </span>
            <button className="btn btn-danger" onClick={handleCerrarSesion}>
              Cerrar Sesión
            </button>
          </>
        ) : (
          <Link to="/" className="btn btn-outline-light">
            Iniciar Sesión
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Encabezado;
