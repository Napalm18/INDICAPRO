import React, { useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Target, 
  CreditCard, 
  User, 
  SlidersHorizontal,
  Briefcase,
  LogOut,
  Bell,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import { useAuth } from '@/componets/contexts/AuthContext';
import { useNotification } from '@/componets/contexts/NotificationContext';
import { Button } from '@/componets/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/componets/ui/dropdown-menu.jsx";
import { toast } from '@/componets/ui/use-toast';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', roles: ['gestor', 'vendedor'] },
  { icon: Target, label: 'Indicações', path: '/indicacoes', roles: ['gestor', 'vendedor'] },
  { icon: CreditCard, label: 'Pagamentos', path: '/pagamentos', roles: ['gestor', 'vendedor'] },
  { icon: User, label: 'Perfil', path: '/perfil', roles: ['gestor', 'vendedor'] },
  { icon: Briefcase, label: 'Gestão', path: '/gestao', roles: ['gestor'] },
  { icon: SlidersHorizontal, label: 'Configurações', path: '/configuracoes', roles: ['gestor'] },
];

function Sidebar() {
  const { user, logout } = useAuth();
  const { notifications, clearNotifications } = useNotification();
  const navigate = useNavigate();
  const [logo, setLogo] = useState(localStorage.getItem('logo'));
  const fileInputRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem('logo', reader.result);
        setLogo(reader.result);
        toast({ title: "Logo atualizada!" });
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(user?.role)
  );

  return (
    <motion.div 
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="w-64 bg-card border-r border-border h-full flex flex-col"
    >
      <div className="p-6 border-b border-border flex items-center gap-3">
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleLogoUpload} 
          accept="image/*"
        />
        <Button variant="ghost" size="icon" onClick={() => fileInputRef.current.click()}>
          {logo ? <img src={logo} alt="Logo" className="h-8 w-8 rounded-full object-cover" /> : <ImageIcon className="h-6 w-6"/>}
        </Button>
        <span className="text-xl font-bold">
          IndicaPro
        </span>
      </div>
      <div className="p-4 border-b border-border">
         <p className="text-sm text-muted-foreground mt-1">
          {user?.role === 'gestor' ? 'Gestor' : 'Vendedor'}: {user?.name}
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {filteredMenuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-border space-y-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground relative"
            >
              <Bell className="w-5 h-5 mr-3" />
              Notificações
              {notifications[user.id]?.length > 0 && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications[user.id]?.length}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-60" align="start">
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

        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sair
        </Button>
      </div>
    </motion.div>
  );
}

export default Sidebar;