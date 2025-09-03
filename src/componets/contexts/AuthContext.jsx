import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import databaseService from '../lib/databaseService';
import { toast } from '../ui/use-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock auth functions for development (replace with proper auth later)
  const mockSignUp = async (email, password, name, role = 'vendedor') => {
    try {
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('mock_users') || '[]');
      const existingUser = existingUsers.find(u => u.email === email);

      if (existingUser) {
        toast({ variant: 'destructive', title: 'Erro no cadastro', description: 'Usuário já existe' });
        return { error: { message: 'Usuário já existe' } };
      }

      // Create user in database
      const newUser = await databaseService.createUser({
        id: Date.now().toString(),
        name,
        email,
        role
      });

      // Store in localStorage for mock auth
      const userData = { id: newUser.id, email, password, name, role };
      existingUsers.push(userData);
      localStorage.setItem('mock_users', JSON.stringify(existingUsers));
      localStorage.setItem('current_user', JSON.stringify(userData));

      setUser(newUser);
      setSession({ user: newUser });
      toast({ title: 'Cadastro realizado com sucesso!', description: 'Você pode fazer login agora.' });
      return { data: { user: newUser }, error: null };
    } catch (error) {
      toast({ variant: 'destructive', title: 'Erro no cadastro', description: error.message });
      return { error };
    }
  };

  const mockSignIn = async (email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem('mock_users') || '[]');
      const userData = users.find(u => u.email === email && u.password === password);

      if (!userData) {
        toast({ variant: 'destructive', title: 'Erro no login', description: 'Credenciais inválidas' });
        return { error: { message: 'Credenciais inválidas' } };
      }

      // Get full user data from database
      const dbUser = await databaseService.getUserById(userData.id);
      localStorage.setItem('current_user', JSON.stringify(userData));

      setUser(dbUser);
      setSession({ user: dbUser });
      return { data: { user: dbUser }, error: null };
    } catch (error) {
      toast({ variant: 'destructive', title: 'Erro no login', description: error.message });
      return { error };
    }
  };

  const mockSignOut = async () => {
    localStorage.removeItem('current_user');
    setUser(null);
    setSession(null);
    toast({ title: 'Desconectado', description: 'Você saiu da sua conta.' });
    return { error: null };
  };

  useEffect(() => {
    // Check for existing session on app load
    const currentUser = localStorage.getItem('current_user');
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      databaseService.getUserById(userData.id).then(dbUser => {
        setUser(dbUser);
        setSession({ user: dbUser });
        setLoading(false);
      }).catch(() => {
        localStorage.removeItem('current_user');
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const updateUser = useCallback(async (userData) => {
    if (!user) return { error: { message: 'Usuário não autenticado.' } };
    try {
      const updatedUser = await databaseService.updateUser(user.id, userData);
      setUser(updatedUser);
      toast({ title: 'Perfil atualizado!', description: 'Suas informações foram salvas.' });
      return { data: updatedUser, error: null };
    } catch (error) {
      toast({ variant: 'destructive', title: 'Erro ao atualizar perfil', description: error.message });
      return { error };
    }
  }, [user]);

  const value = useMemo(() => ({
    user,
    session,
    loading,
    signUp: mockSignUp,
    signIn: mockSignIn,
    signOut: mockSignOut,
    updateUser
  }), [user, session, loading, updateUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  return context;
};
