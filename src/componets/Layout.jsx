import React, { useState, useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Button } from "./ui/button";
import { BarChart3, Users, Settings, Target, Bell, Trash2, DollarSign, LogOut, User } from "lucide-react";

export default function Layout() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    // Mock user data for demonstration
    const currentUser = {
      full_name: "Usuário Exemplo",
      role: "admin"
    };
    setUser(currentUser);

    // Mock notifications data
    const notes = [
      { id: 1, titulo: "Notificação 1", descricao: "Descrição da notificação 1" },
      { id: 2, titulo: "Notificação 2", descricao: "Descrição da notificação 2" }
    ];
    setNotifications(notes);
  }, []);

  const isAdmin = user && user.role === "admin";

  const navigationItems = [
    { title: "Dashboard", url: createPageUrl("Dashboard"), icon: BarChart3, adminOnly: false },
    { title: "Nova Indicação", url: createPageUrl("NovaIndicacao"), icon: Users, adminOnly: false },
    { title: "Pagamentos", url: createPageUrl("Pagamentos"), icon: DollarSign, adminOnly: false },
    { title: "Gestão", url: createPageUrl("Gestao"), icon: Settings, adminOnly: true },
    { title: "Lixeira", url: createPageUrl("Lixeira"), icon: Trash2, adminOnly: true }
  ];

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logout clicked");
  };

  return (
    <div className="min-h-screen flex bg-black text-yellow-400 font-orbitron">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-black via-gray-900 to-black border-r border-yellow-600 flex flex-col shadow-2xl">
        {/* Logo Section */}
        <div className="p-6 border-b border-yellow-600 flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-tr from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/20 animate-pulse">
            <Target className="w-7 h-7 text-black" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-yellow-400 tracking-wider">INDICAPRO</h1>
            <p className="text-sm text-yellow-300">Sistema Premium</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto p-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider mb-3 text-yellow-400">Menu Principal</h2>
          <ul className="space-y-1">
            {navigationItems.map(
              (item) =>
                (!item.adminOnly || isAdmin) && (
                  <li key={item.title}>
                    <Link
                      to={item.url}
                      className={`flex items-center gap-3 px-4 py-3 rounded-r-xl transition-all duration-300 group ${
                        location.pathname === item.url
                          ? "bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 text-yellow-400 border-l-4 border-yellow-500 shadow-lg shadow-yellow-500/10"
                          : "text-yellow-300 hover:bg-yellow-700/10 hover:text-yellow-400 hover:border-l-2 hover:border-yellow-500/50"
                      }`}
                    >
                      <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </li>
                )
            )}
          </ul>
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-yellow-600">
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 w-full hover:bg-yellow-700/30 p-2 rounded-lg transition-all duration-200"
            >
              <div className="w-10 h-10 bg-gradient-to-tr from-yellow-600 to-yellow-700 rounded-full flex items-center justify-center text-black font-semibold text-sm shadow-lg">
                {user?.full_name?.[0]?.toUpperCase() || "U"}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="font-semibold text-yellow-400 truncate text-sm">{user?.full_name || "Usuário"}</p>
                <p className="text-xs text-yellow-300 truncate">{isAdmin ? "Gestor" : "Vendedor"}</p>
              </div>
            </button>

            {showProfileMenu && (
              <div className="absolute bottom-full left-0 w-full mb-2 bg-black border border-yellow-600 rounded-lg shadow-xl z-50">
                <Link
                  to={createPageUrl("Perfil")}
                  className="flex items-center gap-3 px-4 py-3 text-yellow-300 hover:bg-yellow-700/20 hover:text-yellow-400 transition-colors"
                  onClick={() => setShowProfileMenu(false)}
                >
                  <User className="w-4 h-4" />
                  <span>Perfil</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-3 text-yellow-300 hover:bg-red-900/20 hover:text-red-400 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sair</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gradient-to-r from-black via-gray-900 to-black border-b border-yellow-600 px-6 py-4 flex justify-between items-center shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-gradient-to-tr from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg">
              <Target className="w-5 h-5 text-black" />
            </div>
            <h1 className="text-2xl font-bold text-yellow-400 tracking-wider">INDICAPRO</h1>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              className="relative text-yellow-400 hover:text-yellow-300 focus:outline-none p-2 rounded-lg hover:bg-yellow-700/20 transition-all duration-200"
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notificações"
            >
              <Bell className="w-6 h-6" />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-600 rounded-full animate-ping border border-black"></span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-black border border-yellow-600 rounded-lg shadow-2xl z-50">
                <div className="p-4 border-b border-yellow-600">
                  <h2 className="font-bold text-yellow-400 text-lg">Notificações</h2>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((n) => (
                      <div key={n.id} className="p-4 border-b border-yellow-600/30 hover:bg-yellow-700/10 transition-colors">
                        <p className="font-semibold text-yellow-400 mb-1">{n.titulo}</p>
                        <p className="text-sm text-yellow-300">{n.descricao}</p>
                      </div>
                    ))
                  ) : (
                    <p className="p-4 text-yellow-300 text-center">Nenhuma nova notificação.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <section className="flex-1 overflow-auto bg-gradient-to-b from-black via-gray-900 to-black p-6">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
