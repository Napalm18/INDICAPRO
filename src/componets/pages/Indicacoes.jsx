import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Plus, Search, Download, Trash2, CheckCircle, XCircle, Clock, Phone, User as UserIcon, RefreshCw, AlertTriangle
} from 'lucide-react';
import { toast } from '../ui/use-toast';
import { useNotification } from '../contexts/NotificationContext';

function Indicacoes() {
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const [indicacoes, setIndicacoes] = useState([]);
  const [lixeira, setLixeira] = useState([]);
  const [filteredIndicacoes, setFilteredIndicacoes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ nome: '', telefone: '', quemIndicou: '' });
  const [selectedLixeira, setSelectedLixeira] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterIndicacoes();
  }, [indicacoes, searchTerm, user]);

  const loadData = () => {
    const savedIndicacoes = JSON.parse(localStorage.getItem('indicacoes') || '[]');
    setIndicacoes(savedIndicacoes);
    if (user.role === 'gestor') {
      const savedLixeira = JSON.parse(localStorage.getItem('lixeira') || '[]');
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const filteredLixeira = savedLixeira.filter(item => new Date(item.deletedAt) > thirtyDaysAgo);
      setLixeira(filteredLixeira);
      if (filteredLixeira.length !== savedLixeira.length) {
        localStorage.setItem('lixeira', JSON.stringify(filteredLixeira));
      }
    }
  };

  const filterIndicacoes = () => {
    let filtered = user.role === 'vendedor' ? indicacoes.filter(ind => ind.vendedorId === user.id) : indicacoes;
    if (searchTerm) {
      filtered = filtered.filter(ind =>
        ind.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ind.telefone.includes(searchTerm)
      );
    }
    setFilteredIndicacoes(filtered.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newIndicacao = {
      id: Date.now().toString(),
      ...formData,
      vendedorId: user.id,
      vendedorNome: user.name,
      status: 'pendente',
      createdAt: new Date().toISOString(),
      pago: false,
      tipo: null
    };
    const updatedIndicacoes = [...indicacoes, newIndicacao];
    setIndicacoes(updatedIndicacoes);
    localStorage.setItem('indicacoes', JSON.stringify(updatedIndicacoes));
    setFormData({ nome: '', telefone: '', quemIndicou: '' });
    setIsDialogOpen(false);
    toast({ title: "Indicação cadastrada!" });

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const gestores = users.filter(u => u.role === 'gestor');
    gestores.forEach(gestor => addNotification(gestor.id, `Nova indicação de ${user.name}: ${newIndicacao.nome}`));
  };

  const deleteIndicacao = (id) => {
    const motivo = "Exclusão pelo gestor";
    
    const indicacaoToDelete = indicacoes.find(ind => ind.id === id);
    const updatedIndicacoes = indicacoes.filter(ind => ind.id !== id);
    setIndicacoes(updatedIndicacoes);
    localStorage.setItem('indicacoes', JSON.stringify(updatedIndicacoes));

    const currentLixeira = JSON.parse(localStorage.getItem('lixeira') || '[]');
    const deletedItem = { ...indicacaoToDelete, deletedAt: new Date().toISOString(), motivo: motivo };
    const updatedLixeira = [...currentLixeira, deletedItem];
    setLixeira(updatedLixeira);
    localStorage.setItem('lixeira', JSON.stringify(updatedLixeira));
    toast({ title: "Indicação movida para a lixeira" });
  };
  
  const handleLixeiraSelection = (id) => {
    setSelectedLixeira(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectAllLixeira = (checked) => {
    if (checked) {
      setSelectedLixeira(lixeira.map(item => item.id));
    } else {
      setSelectedLixeira([]);
    }
  };

  const restoreSelected = () => {
    const itemsToRestore = lixeira.filter(item => selectedLixeira.includes(item.id));
    const remainingLixeira = lixeira.filter(item => !selectedLixeira.includes(item.id));
    
    setLixeira(remainingLixeira);
    localStorage.setItem('lixeira', JSON.stringify(remainingLixeira));
    
    const updatedIndicacoes = [...indicacoes, ...itemsToRestore];
    setIndicacoes(updatedIndicacoes);
    localStorage.setItem('indicacoes', JSON.stringify(updatedIndicacoes));
    
    setSelectedLixeira([]);
    toast({ title: `${itemsToRestore.length} indicações restauradas!` });
  };

  const permanentlyDeleteSelected = () => {
    const remainingLixeira = lixeira.filter(item => !selectedLixeira.includes(item.id));
    setLixeira(remainingLixeira);
    localStorage.setItem('lixeira', JSON.stringify(remainingLixeira));
    setSelectedLixeira([]);
    toast({ title: `${selectedLixeira.length} indicações excluídas permanentemente!` });
  };
  
  const emptyLixeira = () => {
    setLixeira([]);
    localStorage.setItem('lixeira', '[]');
    toast({ title: "Lixeira esvaziada!" });
  };

  const getStatusBadge = (status) => {
    const variants = {
      'pendente': { variant: 'secondary', icon: Clock, color: 'text-yellow-600' },
      'aprovada': { variant: 'default', icon: CheckCircle, color: 'text-green-600' },
      'reprovada': { variant: 'destructive', icon: XCircle, color: 'text-red-600' }
    };
    const config = variants[status];
    const Icon = config.icon;
    return <Badge variant={config.variant} className="flex items-center gap-1"><Icon className={`h-3 w-3 ${config.color}`} />{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
  };
  
  const renderIndicacoesList = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-4">
      {filteredIndicacoes.length === 0 ? (
        <Card className="glass-effect"><CardContent className="flex flex-col items-center justify-center py-12"><UserIcon className="h-12 w-12 text-muted-foreground mb-4" /><p className="text-lg font-medium">Nenhuma indicação encontrada</p></CardContent></Card>
      ) : (
        filteredIndicacoes.map((indicacao, index) => (
          <motion.div key={indicacao.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
            <Card className="glass-effect hover:shadow-lg transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{indicacao.nome}</h3>
                      {getStatusBadge(indicacao.status)}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2"><Phone className="h-4 w-4" />{indicacao.telefone}</div>
                      <div className="flex items-center gap-2"><UserIcon className="h-4 w-4" />Indicado por: {indicacao.quemIndicou}</div>
                      {user.role === 'gestor' && <div>Vendedor: {indicacao.vendedorNome}</div>}
                    </div>
                  </div>
                  {user.role === 'gestor' && <Button size="sm" variant="outline" onClick={() => deleteIndicacao(indicacao.id)}><Trash2 className="h-4 w-4" /></Button>}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))
      )}
    </motion.div>
  );

  const renderLixeira = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button onClick={restoreSelected} disabled={selectedLixeira.length === 0} className="bg-blue-600 hover:bg-blue-700"><RefreshCw className="h-4 w-4 mr-2"/>Restaurar</Button>
          <Button variant="destructive" onClick={permanentlyDeleteSelected} disabled={selectedLixeira.length === 0}><AlertTriangle className="h-4 w-4 mr-2"/>Excluir Permanente</Button>
        </div>
        <Button variant="destructive" onClick={emptyLixeira}><Trash2 className="h-4 w-4 mr-2"/>Esvaziar Lixeira</Button>
      </div>
      {lixeira.length === 0 ? (
        <Card className="glass-effect"><CardContent className="flex flex-col items-center justify-center py-12"><Trash2 className="h-12 w-12 text-muted-foreground mb-4" /><p className="text-lg font-medium">A lixeira está vazia</p></CardContent></Card>
      ) : (
        <>
          <div className="flex items-center p-2 border-b">
            <Checkbox 
              id="select-all"
              onCheckedChange={handleSelectAllLixeira}
              checked={selectedLixeira.length === lixeira.length && lixeira.length > 0}
            />
            <Label htmlFor="select-all" className="ml-3 font-semibold">Selecionar Todos</Label>
          </div>
          {lixeira.map((item, index) => (
            <motion.div key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
              <Card className="glass-effect bg-muted/40">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Checkbox 
                        checked={selectedLixeira.includes(item.id)}
                        onCheckedChange={() => handleLixeiraSelection(item.id)}
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{item.nome}</h3>
                        <p className="text-sm text-muted-foreground">Excluído em: {new Date(item.deletedAt).toLocaleString('pt-BR')}</p>
                        <p className="text-sm text-muted-foreground">Motivo: {item.motivo}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </>
      )}
    </motion.div>
  );

  return (
    <>
      <Helmet><title>Indicações</title></Helmet>
      <div className="p-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Indicações</h1>
          <div className="flex gap-2">
            {user.role === 'gestor' && <Button variant="outline" onClick={() => toast({title: "🚧 Em desenvolvimento"})}><Download className="h-4 w-4 mr-2"/>Exportar</Button>}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild><Button className="gradient-bg text-primary-foreground"><Plus className="h-4 w-4 mr-2" />Nova Indicação</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Nova Indicação</DialogTitle></DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2"><Label htmlFor="nome">Nome</Label><Input id="nome" value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} required/></div>
                  <div className="space-y-2"><Label htmlFor="telefone">Telefone</Label><Input id="telefone" value={formData.telefone} onChange={(e) => setFormData({...formData, telefone: e.target.value})} required/></div>
                  <div className="space-y-2"><Label htmlFor="quemIndicou">Quem Indicou</Label><Input id="quemIndicou" value={formData.quemIndicou} onChange={(e) => setFormData({...formData, quemIndicou: e.target.value})} required/></div>
                  <DialogFooter><Button type="submit" className="gradient-bg text-primary-foreground">Cadastrar</Button></DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>
        
        <Tabs defaultValue="indicacoes">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="indicacoes">Minhas Indicações</TabsTrigger>
            {user.role === 'gestor' && <TabsTrigger value="lixeira">Lixeira</TabsTrigger>}
          </TabsList>
          <TabsContent value="indicacoes">
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Buscar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
            </div>
            {renderIndicacoesList()}
          </TabsContent>
          {user.role === 'gestor' && <TabsContent value="lixeira">{renderLixeira()}</TabsContent>}
        </Tabs>
      </div>
    </>
  );
}

export default Indicacoes;