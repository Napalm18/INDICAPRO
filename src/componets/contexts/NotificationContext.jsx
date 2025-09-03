import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import databaseService from '../lib/databaseService';
import { useAuth } from './AuthContext';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState({});
  const { user } = useAuth();

  const loadNotifications = useCallback(async () => {
    if (user) {
      try {
        const data = await databaseService.getNotificationsByUserId(user.id);
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
      const data = await databaseService.createNotification({
        user_id: userId,
        message,
        read: false,
        created_at: new Date().toISOString()
      });
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
      await databaseService.deleteNotificationsByUserId(userId);
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
