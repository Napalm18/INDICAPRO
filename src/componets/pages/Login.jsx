import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isSignUp) {
      const { error } = await signUp(email, password, name);
      if (!error) {
        toast({ title: 'Cadastro realizado!', description: 'Faça login para continuar.' });
        setIsSignUp(false);
      }
    } else {
      const { error } = await signIn(email, password);
      if (!error) navigate('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="max-w-md w-full glass-effect">
        <CardHeader className="text-center">
          <CardTitle>{isSignUp ? 'Cadastro' : 'Login'}</CardTitle>
          <CardDescription>{isSignUp ? 'Crie sua conta' : 'Entre na sua conta'}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input id="name" value={name} onChange={e => setName(e.target.value)} required />
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full gradient-bg" disabled={loading}>
              {loading ? (isSignUp ? 'Cadastrando...' : 'Entrando...') : (isSignUp ? 'Cadastrar' : 'Entrar')}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <button className="text-sm text-primary underline" onClick={() => setIsSignUp(!isSignUp)} type="button">
              {isSignUp ? 'Já tem conta? Faça login' : 'Não tem conta? Cadastre-se'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;