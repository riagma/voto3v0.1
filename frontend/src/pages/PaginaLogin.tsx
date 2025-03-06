// src/pages/PaginaLogin.tsx
import React, { useState } from 'react';
import { useIniciarSesion } from '../hooks/useIniciarSesion';
import { useRegistrar } from '../hooks/useRegistrar';
import { useNavigate } from 'react-router-dom';

const PaginaLogin: React.FC = () => {
  // Estado que indica si se está en modo registro (mostrar recuadro de credenciales del sistema)
  const [modoRegistro, setModoRegistro] = useState<boolean>(false);
  const navigate = useNavigate();

  // Campos comunes para ambos modos
  const [usuario, setUsuario] = useState<string>('');
  const [clave, setClave] = useState<string>('');

  // Campos adicionales para el registro (credenciales del sistema de votación)
  const [nif, setNif] = useState<string>('');
  const [claveServidor, setClaveServidor] = useState<string>('');

  // Hooks para iniciar sesión y registrar
  const { iniciarSesion, error: errorInicio, cargando: cargandoInicio } = useIniciarSesion();
  const { registrar, error: errorRegistro, cargando: cargandoRegistro } = useRegistrar();

  // Función para iniciar sesión (modo login)
  const handleIniciarSesion = async () => {
    const resultado = await iniciarSesion({ nombre: usuario, clave });
    if (resultado) {
      navigate('/elecciones');
    }
  };

  // Función para registrar un nuevo usuario (modo registro)
  const handleRegistrar = async () => {
    const resultado = await registrar({ nombre: usuario, claveLocal: clave, nif, claveServidor });
    if (resultado) {
      navigate('/elecciones');
    }
  };

  // Función para continuar en modo anónimo
  const handleContinuar = () => {
    navigate('/elecciones');
  };

  return (
    <div className="container mt-5">
      <h2>Bienvenido al Sistema de Votación</h2>
      {/* Inputs comunes */}
      <div className="mb-3">
        <label className="form-label">Usuario</label>
        <input
          type="text"
          className="form-control"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Contraseña</label>
        <input
          type="password"
          className="form-control"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
        />
      </div>

      {/* Si se activa el modo registro, se muestra el recuadro con credenciales del sistema */}
      {modoRegistro && (
        <div className="border p-3 mb-3">
          <h4>Credenciales Sistema Votación</h4>
          <div className="mb-3">
            <label className="form-label">NIF</label>
            <input
              type="text"
              className="form-control"
              value={nif}
              onChange={(e) => setNif(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Clave</label>
            <input
              type="password"
              className="form-control"
              value={claveServidor}
              onChange={(e) => setClaveServidor(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Botones */}
      <div className="d-flex justify-content-around">
        {modoRegistro ? (
          <>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setModoRegistro(false)}
            >
              Volver Iniciar Sesión
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleRegistrar}
              disabled={cargandoRegistro}
            >
              {cargandoRegistro ? 'Registrando...' : 'Crear Usuario'}
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleIniciarSesion}
              disabled={cargandoInicio}
            >
              {cargandoInicio ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => setModoRegistro(true)}
            >
              Nuevo Usuario
            </button>
          </>
        )}
        <button type="button" className="btn btn-info" onClick={handleContinuar}>
          Continuar
        </button>
      </div>

      {/* Mensajes de error */}
      {!modoRegistro && errorInicio && <p className="mt-3 text-danger">{errorInicio}</p>}
      {modoRegistro && errorRegistro && <p className="mt-3 text-danger">{errorRegistro}</p>}
    </div>
  );
};

export default PaginaLogin;
