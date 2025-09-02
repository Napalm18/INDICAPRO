import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/componets/ui/card';
import { Button } from '@/componets/ui/button';
import { Input } from '@/componets/ui/input';
import { Label } from '@/componets/ui/label';
import { Checkbox } from '@/componets/ui/checkbox';
import { Target, DollarSign, Save, Gift, Sparkles } from 'lucide-react';
import { toast } from '@/componets/ui/use-toast';

function MetasTab() {
  const [metas, setMetas] = useState({ mensal: 10, anual: 120, bonusMensal: 500, bonusAnual: 2000 });
  const [comissoes, setComissoes] = useState({ evento: 100, cartorio: 150 });
  const [incentivos, setIncentivos] = useState({ parabensAtivo: true });

  useEffect(() => {
    const savedMetas = JSON.parse(localStorage.getItem('metas') || '{}');
    const savedComissoes = JSON.parse(localStorage.getItem('comissoes') || '{}');
    const savedIncentivos = JSON.parse(localStorage.getItem('incentivos') || '{}');
    if (Object.keys(savedMetas).length) setMetas(savedMetas);
    if (Object.keys(savedComissoes).length) setComissoes(savedComissoes);
    if (Object.keys(savedIncentivos).length) setIncentivos(savedIncentivos);
  }, []);

  const saveData = () => {
    localStorage.setItem('metas', JSON.stringify(metas));
    localStorage.setItem('comissoes', JSON.stringify(comissoes));
    localStorage.setItem('incentivos', JSON.stringify(incentivos));
    toast({ title: "Configurações salvas!" });
  };

  return (
    <div className="space-y-6">
      <Card className="glass-effect">
        <CardHeader><CardTitle className="flex items-center gap-2"><Target />Metas de Indicações</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label htmlFor="metaMensal">Meta Mensal</Label><Input id="metaMensal" type="number" value={metas.mensal} onChange={(e) => setMetas({ ...metas, mensal: Number(e.target.value) })}/></div>
            <div className="space-y-2"><Label htmlFor="metaAnual">Meta Anual</Label><Input id="metaAnual" type="number" value={metas.anual} onChange={(e) => setMetas({ ...metas, anual: Number(e.target.value) })}/></div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-effect">
        <CardHeader><CardTitle className="flex items-center gap-2"><DollarSign />Comissões e Bônus</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label htmlFor="comissaoEvento">Comissão Evento (R$)</Label><Input id="comissaoEvento" type="number" value={comissoes.evento} onChange={(e) => setComissoes({ ...comissoes, evento: Number(e.target.value) })}/></div>
            <div className="space-y-2"><Label htmlFor="comissaoCartorio">Comissão Cartório (R$)</Label><Input id="comissaoCartorio" type="number" value={comissoes.cartorio} onChange={(e) => setComissoes({ ...comissoes, cartorio: Number(e.target.value) })}/></div>
            <div className="space-y-2"><Label htmlFor="bonusMensal">Bônus Mensal (R$)</Label><Input id="bonusMensal" type="number" value={metas.bonusMensal} onChange={(e) => setMetas({ ...metas, bonusMensal: Number(e.target.value) })}/></div>
            <div className="space-y-2"><Label htmlFor="bonusAnual">Bônus Anual (R$)</Label><Input id="bonusAnual" type="number" value={metas.bonusAnual} onChange={(e) => setMetas({ ...metas, bonusAnual: Number(e.target.value) })}/></div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-effect">
          <CardHeader>
              <CardTitle className="flex items-center gap-2"><Sparkles/>Animações de Incentivo</CardTitle>
              <CardDescription>Configure efeitos de tela para motivar os vendedores.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="parabens-ativo" 
                checked={incentivos.parabensAtivo}
                onCheckedChange={(checked) => setIncentivos(prev => ({...prev, parabensAtivo: checked}))}
              />
              <label
                htmlFor="parabens-ativo"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Ativar faixa "Parabéns" ao atingir meta
              </label>
            </div>
            <Button onClick={() => toast({title: "🚧 Em desenvolvimento"})} variant="outline">Personalizar Efeitos</Button>
          </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button onClick={saveData} className="gradient-bg"><Save className="h-4 w-4 mr-2" />Salvar Tudo</Button>
      </div>
    </div>
  );
}

export default MetasTab;