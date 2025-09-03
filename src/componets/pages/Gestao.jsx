import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import UsersTab from '../gestão/UsersTab';
import MetasTab from '../gestão/MetasTab';
import MonitoramentoTab from '../gestão/MonitoramentoTab';
import PixVendedores from '../gestão/PixVendedores';

function Gestao() {
  return (
    <>
      <Helmet>
        <title>Gestão - INDICAPRO</title>
        <meta name="description" content="Painel de gestão para administradores do sistema INDICAPRO" />
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
