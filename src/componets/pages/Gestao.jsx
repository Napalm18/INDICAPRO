import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Users,
  Target,
  BarChart3,
  UserPlus,
  Edit,
  Trash2,
  TrendingUp,
  DollarSign,
  Activity,
  Shield,
  Mail,
  Phone
} from "lucide-react";

export default function Gestao() {
  const [activeTab, setActiveTab] = useState("usuarios");

  // Mock data for users
  const [usuarios, setUsuarios] = useState([
    {
      id: 1,
      nome: "João Silva",
      email: "joao.silva@email.com",
      telefone: "(11) 99999-9999",
      role: "vendedor",
      status: "ativo",
      dataCadastro: "2024-01-01",
      totalIndicacoes: 15,
      totalComissoes: 2250.00
    },
    {
      id: 2,
      nome: "Maria Santos",
      email: "maria.santos@email.com",
      telefone: "(11) 88888-8888",
      role: "admin",
      status: "ativo",
      dataCadastro: "2024-01-01",
      totalIndicacoes: 0,
      totalComissoes: 0
    }
  ]);

  // Mock data for goals
  const [metas, setMetas] = useState([
    {
      id: 1,
      titulo: "Meta Janeiro 2024",
      descricao: "Alcançar 50 indicações no mês",
      valorAlvo: 50,
      valorAtual: 24,
      prazo: "2024-01-31",
      status: "ativo",
      tipo: "indicacoes"
    },
    {
      id: 2,
      titulo: "Meta Vendas Janeiro",
      descricao: "R$ 10.000 em comissões",
      valorAlvo: 10000,
      valorAtual: 3240.50,
      prazo: "2024-01-31",
      status: "ativo",
      tipo: "vendas"
    }
  ]);

  // Mock data for monitoring
  const [monitoramento, setMonitoramento] = useState({
    totalUsuarios: 24,
    usuariosAtivos: 22,
    totalIndicacoes: 156,
    indicacoesAprovadas: 142,
    totalComissoes: 23450.75,
    mediaPorUsuario: 977.11,
    crescimentoMensal: 15.3
  });

  const getRoleBadge = (role) => {
    return role === "admin"
      ? <Badge className="bg-red-600 text-white">Admin</Badge>
      : <Badge className="bg-blue-600 text-white">Vendedor</Badge>;
  };

  const getStatusBadge = (status) => {
    return status === "ativo"
      ? <Badge className="bg-green-600 text-white">Ativo</Badge>
      : <Badge className="bg-gray-600 text-white">Inativo</Badge>;
  };

  const handleAddUser = () => {
    // Mock add user functionality
    alert("Funcionalidade de adicionar usuário em desenvolvimento");
  };

  const handleEditUser = (userId) => {
    // Mock edit user functionality
    alert(`Editar usuário ${userId}`);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      setUsuarios(prev => prev.filter(user => user.id !== userId));
    }
  };

  const handleAddMeta = () => {
    // Mock add goal functionality
    alert("Funcionalidade de adicionar meta em desenvolvimento");
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-yellow-400 mb-2">Gestão</h1>
          <p className="text-yellow-300">Painel administrativo do sistema</p>
        </div>
      </div>

      {/* Management Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800 border border-yellow-600">
          <TabsTrigger
            value="usuarios"
            className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
          >
            <Users className="w-4 h-4 mr-2" />
            Usuários
          </TabsTrigger>
          <TabsTrigger
            value="metas"
            className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
          >
            <Target className="w-4 h-4 mr-2" />
            Metas
          </TabsTrigger>
          <TabsTrigger
            value="monitoramento"
            className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Monitoramento
          </TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="usuarios" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-yellow-400">Gerenciamento de Usuários</h2>
            <Button
              onClick={handleAddUser}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold px-6 py-3 rounded-lg shadow-lg shadow-yellow-500/20"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Novo Usuário
            </Button>
          </div>

          <div className="grid gap-4">
            {usuarios.map((usuario) => (
              <Card key={usuario.id} className="bg-gradient-to-br from-black to-gray-900 border-yellow-600 shadow-lg shadow-yellow-500/10">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-tr from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
                          <span className="text-black font-semibold text-lg">
                            {usuario.nome.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-yellow-400">{usuario.nome}</h3>
                          <p className="text-yellow-300 text-sm">{usuario.email}</p>
                        </div>
                        <div className="flex gap-2">
                          {getRoleBadge(usuario.role)}
                          {getStatusBadge(usuario.status)}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-yellow-400" />
                          <span className="text-yellow-300">{usuario.telefone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-yellow-400" />
                          <span className="text-yellow-300">{usuario.totalIndicacoes} indicações</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-yellow-400" />
                          <span className="text-yellow-300">
                            R$ {usuario.totalComissoes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4 text-yellow-400" />
                          <span className="text-yellow-300">Cadastrado: {usuario.dataCadastro}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditUser(usuario.id)}
                        className="border-yellow-600 text-yellow-300 hover:bg-yellow-700/20"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteUser(usuario.id)}
                        className="border-red-600 text-red-400 hover:bg-red-900/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Goals Tab */}
        <TabsContent value="metas" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-yellow-400">Gerenciamento de Metas</h2>
            <Button
              onClick={handleAddMeta}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold px-6 py-3 rounded-lg shadow-lg shadow-yellow-500/20"
            >
              <Target className="w-5 h-5 mr-2" />
              Nova Meta
            </Button>
          </div>

          <div className="grid gap-4">
            {metas.map((meta) => {
              const progresso = meta.tipo === "indicacoes"
                ? (meta.valorAtual / meta.valorAlvo) * 100
                : (meta.valorAtual / meta.valorAlvo) * 100;

              return (
                <Card key={meta.id} className="bg-gradient-to-br from-black to-gray-900 border-yellow-600 shadow-lg shadow-yellow-500/10">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-tr from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
                            <Target className="w-6 h-6 text-black" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-yellow-400">{meta.titulo}</h3>
                            <p className="text-yellow-300 text-sm">{meta.descricao}</p>
                          </div>
                          <Badge className="bg-blue-600 text-white">{meta.status}</Badge>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-yellow-300">Progresso</span>
                            <span className="text-yellow-400 font-semibold">
                              {meta.tipo === "indicacoes"
                                ? `${meta.valorAtual}/${meta.valorAlvo} indicações`
                                : `R$ ${meta.valorAtual.toLocaleString('pt-BR')}/R$ ${meta.valorAlvo.toLocaleString('pt-BR')}`
                              }
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-3">
                            <div
                              className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(progresso)}`}
                              style={{ width: `${Math.min(progresso, 100)}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-yellow-400/60">
                            <span>{Math.round(progresso)}% concluído</span>
                            <span>Prazo: {meta.prazo}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-yellow-600 text-yellow-300 hover:bg-yellow-700/20"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-600 text-red-400 hover:bg-red-900/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Monitoring Tab */}
        <TabsContent value="monitoramento" className="space-y-6">
          <h2 className="text-2xl font-semibold text-yellow-400">Monitoramento do Sistema</h2>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-black to-gray-900 border-yellow-600 shadow-lg shadow-yellow-500/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-yellow-300">Total de Usuários</CardTitle>
                <Users className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-400">{monitoramento.totalUsuarios}</div>
                <p className="text-xs text-yellow-300">
                  {monitoramento.usuariosAtivos} ativos
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-black to-gray-900 border-yellow-600 shadow-lg shadow-yellow-500/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-yellow-300">Total Indicações</CardTitle>
                <Target className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-400">{monitoramento.totalIndicacoes}</div>
                <p className="text-xs text-yellow-300">
                  {monitoramento.indicacoesAprovadas} aprovadas
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-black to-gray-900 border-yellow-600 shadow-lg shadow-yellow-500/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-yellow-300">Total Comissões</CardTitle>
                <DollarSign className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-400">
                  R$ {monitoramento.totalComissoes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <p className="text-xs text-yellow-300">
                  +{monitoramento.crescimentoMensal}% este mês
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-black to-gray-900 border-yellow-600 shadow-lg shadow-yellow-500/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-yellow-300">Média por Usuário</CardTitle>
                <TrendingUp className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-400">
                  R$ {monitoramento.mediaPorUsuario.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <p className="text-xs text-yellow-300">
                  Performance média
                </p>
              </CardContent>
            </Card>
          </div>

          {/* System Status */}
          <Card className="bg-gradient-to-br from-black to-gray-900 border-yellow-600 shadow-lg shadow-yellow-500/10">
            <CardHeader>
              <CardTitle className="text-yellow-400">Status do Sistema</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-yellow-600/30">
                  <span className="text-yellow-300">API Supabase</span>
                  <Badge className="bg-green-600 text-white">Online</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-yellow-600/30">
                  <span className="text-yellow-300">Banco de Dados</span>
                  <Badge className="bg-green-600 text-white">Online</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-yellow-600/30">
                  <span className="text-yellow-300">Servidor</span>
                  <Badge className="bg-green-600 text-white">Online</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-yellow-600/30">
                  <span className="text-yellow-300">Último Backup</span>
                  <Badge className="bg-yellow-600 text-black">2h atrás</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-yellow-600/30">
                  <span className="text-yellow-300">Uptime</span>
                  <Badge className="bg-green-600 text-white">99.9%</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-yellow-600/30">
                  <span className="text-yellow-300">Versão</span>
                  <Badge className="bg-blue-600 text-white">v1.2.0</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
