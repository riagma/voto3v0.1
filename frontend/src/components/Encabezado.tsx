import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useUsuarioStore from '../store/usuarioStore';

const Encabezado: React.FC = () => {
  const { usuario, setUsuario } = useUsuarioStore();
  const navigate = useNavigate();

  const cerrarSesion = () => {
    setUsuario(null);
    navigate('/');
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <Link to="/elecciones" className="navbar-brand">
        Sistema de Votación
      </Link>
      <div>
        {usuario ? (
          <>
            <span className="text-light me-3">Hola, {usuario.nombre}!</span>
            <button className="btn btn-danger" onClick={cerrarSesion}>
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
