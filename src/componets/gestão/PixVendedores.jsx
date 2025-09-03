import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Search, CreditCard, Landmark, FileText, Hash } from 'lucide-react';
import { motion } from 'framer-motion';

function PixVendedores() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(allUsers);
  }, []);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Dados Bancários (PIX)</CardTitle>
          <CardDescription>Consulte os dados bancários dos vendedores e gestores.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Buscar por nome..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="pl-10"
            />
          </div>
          <div className="space-y-4">
            {filteredUsers.length > 0 ? filteredUsers.map(user => (
              <div key={user.id} className="p-4 border rounded-lg">
                <h3 className="font-semibold text-lg">{user.name} <span className="text-sm font-normal text-muted-foreground">- {user.role}</span></h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-primary" />
                    <strong>PIX:</strong> {user.pix || 'Não informado'}
                  </div>
                   <div className="flex items-center gap-2">
                    <Landmark className="h-4 w-4 text-primary" />
                    <strong>Banco:</strong> {user.banco || 'Não informado'}
                  </div>
                   <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <strong>Agência:</strong> {user.agencia || 'Não informada'}
                  </div>
                   <div className="flex items-center gap-2">
                    <Hash className="h-4 w-4 text-primary" />
                    <strong>Conta:</strong> {user.conta || 'Não informada'}
                  </div>
                </div>
              </div>
            )) : (
              <p className="text-center text-muted-foreground py-8">Nenhum usuário encontrado.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default PixVendedores;