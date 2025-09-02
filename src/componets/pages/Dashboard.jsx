import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/componets/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/componets/ui/card';
import { Button } from '@/componets/ui/button';
import { Input } from '@/componets/ui/input';
import { Progress } from '@/componets/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/componets/ui/select';
import { cn } from '@/componets/lib/utils';
import {
  DollarSign,
  Users,
  CheckCircle,
  Clock,
  XCircle,
  Calculator,
  Gift,
  Search,
  Building,
  Calendar,
  Trash2
} from 'lucide-react';
import { toast } from '@/componets/ui/use-toast';
import { useNotification } from '@/componets/contexts/NotificationContext';

function Dashboard() {
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const [indicacoes, setIndicacoes] = useState([]);
  const [metas, setMetas] = useState({ mensal: 10, anual: 120, bonusMensal: 500, bonusAnual: 2000 });
  const [comissoes, setComissoes] = useState({ evento: 100, cartorio: 150 });
  const [usersList, setUsersList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 3000); 
    return () => clearInterval(interval);
  }, []);
  
  const loadData = () => {
    const savedIndicacoes = JSON.parse(localStorage.getItem('indicacoes') || '[]');
    const savedMetas = JSON.parse(localStorage.getItem('metas') || '{"mensal": 10, "anual": 120, "bonusMensal": 500, "bonusAnual": 2000}');
    const savedComissoes = JSON.parse(localStorage.getItem('comissoes') || '{"evento": 100, "cartorio": 150}');
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');

    setIndicacoes(savedIndicacoes);
    setMetas(savedMetas);
    setComissoes(savedComissoes);
    setUsersList(savedUsers.filter(u => u.role === 'vendedor'));
  };

  const getFilteredIndicacoes = () => {
    let filtered = indicacoes;

    if (user.role === 'vendedor') {
      return filtered.filter(ind => ind.vendedorId === user.id);
    }

    if (searchTerm) {
      filtered = filtered.filter(ind =>
        ind.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ind.vendedorNome.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const indicacoesUsuario = getFilteredIndicacoes();
  const indicacoesMesAtual = indicacoes.filter(ind => new Date(ind.createdAt).getMonth() === new Date().getMonth());

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const vendedorIndicacoesAprovadas = indicacoes.filter(i => i.vendedorId === user.id && i.status === 'aprovada');
  
  const indicacoesMesAtualVendedor = vendedorIndicacoesAprovadas.filter(ind => {
    const indDate = new Date(ind.createdAt);
    return indDate.getMonth() === currentMonth && indDate.getFullYear() === currentYear;
  });

  const indicacoesAnoAtualVendedor = vendedorIndicacoesAprovadas.filter(ind => {
    const indDate = new Date(ind.createdAt);
    return indDate.getFullYear() === currentYear;
  });

  const progressoMensal = metas.mensal > 0 ? Math.min((indicacoesMesAtualVendedor.length / metas.mensal) * 100, 100) : 0;
  const progressoAnual = metas.anual > 0 ? Math.min((indicacoesAnoAtualVendedor.length / metas.anual) * 100, 100) : 0;

  const calcularComissao = (tipo) => {
    const valor = tipo === 'evento' ? comissoes.evento : comissoes.cartorio;
    toast({
      title: `Calculadora de Comissão (${tipo})`,
      description: `Valor por indicação: R$ ${valor.toFixed(2)}`,
    });
  };

  const updateIndicacaoStatus = (id, newStatus) => {
    const updatedIndicacoes = indicacoes.map(ind =>
      ind.id === id ? { ...ind, status: ind.status === newStatus ? 'pendente' : newStatus } : ind
    );
    setIndicacoes(updatedIndicacoes);
    localStorage.setItem('indicacoes', JSON.stringify(updatedIndicacoes));
    const targetIndicacao = updatedIndicacoes.find(i => i.id === id);
    if(newStatus === 'aprovada') {
      addNotification(targetIndicacao.vendedorId, `Sua indicação para ${targetIndicacao.nome} foi APROVADA!`);
    }
    if(newStatus === 'reprovada') {
      addNotification(targetIndicacao.vendedorId, `Sua indicação para ${targetIndicacao.nome} foi REPROVADA.`);
    }
  };

  const updateIndicacaoTipo = (id, newTipo) => {
    const updatedIndicacoes = indicacoes.map(ind =>
      ind.id === id ? { ...ind, tipo: ind.tipo === newTipo ? null : newTipo } : ind
    );
    setIndicacoes(updatedIndicacoes);
    localStorage.setItem('indicacoes', JSON.stringify(updatedIndicacoes));
  };


  const deleteIndicacao = (id, motivo) => {
    const indicacaoToDelete = indicacoes.find(ind => ind.id === id);
    const updatedIndicacoes = indicacoes.filter(ind => ind.id !== id);
    
    setIndicacoes(updatedIndicacoes);
    localStorage.setItem('indicacoes', JSON.stringify(updatedIndicacoes));
    
    const lixeira = JSON.parse(localStorage.getItem('lixeira') || '[]');
    const deletedItem = { ...indicacaoToDelete, deletedAt: new Date().toISOString(), motivo };
    lixeira.push(deletedItem);
    localStorage.setItem('lixeira', JSON.stringify(lixeira));

    toast({
      title: "Indicação excluída",
      description: "A indicação foi movida para a lixeira.",
    });
    
    const gestores = JSON.parse(localStorage.getItem('users') || '[]').filter(u => u.role === 'gestor');
    gestores.forEach(gestor => {
      addNotification(gestor.id, `O vendedor ${user.name} excluiu uma indicação. Motivo: ${motivo}`);
    });
  };

  const showDeleteDialog = (id) => {
    const motivo = prompt("Por favor, informe o motivo da exclusão:");
    if (motivo) {
      deleteIndicacao(id, motivo);
    } else {
      toast({ title: "Exclusão cancelada", description: "O motivo é obrigatório.", variant: "destructive" });
    }
  };
  

  const renderVendedorDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <Card className={`glass-effect ${progressoMensal >= 100 ? 'border-primary shadow-lg' : ''}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Gift className="h-5 w-5 text-primary"/>Bônus Mensal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">R$ {metas.bonusMensal.toFixed(2)}</p>
              <p className="text-muted-foreground">Meta: {metas.mensal} indicações</p>
              <Progress value={progressoMensal} className="mt-2 progress-bar" />
              <p className="text-right text-sm mt-1">{indicacoesMesAtualVendedor.length}/{metas.mensal}</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <Card className={`glass-effect ${progressoAnual >= 100 ? 'border-primary shadow-lg' : ''}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Gift className="h-5 w-5 text-primary"/>Bônus Anual</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">R$ {metas.bonusAnual.toFixed(2)}</p>
              <p className="text-muted-foreground">Meta: {metas.anual} indicações</p>
              <Progress value={progressoAnual} className="mt-2 progress-bar" />
              <p className="text-right text-sm mt-1">{indicacoesAnoAtualVendedor.length}/{metas.anual}</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Calculator className="h-5 w-5"/>Calculadora de Comissão</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Button onClick={() => calcularComissao('evento')} className="flex-1 gradient-bg text-primary-foreground">Evento (R$ {comissoes.evento})</Button>
            <Button onClick={() => calcularComissao('cartorio')} className="flex-1 gradient-bg text-primary-foreground">Cartório (R$ {comissoes.cartorio})</Button>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card>
          <CardHeader><CardTitle>Minhas Últimas Indicações</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {getFilteredIndicacoes().slice(0, 5).map(ind => (
                <div key={ind.id} className="flex items-center justify-between p-2 border rounded-lg">
                  <div>
                    <p className="font-semibold">{ind.nome}</p>
                    <p className="text-sm text-muted-foreground">{new Date(ind.createdAt).toLocaleDateString()}</p>
                  </div>
                  <Button size="sm" variant="destructive" onClick={() => showDeleteDialog(ind.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
  
  const renderGestorDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card><CardHeader><CardTitle>Total</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{indicacoes.length}</p></CardContent></Card>
          <Card><CardHeader><CardTitle>Mês</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{indicacoesMesAtual.length}</p></CardContent></Card>
          <Card><CardHeader><CardTitle className="text-green-500">Aprovadas</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{indicacoes.filter(i => i.status === 'aprovada').length}</p></CardContent></Card>
          <Card><CardHeader><CardTitle className="text-yellow-500">Pendentes</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{indicacoes.filter(i => i.status === 'pendente').length}</p></CardContent></Card>
          <Card><CardHeader><CardTitle className="text-red-500">Reprovadas</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{indicacoes.filter(i => i.status === 'reprovada').length}</p></CardContent></Card>
      </div>
      
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Buscar por nome do indicado ou vendedor..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10"/>
        </div>
      </div>
      
      <Card>
        <CardHeader><CardTitle>Lista de Indicações</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {getFilteredIndicacoes().slice(0, 10).map(ind => (
              <div key={ind.id} className="flex items-center justify-between p-2 border rounded-lg">
                <div>
                  <p className="font-semibold">{ind.nome}</p>
                  <p className="text-sm text-muted-foreground">{ind.vendedorNome} - {new Date(ind.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" onClick={() => updateIndicacaoStatus(ind.id, 'aprovada')} className={cn(ind.status === 'aprovada' ? 'bg-green-600' : 'bg-secondary')}><CheckCircle className="h-4 w-4" /></Button>
                  <Button size="icon" variant={ind.status === 'reprovada' ? 'destructive': 'secondary'} onClick={() => updateIndicacaoStatus(ind.id, 'reprovada')}><XCircle className="h-4 w-4" /></Button>
                  <Button size="sm" variant={ind.tipo === 'cartorio' ? 'default': 'outline'} onClick={() => updateIndicacaoTipo(ind.id, 'cartorio')}>Cartório</Button>
                  <Button size="sm" variant={ind.tipo === 'evento' ? 'default': 'outline'} onClick={() => updateIndicacaoTipo(ind.id, 'evento')}>Evento</Button>
                  <Button size="icon" variant="destructive" onClick={() => deleteIndicacao(ind.id, "Exclusão pelo gestor")}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Dashboard - Sistema de Indicações</title>
      </Helmet>
      <div className="p-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Bem-vindo, {user.name}!</p>
        </motion.div>
        
        {user.role === 'vendedor' ? renderVendedorDashboard() : renderGestorDashboard()}
      </div>
    </>
  );
}

export default Dashboard;