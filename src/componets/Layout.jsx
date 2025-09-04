import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Button } from "./ui/button";
import { BarChart3, Users, Settings, Target, Bell, Trash2, DollarSign } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger
} from "./Sidebar";

const navigationItems = [
  { title: "Dashboard", url: createPageUrl("Dashboard"), icon: BarChart3, adminOnly: false },
  { title: "Nova Indicação", url: createPageUrl("NovaIndicacao"), icon: Users, adminOnly: false },
  { title: "Pagamentos", url: createPageUrl("Pagamentos"), icon: DollarSign, adminOnly: false },
  { title: "Gestão", url: createPageUrl("Gestao"), icon: Settings, adminOnly: true },
  { title: "Lixeira", url: createPageUrl("Lixeira"), icon: Trash2, adminOnly: true }
];

export default function Layout({ children }) {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

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

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-black text-yellow-400">
        <Sidebar className="border-r border-yellow-600 bg-gradient-to-b from-black via-gray-900 to-black">
          <SidebarHeader className="bg-black p-6 flex flex-col gap-2 border-b border-yellow-600">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-tr from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/20">
                <Target className="w-7 h-7 text-yellow-400" />
              </div>
              <div>
                <h2 className="font-bold text-yellow-400 text-xl">IndicaPro</h2>
                <p className="text-sm text-yellow-300">Sistema Premium</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="bg-black p-3 flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-yellow-400 uppercase tracking-wider px-3 py-3">
                Menu Principal
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map(
                    (item) =>
                      (!item.adminOnly || isAdmin) && (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton
                            asChild
                            className={`hover:bg-gradient-to-r hover:from-yellow-500/10 hover:to-yellow-600/10 hover:text-yellow-400 hover:border-l-2 hover:border-yellow-500 transition-all duration-200 rounded-r-xl mb-1 ${
                              location.pathname === item.url
                                ? "bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 text-yellow-400 border-l-2 border-yellow-500 shadow-sm"
                                : "text-yellow-300"
                            }`}
                          >
                            <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                              <item.icon className="w-5 h-5" />
                              <span className="font-medium">{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      )
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="bg-black p-4 flex flex-col gap-2 border-t border-yellow-600">
            <Link
              to={createPageUrl("Perfil")}
              className="flex items-center gap-3 hover:bg-yellow-700/50 p-2 rounded-lg transition-colors"
            >
              <div className="w-10 h-10 bg-gradient-to-tr from-yellow-600 to-yellow-700 rounded-full flex items-center justify-center">
                <span className="text-yellow-400 font-semibold text-sm">{user?.full_name?.[0]?.toUpperCase() || "U"}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-yellow-400 text-sm truncate">{user?.full_name || "Usuário"}</p>
                <p className="text-xs text-yellow-300 truncate">{isAdmin ? "Gestor" : "Vendedor"}</p>
              </div>
            </Link>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-gradient-to-r from-black via-gray-900 to-black backdrop-blur-sm border-b border-yellow-600 px-6 py-3 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-gray-800 p-2 rounded-lg transition-colors duration-200 md:hidden" />
              <div className="hidden md:flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-tr from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-yellow-400" />
                </div>
                <h1 className="text-xl font-bold text-yellow-400">IndicaPro</h1>
              </div>
            </div>
            <div className="relative">
              <Button variant="ghost" size="icon" onClick={() => setShowNotifications(!showNotifications)}>
                <Bell className="text-yellow-400" />
                {notifications.length > 0 && <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>}
              </Button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-black border border-yellow-600 rounded-lg shadow-lg z-20">
                  <div className="p-4 font-bold text-yellow-400 border-b border-yellow-600">Notificações</div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((n) => (
                        <div key={n.id} className="p-3 border-b border-yellow-600/50">
                          <p className="font-semibold text-yellow-400">{n.titulo}</p>
                          <p className="text-sm text-yellow-300">{n.descricao}</p>
                        </div>
                      ))
                    ) : (
                      <p className="p-4 text-yellow-300">Nenhuma nova notificação.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </header>

          <div className="flex-1 overflow-auto">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
