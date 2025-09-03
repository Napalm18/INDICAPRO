import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './componets/contexts/AuthContext';
import Layout from './componets/Layout';
import Dashboard from './componets/pages/Dashboard';
import Login from './componets/pages/Login';
import Indicacoes from './componets/pages/Indicacoes';
import Gestao from './componets/pages/Gestao';
import Pagamentos from './componets/pages/Pagamentos';
import Perfil from './componets/pages/Perfil';
import Configuracoes from './componets/pages/Configuracoes';
import { Toaster } from './componets/ui/toaster';
import { NotificationProvider } from './componets/contexts/NotificationContext';
import { ThemeProvider } from './componets/contexts/ThemeContext';
import { AIErrorBoundary } from './lib/errorHandler.jsx';

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-luxury">
        <div className="text-golden text-xl">Carregando...</div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="indicacoes" element={<Indicacoes />} />
          <Route path="gestao" element={<Gestao />} />
          <Route path="pagamentos" element={<Pagamentos />} />
          <Route path="perfil" element={<Perfil />} />
          <Route path="configuracoes" element={<Configuracoes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AIErrorBoundary>
      <ThemeProvider>
        <NotificationProvider>
          <AuthProvider>
            <AppRoutes />
            <Toaster />
          </AuthProvider>
        </NotificationProvider>
      </ThemeProvider>
    </AIErrorBoundary>
  );
}

export default App;
