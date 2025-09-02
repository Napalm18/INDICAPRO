import React, { useState, useEffect } from 'react';
import { useAuth } from '@/componets/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/componets/ui/button';
import { Input } from '@/componets/ui/input';
import { Label } from '@/componets/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/componets/ui/card';
import { toast } from '@/componets/ui/use-toast';

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
    <div className="min-h-screen flex items-center justify-center bg-dark-luxury p-4 animate-float">
      <Card variant="futuristic" className="max-w-md w-full futuristic-glow">
        <CardHeader className="text-center">
          <CardTitle className="futuristic-gradient-text text-3xl font-bold mb-2">
            {isSignUp ? 'CADASTRO' : 'LOGIN'}
          </CardTitle>
          <CardDescription className="text-golden/80">
            {isSignUp ? 'Crie sua conta futurista' : 'Entre na sua conta premium'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignUp && (
              <div>
                <Label htmlFor="name" className="text-golden font-semibold">Nome</Label>
                <Input
                  id="name"
                  variant="futuristic"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  placeholder="Digite seu nome"
                />
              </div>
            )}
            <div>
              <Label htmlFor="email" className="text-golden font-semibold">Email</Label>
              <Input
                id="email"
                type="email"
                variant="futuristic"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="Digite seu email"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-golden font-semibold">Senha</Label>
              <Input
                id="password"
                type="password"
                variant="futuristic"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="Digite sua senha"
              />
            </div>
            <Button
              type="submit"
              variant="futuristic"
              className="w-full h-12 text-lg font-bold futuristic-glow"
              disabled={loading}
            >
              {loading ? (isSignUp ? 'Cadastrando...' : 'Entrando...') : (isSignUp ? 'Cadastrar' : 'Entrar')}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <button
              className="text-golden hover:text-golden/80 underline underline-offset-4 transition-colors duration-300"
              onClick={() => setIsSignUp(!isSignUp)}
              type="button"
            >
              {isSignUp ? 'Já tem conta? Faça login' : 'Não tem conta? Cadastre-se'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;