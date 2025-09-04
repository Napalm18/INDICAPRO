import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, LogOut, Bell } from 'lucide-react';
import { useAuth } from './contexts/AuthContext';
import { useNotification } from './contexts/NotificationContext';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu.jsx";
import { toast } from './ui/use-toast';

function Header() {
  const { user, signOut } = useAuth();
  const { notifications, clearNotifications } = useNotification();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-4 right-4 z-50 flex items-center gap-3"
    >
      {/* Notifications Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="bg-card border border-border hover:bg-accent relative"
          >
            <Bell className="w-5 h-5" />
            {notifications[user.id]?.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {notifications[user.id]?.length}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-60" align="end">
          <DropdownMenuLabel>Notificações Recentes</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {notifications[user.id]?.length > 0 ? (
            <>
              {notifications[user.id].slice(0, 5).map(notif => (
                <DropdownMenuItem key={notif.id} className="text-sm">
                  {notif.message}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => clearNotifications(user.id)} className="text-red-500">
                Limpar Notificações
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem disabled>Nenhuma notificação</DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Profile Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="bg-card border border-border hover:bg-accent flex items-center gap-2 px-3 py-2"
          >
            <User className="w-4 h-4" />
            <span className="text-sm font-medium">{user?.name}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48" align="end">
          <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate('/perfil')}>
            <User className="w-4 h-4 mr-2" />
            Perfil
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="text-red-500">
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  );
}

export default Header;
