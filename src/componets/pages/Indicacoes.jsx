import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Phone,
  Mail,
  Calendar,
  DollarSign
} from "lucide-react";

export default function Indicacoes() {
  const [indicacoes, setIndicacoes] = useState([]);
  const [filteredIndicacoes, setFilteredIndicacoes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [showForm, setShowForm] = useState(false);
  const [editingIndicacao, setEditingIndicacao] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    empresa: "",
    valorEstimado: "",
    descricao: ""
  });

  useEffect(() => {
    // Mock data for demonstration
    const mockIndicacoes = [
      {
        id: 1,
        nome: "João Silva",
        email: "joao.silva@email.com",
        telefone: "(11) 99999-9999",
        empresa: "Empresa ABC Ltda",
        valorEstimado: 2500,
        descricao: "Cliente interessado em nossos serviços premium",
        status: "aprovada",
        dataCriacao: "2024-01-15",
        dataAtualizacao: "2024-01-16"
      },
      {
        id: 2,
        nome: "Maria Santos",
        email: "maria.santos@email.com",
        telefone: "(11) 88888-8888",
        empresa: "Tech Solutions Inc",
        valorEstimado: 1800,
        descricao: "Prospecto de médio porte",
        status: "pendente",
        dataCriacao: "2024-01-14",
        dataAtualizacao: "2024-01-14"
      },
      {
        id: 3,
        nome: "Carlos Oliveira",
        email: "carlos.oliveira@email.com",
        telefone: "(11) 77777-7777",
        empresa: "StartUp XYZ",
        valorEstimado: 3200,
        descricao: "Cliente em fase de negociação",
        status: "rejeitada",
        dataCriacao: "2024-01-13",
        dataAtualizacao: "2024-01-15"
      }
    ];
    setIndicacoes(mockIndicacoes);
    setFilteredIndicacoes(mockIndicacoes);
  }, []);

  useEffect(() => {
    let filtered = indicacoes;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(indicacao =>
        indicacao.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        indicacao.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        indicacao.empresa.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "todos") {
      filtered = filtered.filter(indicacao => indicacao.status === statusFilter);
    }

    setFilteredIndicacoes(filtered);
  }, [searchTerm, statusFilter, indicacoes]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingIndicacao) {
      // Update existing indicacao
      setIndicacoes(prev =>
        prev.map(ind =>
          ind.id === editingIndicacao.id
            ? { ...ind, ...formData, dataAtualizacao: new Date().toISOString().split('T')[0] }
            : ind
        )
      );
    } else {
      // Create new indicacao
      const newIndicacao = {
        id: Date.now(),
        ...formData,
        status: "pendente",
        dataCriacao: new Date().toISOString().split('T')[0],
        dataAtualizacao: new Date().toISOString().split('T')[0]
      };
      setIndicacoes(prev => [...prev, newIndicacao]);
    }

    // Reset form
    setFormData({
      nome: "",
      email: "",
      telefone: "",
      empresa: "",
      valorEstimado: "",
      descricao: ""
    });
    setShowForm(false);
    setEditingIndicacao(null);
  };

  const handleEdit = (indicacao) => {
    setEditingIndicacao(indicacao);
    setFormData({
      nome: indicacao.nome,
      email: indicacao.email,
      telefone: indicacao.telefone,
      empresa: indicacao.empresa,
      valorEstimado: indicacao.valorEstimado,
      descricao: indicacao.descricao
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta indicação?")) {
      setIndicacoes(prev => prev.filter(ind => ind.id !== id));
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "aprovada":
        return <Badge className="bg-green-600 text-white">Aprovada</Badge>;
      case "pendente":
        return <Badge className="bg-yellow-600 text-black">Pendente</Badge>;
      case "rejeitada":
        return <Badge className="bg-red-600 text-white">Rejeitada</Badge>;
      default:
        return <Badge className="bg-gray-600 text-white">Desconhecido</Badge>;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "aprovada":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "pendente":
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case "rejeitada":
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-yellow-400 mb-2">Indicações</h1>
          <p className="text-yellow-300">Gerencie suas indicações de clientes</p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold px-6 py-3 rounded-lg shadow-lg shadow-yellow-500/20"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nova Indicação
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="bg-gradient-to-br from-black to-gray-900 border-yellow-600 shadow-lg shadow-yellow-500/10">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-yellow-400" />
                <Input
                  placeholder="Buscar por nome, email ou empresa..."
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
                <option value="aprovada">Aprovadas</option>
                <option value="pendente">Pendentes</option>
                <option value="rejeitada">Rejeitadas</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Modal */}
      {showForm && (
        <Card className="bg-gradient-to-br from-black to-gray-900 border-yellow-600 shadow-lg shadow-yellow-500/10">
          <CardHeader>
            <CardTitle className="text-yellow-400">
              {editingIndicacao ? "Editar Indicação" : "Nova Indicação"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome" className="text-yellow-300">Nome Completo</Label>
                  <Input
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    className="bg-gray-800 border-yellow-600 text-yellow-400 placeholder-yellow-400/50 focus:border-yellow-500 focus:ring-yellow-500"
                    placeholder="Nome do indicado"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-yellow-300">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-gray-800 border-yellow-600 text-yellow-400 placeholder-yellow-400/50 focus:border-yellow-500 focus:ring-yellow-500"
                    placeholder="email@exemplo.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone" className="text-yellow-300">Telefone</Label>
                  <Input
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    className="bg-gray-800 border-yellow-600 text-yellow-400 placeholder-yellow-400/50 focus:border-yellow-500 focus:ring-yellow-500"
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="empresa" className="text-yellow-300">Empresa</Label>
                  <Input
                    id="empresa"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleInputChange}
                    className="bg-gray-800 border-yellow-600 text-yellow-400 placeholder-yellow-400/50 focus:border-yellow-500 focus:ring-yellow-500"
                    placeholder="Nome da empresa"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="valorEstimado" className="text-yellow-300">Valor Estimado (R$)</Label>
                  <Input
                    id="valorEstimado"
                    name="valorEstimado"
                    type="number"
                    value={formData.valorEstimado}
                    onChange={handleInputChange}
                    className="bg-gray-800 border-yellow-600 text-yellow-400 placeholder-yellow-400/50 focus:border-yellow-500 focus:ring-yellow-500"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="descricao" className="text-yellow-300">Descrição</Label>
                <textarea
                  id="descricao"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-yellow-600 text-yellow-400 placeholder-yellow-400/50 focus:border-yellow-500 focus:ring-yellow-500 rounded-lg px-3 py-2 min-h-[100px] resize-none"
                  placeholder="Descrição da indicação..."
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold px-6 py-2 rounded-lg shadow-lg shadow-yellow-500/20"
                >
                  {editingIndicacao ? "Atualizar" : "Salvar"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setEditingIndicacao(null);
                    setFormData({
                      nome: "",
                      email: "",
                      telefone: "",
                      empresa: "",
                      valorEstimado: "",
                      descricao: ""
                    });
                  }}
                  className="border-yellow-600 text-yellow-300 hover:bg-yellow-700/20 px-6 py-2 rounded-lg"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Indications List */}
      <div className="grid gap-4">
        {filteredIndicacoes.map((indicacao) => (
          <Card key={indicacao.id} className="bg-gradient-to-br from-black to-gray-900 border-yellow-600 shadow-lg shadow-yellow-500/10">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-tr from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-yellow-400">{indicacao.nome}</h3>
                      <p className="text-yellow-300 text-sm">{indicacao.empresa}</p>
                    </div>
                    {getStatusBadge(indicacao.status)}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-300">{indicacao.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-300">{indicacao.telefone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-300">R$ {indicacao.valorEstimado.toLocaleString('pt-BR')}</span>
                    </div>
                  </div>

                  <p className="text-yellow-300/80 text-sm mt-3 line-clamp-2">{indicacao.descricao}</p>

                  <div className="flex items-center gap-4 mt-3 text-xs text-yellow-400/60">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>Criado: {indicacao.dataCriacao}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Atualizado: {indicacao.dataAtualizacao}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(indicacao)}
                    className="border-yellow-600 text-yellow-300 hover:bg-yellow-700/20"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(indicacao.id)}
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

      {filteredIndicacoes.length === 0 && (
        <Card className="bg-gradient-to-br from-black to-gray-900 border-yellow-600 shadow-lg shadow-yellow-500/10">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-gradient-to-tr from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-xl font-semibold text-yellow-400 mb-2">Nenhuma indicação encontrada</h3>
            <p className="text-yellow-300 mb-6">Comece criando sua primeira indicação!</p>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold px-6 py-3 rounded-lg shadow-lg shadow-yellow-500/20"
            >
              <Plus className="w-5 h-5 mr-2" />
              Criar Primeira Indicação
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
