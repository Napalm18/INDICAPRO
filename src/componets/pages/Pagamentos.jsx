import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';
import { Check } from 'lucide-react';

function Pagamentos() {
  const { user } = useAuth();
  const [indicacoes, setIndicacoes] = useState([]);

  useEffect(() => {
    const savedIndicacoes = JSON.parse(localStorage.getItem('indicacoes') || '[]');
    setIndicacoes(savedIndicacoes);
  }, []);

  const markAsPaid = (id) => {
    const updatedIndicacoes = indicacoes.map(ind =>
      ind.id === id ? { ...ind, pago: true } : ind
    );
    setIndicacoes(updatedIndicacoes);
    localStorage.setItem('indicacoes', JSON.stringify(updatedIndicacoes));
  };

  return (
    <>
      <Helmet>
        <title>Pagamentos - Sistema de Indicações</title>
      </Helmet>
      <div className="p-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Pagamentos</h1>
        </motion.div>
        <div className="space-y-4 mt-4">
          {indicacoes.length === 0 ? (
            <p className="text-center text-muted-foreground">Nenhuma indicação encontrada.</p>
          ) : (
            indicacoes.map((ind) => (
              <div key={ind.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-semibold">{ind.nome}</p>
                  <p className="text-sm text-muted-foreground">{ind.vendedorNome}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant={ind.pago ? 'default' : 'outline'} onClick={() => markAsPaid(ind.id)}>
                    {ind.pago ? <Check className="h-4 w-4" /> : 'Marcar Pago'}
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Pagamentos;
