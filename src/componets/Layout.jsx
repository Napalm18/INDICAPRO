import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/componets/contexts/AuthContext';
import Sidebar from '@/componets/Sidebar';

function Layout() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user || location.pathname === '/login') {
    return <Outlet />;
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;