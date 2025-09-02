import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/customSupabaseClient';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState({});

  const loadNotifications = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getSession();
    if (user) {
      const { data, error } = await supabase.from('notifications').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
      if (!error) setNotifications(prev => ({ ...prev, [user.id]: data }));
    }
  }, []);

  useEffect(() => {
    loadNotifications();
    const channel = supabase.channel('public:notifications')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'notifications' }, () => loadNotifications())
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [loadNotifications]);

  const addNotification = useCallback(async (userId, message) => {
    const { data, error } = await supabase.from('notifications').insert([{ user_id: userId, message, read: false }]).select().single();
    if (!error) {
      setNotifications(prev => {
        const userNotifs = prev[userId] || [];
        return { ...prev, [userId]: [data, ...userNotifs] };
      });
    }
  }, []);

  const clearNotifications = useCallback(async (userId) => {
    const { error } = await supabase.from('notifications').delete().eq('user_id', userId);
    if (!error) setNotifications(prev => ({ ...prev, [userId]: [] }));
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, clearNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotification deve ser usado dentro de um NotificationProvider');
  return context;
};