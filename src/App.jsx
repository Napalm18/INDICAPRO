import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { Toaster } from '@/components/ui/toaster';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Indicacoes from '@/pages/Indicacoes';
import Pagamentos from '@/pages/Pagamentos';
import Perfil from '@/pages/Perfil';
import Gestao from '@/pages/Gestao';
import Configuracoes from '@/pages/Configuracoes';
import Layout from '@/components/Layout';
import PixVendedores from '@/components/gestao/PixVendedores';

function ProtectedRoute({ children, requiredRole }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
}

function AppRoutes() {
  const { user } = useAuth();
  
  return (
    <Routes>
      <Route 
        path="/login" 
        element={user ? <Navigate to="/dashboard" replace /> : <Login />} 
      />
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="indicacoes" element={<ProtectedRoute><Indicacoes /></ProtectedRoute>} />
        <Route path="pagamentos" element={<ProtectedRoute><Pagamentos /></ProtectedRoute>} />
        <Route path="perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
        <Route 
          path="gestao" 
          element={
            <ProtectedRoute requiredRole="gestor">
              <Gestao />
            </ProtectedRoute>
          } 
        >
          <Route path="pix" element={<ProtectedRoute requiredRole="gestor"><PixVendedores /></ProtectedRoute>} />
        </Route>
        <Route 
          path="configuracoes" 
          element={
            <ProtectedRoute requiredRole="gestor">
              <Configuracoes />
            </ProtectedRoute>
          } 
        />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <Router>
            <Helmet>
              <title>Sistema de Indicações</title>
              <meta name="description" content="Sistema completo de gestão de indicações com controle de comissões e pagamentos" />
              <meta property="og:title" content="Sistema de Indicações" />
              <meta property="og:description" content="Sistema completo de gestão de indicações com controle de comissões e pagamentos" />
            </Helmet>
            <AppRoutes />
            <Toaster />
          </Router>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;