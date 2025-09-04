import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Bell,
  Plus,
  Eye,
  CheckCircle,
  Clock,
  AlertTriangle
} from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalIndicacoes: 0,
    indicacoesAprovadas: 0,
    valorTotal: 0,
    metaMensal: 5000,
    notificacoes: []
  });

  useEffect(() => {
    // Mock data for demonstration
    setStats({
      totalIndicacoes: 24,
      indicacoesAprovadas: 18,
      valorTotal: 3240.50,
      metaMensal: 5000,
      notificacoes: [
        { id: 1, tipo: "aprovacao", mensagem: "Indicação de João Silva foi aprovada", data: "2024-01-15" },
        { id: 2, tipo: "pagamento", mensagem: "Pagamento de R$ 150,00 processado", data: "2024-01-14" },
        { id: 3, tipo: "meta", mensagem: "Meta mensal atingida em 85%", data: "2024-01-13" }
      ]
    });
  }, []);

  const progressoMeta = (stats.valorTotal / stats.metaMensal) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-yellow-400 mb-2">Dashboard</h1>
          <p className="text-yellow-300">Bem-vindo ao seu painel de controle</p>
        </div>
        <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold px-6 py-3 rounded-lg shadow-lg shadow-yellow-500/20">
          <Plus className="w-5 h-5 mr-2" />
          Nova Indicação
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-black to-gray-900 border-yellow-600 shadow-lg shadow-yellow-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-300">Total de Indicações</CardTitle>
            <Users className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400">{stats.totalIndicacoes}</div>
            <p className="text-xs text-yellow-300">
              +12% em relação ao mês passado
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-black to-gray-900 border-yellow-600 shadow-lg shadow-yellow-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-300">Indicações Aprovadas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400">{stats.indicacoesAprovadas}</div>
            <p className="text-xs text-yellow-300">
              {Math.round((stats.indicacoesAprovadas / stats.totalIndicacoes) * 100)}% de aprovação
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-black to-gray-900 border-yellow-600 shadow-lg shadow-yellow-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-300">Valor Total</CardTitle>
            <DollarSign className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400">
              R$ {stats.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-yellow-300">
              +8% em relação ao mês passado
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-black to-gray-900 border-yellow-600 shadow-lg shadow-yellow-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-300">Meta Mensal</CardTitle>
            <Target className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400">
              {Math.round(progressoMeta)}%
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(progressoMeta, 100)}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card className="bg-gradient-to-br from-black to-gray-900 border-yellow-600 shadow-lg shadow-yellow-500/10">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Atividades Recentes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {stats.notificacoes.map((notificacao) => (
                <div key={notificacao.id} className="flex items-start gap-3 p-3 rounded-lg bg-yellow-900/10 border border-yellow-600/30">
                  <div className="w-8 h-8 bg-gradient-to-tr from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                    {notificacao.tipo === 'aprovacao' && <CheckCircle className="w-4 h-4 text-black" />}
                    {notificacao.tipo === 'pagamento' && <DollarSign className="w-4 h-4 text-black" />}
                    {notificacao.tipo === 'meta' && <Target className="w-4 h-4 text-black" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-yellow-300 text-sm">{notificacao.mensagem}</p>
                    <p className="text-yellow-400/60 text-xs mt-1">{notificacao.data}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card className="bg-gradient-to-br from-black to-gray-900 border-yellow-600 shadow-lg shadow-yellow-500/10">
            <CardHeader>
              <CardTitle className="text-yellow-400">Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold py-3 rounded-lg shadow-lg shadow-yellow-500/20 transition-all duration-200">
                <Plus className="w-4 h-4 mr-2" />
                Nova Indicação
              </Button>

              <Button variant="outline" className="w-full border-yellow-600 text-yellow-300 hover:bg-yellow-700/20 py-3 rounded-lg transition-all duration-200">
                <Eye className="w-4 h-4 mr-2" />
                Ver Todas as Indicações
              </Button>

              <Button variant="outline" className="w-full border-yellow-600 text-yellow-300 hover:bg-yellow-700/20 py-3 rounded-lg transition-all duration-200">
                <DollarSign className="w-4 h-4 mr-2" />
                Ver Pagamentos
              </Button>

              <Button variant="outline" className="w-full border-yellow-600 text-yellow-300 hover:bg-yellow-700/20 py-3 rounded-lg transition-all duration-200">
                <Target className="w-4 h-4 mr-2" />
                Ver Metas
              </Button>
            </CardContent>
          </Card>

          {/* Status Indicators */}
          <Card className="bg-gradient-to-br from-black to-gray-900 border-yellow-600 shadow-lg shadow-yellow-500/10 mt-6">
            <CardHeader>
              <CardTitle className="text-yellow-400">Status do Sistema</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-yellow-300 text-sm">Conexão Supabase</span>
                <Badge className="bg-green-600 text-white">Online</Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-yellow-300 text-sm">Última Sincronização</span>
                <Badge className="bg-yellow-600 text-black">2 min atrás</Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-yellow-300 text-sm">Notificações</span>
                <Badge className="bg-blue-600 text-white">{stats.notificacoes.length} novas</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
