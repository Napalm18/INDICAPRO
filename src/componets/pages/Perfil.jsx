import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import {
  User,
  Mail,
  Phone,
  CreditCard,
  Lock,
  Eye,
  EyeOff,
  Save,
  Edit,
  Camera,
  Shield,
  Bell,
  Moon,
  Sun
} from "lucide-react";

export default function Perfil() {
  const [user, setUser] = useState({
    full_name: "João Silva",
    email: "joao.silva@email.com",
    phone: "(11) 99999-9999",
    pix_key: "joao.silva@email.com",
    role: "vendedor",
    avatar: null
  });

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    pix_key: "",
    current_password: "",
    new_password: "",
    confirm_password: ""
  });

  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false
  });
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    // Load user data
    setFormData({
      full_name: user.full_name,
      email: user.email,
      phone: user.phone,
      pix_key: user.pix_key,
      current_password: "",
      new_password: "",
      confirm_password: ""
    });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    // Simulate API call
    setUser(prev => ({
      ...prev,
      full_name: formData.full_name,
      email: formData.email,
      phone: formData.phone,
      pix_key: formData.pix_key
    }));
    setIsEditing(false);
  };

  const handlePasswordChange = () => {
    if (formData.new_password !== formData.confirm_password) {
      alert("As senhas não coincidem!");
      return;
    }
    // Simulate password change
    alert("Senha alterada com sucesso!");
    setFormData(prev => ({
      ...prev,
      current_password: "",
      new_password: "",
      confirm_password: ""
    }));
  };

  const handleNotificationChange = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark");
  };

  const tabs = [
    { id: "personal", label: "Dados Pessoais", icon: User },
    { id: "security", label: "Segurança", icon: Shield },
    { id: "notifications", label: "Notificações", icon: Bell },
    { id: "preferences", label: "Preferências", icon: Edit }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-yellow-400 mb-2">Perfil</h1>
          <p className="text-yellow-300">Gerencie suas informações pessoais</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Profile Sidebar */}
        <div className="lg:col-span-1">
          <Card className="bg-gradient-to-br from-black to-gray-900 border-yellow-600 shadow-lg shadow-yellow-500/10">
            <CardContent className="p-6 text-center">
              <div className="relative mb-4">
                <div className="w-24 h-24 bg-gradient-to-tr from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-yellow-500/20">
                  <User className="w-12 h-12 text-black" />
                </div>
                <button className="absolute bottom-2 right-1/2 transform translate-x-12 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg hover:bg-yellow-600 transition-colors">
                  <Camera className="w-4 h-4 text-black" />
                </button>
              </div>
              <h3 className="text-xl font-semibold text-yellow-400 mb-1">{user.full_name}</h3>
              <p className="text-yellow-300 text-sm mb-3">{user.email}</p>
              <Badge className="bg-yellow-600 text-black">
                {user.role === "admin" ? "Administrador" : "Vendedor"}
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card className="bg-gradient-to-br from-black to-gray-900 border-yellow-600 shadow-lg shadow-yellow-500/10">
            <CardHeader className="border-b border-yellow-600">
              <div className="flex space-x-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      activeTab === tab.id
                        ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500"
                        : "text-yellow-300 hover:bg-yellow-700/10 hover:text-yellow-400"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </CardHeader>

            <CardContent className="p-6">
              {/* Personal Data Tab */}
              {activeTab === "personal" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-yellow-400">Dados Pessoais</h3>
                    <Button
                      onClick={() => setIsEditing(!isEditing)}
                      variant="outline"
                      className="border-yellow-600 text-yellow-300 hover:bg-yellow-700/20"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      {isEditing ? "Cancelar" : "Editar"}
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="full_name" className="text-yellow-300">Nome Completo</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-yellow-400" />
                        <Input
                          id="full_name"
                          name="full_name"
                          value={formData.full_name}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="pl-10 bg-gray-800 border-yellow-600 text-yellow-400 placeholder-yellow-400/50 focus:border-yellow-500 focus:ring-yellow-500 disabled:opacity-50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-yellow-300">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-yellow-400" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="pl-10 bg-gray-800 border-yellow-600 text-yellow-400 placeholder-yellow-400/50 focus:border-yellow-500 focus:ring-yellow-500 disabled:opacity-50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-yellow-300">Telefone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-5 w-5 text-yellow-400" />
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="pl-10 bg-gray-800 border-yellow-600 text-yellow-400 placeholder-yellow-400/50 focus:border-yellow-500 focus:ring-yellow-500 disabled:opacity-50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pix_key" className="text-yellow-300">Chave PIX</Label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-3 h-5 w-5 text-yellow-400" />
                        <Input
                          id="pix_key"
                          name="pix_key"
                          value={formData.pix_key}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="pl-10 bg-gray-800 border-yellow-600 text-yellow-400 placeholder-yellow-400/50 focus:border-yellow-500 focus:ring-yellow-500 disabled:opacity-50"
                        />
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={handleSaveProfile}
                        className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold px-6 py-2 rounded-lg shadow-lg shadow-yellow-500/20"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Salvar Alterações
                      </Button>
                      <Button
                        onClick={() => setIsEditing(false)}
                        variant="outline"
                        className="border-yellow-600 text-yellow-300 hover:bg-yellow-700/20 px-6 py-2 rounded-lg"
                      >
                        Cancelar
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-yellow-400">Alterar Senha</h3>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current_password" className="text-yellow-300">Senha Atual</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-yellow-400" />
                        <Input
                          id="current_password"
                          name="current_password"
                          type={showPasswords.current ? "text" : "password"}
                          value={formData.current_password}
                          onChange={handleInputChange}
                          className="pl-10 pr-10 bg-gray-800 border-yellow-600 text-yellow-400 placeholder-yellow-400/50 focus:border-yellow-500 focus:ring-yellow-500"
                          placeholder="Digite sua senha atual"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                          className="absolute right-3 top-3 text-yellow-400 hover:text-yellow-300"
                        >
                          {showPasswords.current ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="new_password" className="text-yellow-300">Nova Senha</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-yellow-400" />
                        <Input
                          id="new_password"
                          name="new_password"
                          type={showPasswords.new ? "text" : "password"}
                          value={formData.new_password}
                          onChange={handleInputChange}
                          className="pl-10 pr-10 bg-gray-800 border-yellow-600 text-yellow-400 placeholder-yellow-400/50 focus:border-yellow-500 focus:ring-yellow-500"
                          placeholder="Digite sua nova senha"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                          className="absolute right-3 top-3 text-yellow-400 hover:text-yellow-300"
                        >
                          {showPasswords.new ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm_password" className="text-yellow-300">Confirmar Nova Senha</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-yellow-400" />
                        <Input
                          id="confirm_password"
                          name="confirm_password"
                          type={showPasswords.confirm ? "text" : "password"}
                          value={formData.confirm_password}
                          onChange={handleInputChange}
                          className="pl-10 pr-10 bg-gray-800 border-yellow-600 text-yellow-400 placeholder-yellow-400/50 focus:border-yellow-500 focus:ring-yellow-500"
                          placeholder="Confirme sua nova senha"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                          className="absolute right-3 top-3 text-yellow-400 hover:text-yellow-300"
                        >
                          {showPasswords.confirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <Button
                      onClick={handlePasswordChange}
                      className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold px-6 py-2 rounded-lg shadow-lg shadow-yellow-500/20"
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Alterar Senha
                    </Button>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-yellow-400">Preferências de Notificação</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-yellow-600/30">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-yellow-400" />
                        <div>
                          <p className="text-yellow-300 font-medium">Notificações por Email</p>
                          <p className="text-yellow-400/60 text-sm">Receba atualizações por email</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.email}
                          onChange={() => handleNotificationChange("email")}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-yellow-600/30">
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-yellow-400" />
                        <div>
                          <p className="text-yellow-300 font-medium">Notificações Push</p>
                          <p className="text-yellow-400/60 text-sm">Receba notificações no navegador</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.push}
                          onChange={() => handleNotificationChange("push")}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-yellow-600/30">
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-yellow-400" />
                        <div>
                          <p className="text-yellow-300 font-medium">Notificações SMS</p>
                          <p className="text-yellow-400/60 text-sm">Receba alertas por SMS</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.sms}
                          onChange={() => handleNotificationChange("sms")}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === "preferences" && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-yellow-400">Preferências do Sistema</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-yellow-600/30">
                      <div className="flex items-center gap-3">
                        {theme === "dark" ? <Moon className="w-5 h-5 text-yellow-400" /> : <Sun className="w-5 h-5 text-yellow-400" />}
                        <div>
                          <p className="text-yellow-300 font-medium">Tema {theme === "dark" ? "Escuro" : "Claro"}</p>
                          <p className="text-yellow-400/60 text-sm">Alterne entre tema claro e escuro</p>
                        </div>
                      </div>
                      <Button
                        onClick={toggleTheme}
                        variant="outline"
                        className="border-yellow-600 text-yellow-300 hover:bg-yellow-700/20"
                      >
                        {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
