import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Encabezado from './components/Encabezado';
import PieDePagina from './components/PieDePagina';
// import RutaProtegida from './components/RutaProtegida';

const PaginaElecciones = React.lazy(() => import('./pages/PaginaElecciones'));
const PaginaDetalleEleccion = React.lazy(() => import('./pages/PaginaDetalleEleccion'));
const PaginaLogin = React.lazy(() => import('./pages/PaginaLogin'));

const App: React.FC = () => {
  return (
    <div className="container-fluid">
      <Encabezado />
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          <Route path="/" element={<PaginaLogin />} />
          <Route path="/elecciones" element={<PaginaElecciones />} />
          <Route path="/detalle/:id" element={<PaginaDetalleEleccion />} />
          {/* Ejemplo de ruta protegida:
          <Route path="/elecciones" element={
            <RutaProtegida>
              <PaginaElecciones />
            </RutaProtegida>
          } /> */}
        </Routes>
      </Suspense>
      <PieDePagina />
    </div>
  );
};

export default App;
