import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './componets/Layout';
import Dashboard from './componets/pages/Dashboard';
import Login from './componets/pages/Login';
import Indicacoes from './componets/pages/Indicacoes';
import Gestao from './componets/pages/Gestao';
import Pagamentos from './componets/pages/Pagamentos';
import Perfil from './componets/pages/Perfil';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="indicacoes" element={<Indicacoes />} />
          <Route path="pagamentos" element={<Pagamentos />} />
          <Route path="gestao" element={<Gestao />} />
          <Route path="perfil" element={<Perfil />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return <AppRoutes />;
}

export default App;
