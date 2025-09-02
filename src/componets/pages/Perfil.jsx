import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/componets/contexts/AuthContext';
import { useTheme } from '@/componets/contexts/ThemeContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/componets/ui/card';
import { Button } from '@/componets/ui/button';
import { Input } from '@/componets/ui/input';
import { Label } from '@/componets/ui/label';
import { Switch } from '@/componets/ui/switch';
import { User, Moon, Sun, CreditCard, Save, Palette, Type } from 'lucide-react';
import { toast } from '@/componets/ui/use-toast';

function Perfil() {
  const { user, updateUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    pix: user?.pix || '',
    banco: user?.banco || '',
    agencia: user?.agencia || '',
    conta: user?.conta || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData);
    toast({ title: "Perfil atualizado!", description: "Suas informações foram salvas." });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Helmet><title>Perfil</title></Helmet>
      <div className="p-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold">Meu Perfil</h1>
          <p className="text-muted-foreground">Gerencie suas informações e preferências.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <Card className="glass-effect">
              <CardHeader><CardTitle className="flex items-center gap-2"><User />Informações Pessoais</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2"><Label htmlFor="name">Nome</Label><Input id="name" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} /></div>
                  <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" value={user?.email || ''} disabled /></div>
                  <Button type="submit" className="gradient-bg"><Save className="h-4 w-4 mr-2" />Salvar</Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Card className="glass-effect">
              <CardHeader><CardTitle className="flex items-center gap-2"><CreditCard />Dados Bancários</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2"><Label htmlFor="pix">Chave PIX</Label><Input id="pix" value={formData.pix} onChange={(e) => handleInputChange('pix', e.target.value)} /></div>
                  <div className="space-y-2"><Label htmlFor="banco">Banco</Label><Input id="banco" value={formData.banco} onChange={(e) => handleInputChange('banco', e.target.value)} /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><Label htmlFor="agencia">Agência</Label><Input id="agencia" value={formData.agencia} onChange={(e) => handleInputChange('agencia', e.target.value)} /></div>
                    <div className="space-y-2"><Label htmlFor="conta">Conta</Label><Input id="conta" value={formData.conta} onChange={(e) => handleInputChange('conta', e.target.value)} /></div>
                  </div>
                  <Button type="submit" className="gradient-bg"><Save className="h-4 w-4 mr-2" />Salvar Dados</Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2">
            <Card className="glass-effect">
              <CardHeader><CardTitle>Preferências</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="theme-switch" className="flex items-center gap-2">{theme === 'dark' ? <Moon /> : <Sun />} Tema</Label>
                  <Switch id="theme-switch" checked={theme === 'dark'} onCheckedChange={toggleTheme} />
                </div>
                 <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2"><Palette />Cor Principal</Label>
                    <Input type="color" className="w-12 h-8 p-1" onChange={() => toast({ title: "🚧 Recurso em desenvolvimento!" })}/>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2"><Type />Fonte</Label>
                     <Button variant="outline" onClick={() => toast({ title: "🚧 Recurso em desenvolvimento!" })}>Alterar Fonte</Button>
                  </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default Perfil;