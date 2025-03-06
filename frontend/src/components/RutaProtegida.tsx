import React, { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useIniciarSesion } from '../hooks/useIniciarSesion';

interface Props {
  children: JSX.Element;
}

const RutaProtegida: React.FC<Props> = ({ children }) => {
  const { usuario } = useIniciarSesion();

  if (!usuario) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RutaProtegida;
