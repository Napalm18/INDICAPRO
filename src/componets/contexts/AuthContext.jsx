import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { supabase } from '../lib/customSupabaseClient';
import databaseService from '../lib/databaseService';
import { toast } from '../ui/use-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser ] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleSession = useCallback(async (currentSession) => {
    setSession(currentSession);
    if (currentSession?.user) {
      try {
        const profile = await databaseService.getUserById(currentSession.user.id);
        setUser(profile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      handleSession(session);
    });

    return () => subscription.unsubscribe();
  }, [handleSession]);

  const signUp = useCallback(async (email, password, name, role = 'vendedor') => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name, role } }
    });

    if (error) {
      toast({ variant: 'destructive', title: 'Erro no cadastro', description: error.message });
      return { error };
    }

    if (data.user) {
      try {
        await databaseService.createUser({
          id: data.user.id,
          name,
          email,
          role
        });
      } catch (insertError) {
        toast({ variant: 'destructive', title: 'Erro ao salvar perfil', description: insertError.message });
        return { error: insertError };
      }
    }

    toast({ title: 'Cadastro realizado com sucesso!', description: 'Você pode fazer login agora.' });
    return { data, error: null };
  }, []);

  const signIn = useCallback(async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast({ variant: 'destructive', title: 'Erro no login', description: error.message });
    }
    return { data, error };
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({ variant: 'destructive', title: 'Erro ao sair', description: error.message });
    } else {
      setUser (null);
      setSession(null);
      toast({ title: 'Desconectado', description: 'Você saiu da sua conta.' });
    }
    return { error };
  }, []);

  const updateUser  = useCallback(async (userData) => {
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

  const value = useMemo(() => ({ user, session, loading, signUp, signIn, signOut, updateUser  }), [user, session, loading, signUp, signIn, signOut, updateUser ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  return context;
};