import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import {
  DollarSign,
  Search,
  Filter,
  Download,
  Calendar,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  CreditCard,
  Eye,
  FileText
} from "lucide-react";

export default function Pagamentos() {
  const [pagamentos, setPagamentos] = useState([]);
  const [filteredPagamentos, setFilteredPagamentos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [dateFilter, setDateFilter] = useState("");
  const [stats, setStats] = useState({
    totalPago: 0,
    totalPendente: 0,
    totalComissoes: 0,
    mediaMensal: 0
  });

  useEffect(() => {
    // Mock data for demonstration
    const mockPagamentos = [
      {
        id: 1,
        descricao: "Comissão - Indicação João Silva",
        valor: 150.00,
        status: "pago",
        dataPagamento: "2024-01-15",
        dataVencimento: "2024-01-15",
        metodo: "PIX",
        referencia: "IND-001"
      },
      {
        id: 2,
        descricao: "Comissão - Indicação Maria Santos",
        valor: 225.50,
        status: "pago",
        dataPagamento: "2024-01-14",
        dataVencimento: "2024-01-14",
        metodo: "Transferência",
        referencia: "IND-002"
      },
      {
        id: 3,
        descricao: "Comissão - Indicação Tech Solutions",
        valor: 320.00,
        status: "pendente",
        dataPagamento: null,
        dataVencimento: "2024-01-20",
        metodo: "PIX",
        referencia: "IND-003"
      },
      {
        id: 4,
        descricao: "Comissão - Indicação Carlos Oliveira",
        valor: 180.75,
        status: "atrasado",
        dataPagamento: null,
        dataVencimento: "2024-01-10",
        metodo: "PIX",
        referencia: "IND-004"
      },
      {
        id: 5,
        descricao: "Bônus Performance Janeiro",
        valor: 500.00,
        status: "pago",
        dataPagamento: "2024-01-01",
        dataVencimento: "2024-01-01",
        metodo: "PIX",
        referencia: "BON-001"
      }
    ];
    setPagamentos(mockPagamentos);
    setFilteredPagamentos(mockPagamentos);

    // Calculate stats
    const totalPago = mockPagamentos
      .filter(p => p.status === "pago")
      .reduce((sum, p) => sum + p.valor, 0);

    const totalPendente = mockPagamentos
      .filter(p => p.status === "pendente")
      .reduce((sum, p) => sum + p.valor, 0);

    const totalComissoes = mockPagamentos
      .filter(p => p.referencia.startsWith("IND"))
      .reduce((sum, p) => sum + p.valor, 0);

    setStats({
      totalPago,
      totalPendente,
      totalComissoes,
      mediaMensal: totalPago / 12 // Mock monthly average
    });
  }, []);

  useEffect(() => {
    let filtered = pagamentos;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(pagamento =>
        pagamento.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pagamento.referencia.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "todos") {
      filtered = filtered.filter(pagamento => pagamento.status === statusFilter);
    }

    // Filter by date
    if (dateFilter) {
      filtered = filtered.filter(pagamento =>
        pagamento.dataVencimento === dateFilter ||
        pagamento.dataPagamento === dateFilter
      );
    }

    setFilteredPagamentos(filtered);
  }, [searchTerm, statusFilter, dateFilter, pagamentos]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "pago":
        return <Badge className="bg-green-600 text-white">Pago</Badge>;
      case "pendente":
        return <Badge className="bg-yellow-600 text-black">Pendente</Badge>;
      case "atrasado":
        return <Badge className="bg-red-600 text-white">Atrasado</Badge>;
      default:
        return <Badge className="bg-gray-600 text-white">Desconhecido</Badge>;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pago":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "pendente":
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case "atrasado":
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const handleExport = () => {
    // Mock export functionality
    alert("Relatório exportado com sucesso!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-yellow-400 mb-2">Pagamentos</h1>
          <p className="text-yellow-300">Acompanhe seus pagamentos e comissões</p>
        </div>
        <Button
          onClick={handleExport}
          className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold px-6 py-3 rounded-lg shadow-lg shadow-yellow-500/20"
        >
          <Download className="w-5 h-5 mr-2" />
          Exportar Relatório
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-black to-gray-900 border-yellow-600 shadow-lg shadow-yellow-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-300">Total Pago</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400">
              R$ {stats.totalPago.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-yellow-300">
              Este mês
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-black to-gray-900 border-yellow-600 shadow-lg shadow-yellow-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-300">Pendente</CardTitle>
            <Clock className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400">
              R$ {stats.totalPendente.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-yellow-300">
              Aguardando pagamento
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-black to-gray-900 border-yellow-600 shadow-lg shadow-yellow-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-300">Total Comissões</CardTitle>
            <TrendingUp className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400">
              R$ {stats.totalComissoes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-yellow-300">
              +15% em relação ao mês passado
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-black to-gray-900 border-yellow-600 shadow-lg shadow-yellow-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-300">Média Mensal</CardTitle>
            <Calendar className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400">
              R$ {stats.mediaMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-yellow-300">
              Últimos 12 meses
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-gradient-to-br from-black to-gray-900 border-yellow-600 shadow-lg shadow-yellow-500/10">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-yellow-400" />
                <Input
                  placeholder="Buscar por descrição ou referência..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-yellow-600 text-yellow-400 placeholder-yellow-400/50 focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-gray-800 border border-yellow-600 text-yellow-400 rounded-lg px-3 py-2 focus:border-yellow-500 focus:ring-yellow-500"
              >
                <option value="todos">Todos os Status</option>
                <option value="pago">Pago</option>
                <option value="pendente">Pendente</option>
                <option value="atrasado">Atrasado</option>
              </select>
              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="bg-gray-800 border-yellow-600 text-yellow-400 focus:border-yellow-500 focus:ring-yellow-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payments List */}
      <div className="grid gap-4">
        {filteredPagamentos.map((pagamento) => (
          <Card key={pagamento.id} className="bg-gradient-to-br from-black to-gray-900 border-yellow-600 shadow-lg shadow-yellow-500/10">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-tr from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-yellow-400">{pagamento.descricao}</h3>
                      <p className="text-yellow-300 text-sm">Ref: {pagamento.referencia}</p>
                    </div>
                    {getStatusBadge(pagamento.status)}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-300 font-semibold">
                        R$ {pagamento.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-300">{pagamento.metodo}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-300">Venc: {pagamento.dataVencimento}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {pagamento.dataPagamento ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-yellow-300">Pago: {pagamento.dataPagamento}</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-4 h-4 text-yellow-400" />
                          <span className="text-yellow-300">Não pago</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-yellow-600 text-yellow-300 hover:bg-yellow-700/20"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Detalhes
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-yellow-600 text-yellow-300 hover:bg-yellow-700/20"
                  >
                    <FileText className="w-4 h-4 mr-1" />
                    Recibo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPagamentos.length === 0 && (
        <Card className="bg-gradient-to-br from-black to-gray-900 border-yellow-600 shadow-lg shadow-yellow-500/10">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-gradient-to-tr from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-xl font-semibold text-yellow-400 mb-2">Nenhum pagamento encontrado</h3>
            <p className="text-yellow-300 mb-6">Não há pagamentos que correspondam aos filtros aplicados.</p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("todos");
                setDateFilter("");
              }}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold px-6 py-3 rounded-lg shadow-lg shadow-yellow-500/20"
            >
              Limpar Filtros
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
