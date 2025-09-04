import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState({});
  const authContext = useAuth();
  const user = authContext ? authContext.user : null;

  const loadNotifications = useCallback(async () => {
    if (user) {
      try {
        const response = await fetch(`/api/notifications/${user.id}`);
        if (!response.ok) throw new Error('Failed to fetch notifications');
        const data = await response.json();
        setNotifications(prev => ({ ...prev, [user.id]: data }));
      } catch (error) {
        console.error('Error loading notifications:', error);
      }
    }
  }, [user]);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const addNotification = useCallback(async (userId, message) => {
    try {
      const response = await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          message,
          read: false,
          created_at: new Date().toISOString()
        }),
      });
      if (!response.ok) throw new Error('Failed to add notification');
      const data = await response.json();
      setNotifications(prev => {
        const userNotifs = prev[userId] || [];
        return { ...prev, [userId]: [data, ...userNotifs] };
      });
    } catch (error) {
      console.error('Error adding notification:', error);
    }
  }, []);

  const clearNotifications = useCallback(async (userId) => {
    try {
      const response = await fetch(`/api/notifications/${userId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to clear notifications');
      setNotifications(prev => ({ ...prev, [userId]: [] }));
    } catch (error) {
      console.error('Error clearing notifications:', error);
    }
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
