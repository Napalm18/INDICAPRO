import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Trash2, Users } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

function UsersTab() {
  const [users, setUsers] = useState([]);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'vendedor' });

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(savedUsers);
  }, []);

  const saveUsers = (updatedUsers) => {
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };
  
  const handleCreateUser = (closeOnSave) => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      toast({ title: "Erro", description: "Preencha todos os campos.", variant: "destructive" });
      return;
    }
    const userExists = users.some(u => u.email === newUser.email);
    if (userExists) {
      toast({ title: "Erro", description: "Email já cadastrado.", variant: "destructive" });
      return;
    }
    const user = { id: Date.now().toString(), ...newUser, pix: '', banco: '', agencia: '', conta: '' };
    const updatedUsers = [...users, user];
    saveUsers(updatedUsers);
    setNewUser({ name: '', email: '', password: '', role: 'vendedor' });
    if (closeOnSave) {
      setIsUserDialogOpen(false);
    }
    toast({ title: "Usuário criado!" });
  };

  const deleteUser = (id) => {
    const updatedUsers = users.filter(u => u.id !== id);
    saveUsers(updatedUsers);
    toast({ title: "Usuário excluído" });
  };
  
  const updateUserRole = (id, role) => {
    const updatedUsers = users.map(u => u.id === id ? { ...u, role } : u);
    saveUsers(updatedUsers);
    toast({ title: "Função do usuário atualizada!" });
  };

  return (
    <Card className="glass-effect">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2"><Users />Usuários do Sistema</CardTitle>
            <CardDescription>Gerencie os usuários e suas permissões</CardDescription>
          </div>
          <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
            <DialogTrigger asChild><Button className="gradient-bg"><Plus className="h-4 w-4 mr-2" />Cadastrar Usuário</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Cadastrar Novo Usuário</DialogTitle></DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2"><Label htmlFor="userName">Nome</Label><Input id="userName" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} /></div>
                <div className="space-y-2"><Label htmlFor="userEmail">Email</Label><Input id="userEmail" type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} /></div>
                <div className="space-y-2"><Label htmlFor="userPassword">Senha</Label><Input id="userPassword" type="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} /></div>
                <div className="space-y-2"><Label htmlFor="userRole">Função</Label>
                  <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="vendedor">Vendedor</SelectItem><SelectItem value="gestor">Administrador (Gestor)</SelectItem></SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter className="justify-between">
                <Button onClick={() => handleCreateUser(false)} variant="outline">Criar Novo</Button>
                <Button onClick={() => handleCreateUser(true)} className="gradient-bg text-primary-foreground">Cadastrar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <div className="flex items-center gap-4">
                <Select value={user.role} onValueChange={(value) => updateUserRole(user.id, value)}>
                  <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="vendedor">Vendedor</SelectItem><SelectItem value="gestor">Administrador (Gestor)</SelectItem></SelectContent>
                </Select>
                <Button variant="destructive" size="sm" onClick={() => deleteUser(user.id)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default UsersTab;