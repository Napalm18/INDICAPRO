import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/componets/ui/tabs';
import UsersTab from '@/componets/gestão/UsersTab';
import MetasTab from '@/componets/gestão/MetasTab';
import MonitoramentoTab from '@/componets/gestão/MonitoramentoTab';
import PixVendedores from '@/componets/gestão/PixVendedores';

function Gestao() {
  return (
    <>
      <Helmet>
        <title>Gestão - Sistema de Indicações</title>
        <meta name="description" content="Painel de gestão para administradores do sistema de indicações" />
      </Helmet>

      <div className="p-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold">Gestão</h1>
          <p className="text-muted-foreground">
            Painel administrativo do sistema
          </p>
        </motion.div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="metas">Metas e Comissões</TabsTrigger>
            <TabsTrigger value="pix">PIX Vendedores</TabsTrigger>
            <TabsTrigger value="monitoramento">Monitoramento</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <UsersTab />
          </TabsContent>
          <TabsContent value="metas">
            <MetasTab />
          </TabsContent>
           <TabsContent value="pix">
            <PixVendedores />
          </TabsContent>
          <TabsContent value="monitoramento">
            <MonitoramentoTab />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

export default Gestao;