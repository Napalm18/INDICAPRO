import sql, { statements } from './sqliteClient.js';

// Database service functions using SQLite
export const databaseService = {
  // Users operations
  async getUserById(id) {
    try {
      const result = statements.getUserById.get(id);
      return result || null;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  async createUser(userData) {
    try {
      const { id, name, email, role = 'vendedor' } = userData;
      statements.createUser.run(id, name, email, role);
      return await this.getUserById(id);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  async updateUser(id, userData) {
    try {
      const { name, email, role } = userData;
      statements.updateUser.run(name, email, role, id);
      return await this.getUserById(id);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  async getAllUsers() {
    try {
      return statements.getAllUsers.all();
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw error;
    }
  },

  // Indicacoes operations
  async getIndicacoesByUserId(userId) {
    try {
      return statements.getIndicacoesByUserId.all(userId);
    } catch (error) {
      console.error('Error fetching indicacoes:', error);
      throw error;
    }
  },

  async createIndicacao(indicacaoData) {
    try {
      const { id, vendedor_id, cliente_nome, cliente_email, cliente_telefone, status = 'pendente', valor = 0 } = indicacaoData;
      statements.createIndicacao.run(id, vendedor_id, cliente_nome, cliente_email, cliente_telefone, status, valor);
      return indicacaoData;
    } catch (error) {
      console.error('Error creating indicacao:', error);
      throw error;
    }
  },

  async getAllIndicacoes() {
    try {
      return statements.getAllIndicacoes.all();
    } catch (error) {
      console.error('Error fetching all indicacoes:', error);
      throw error;
    }
  },

  async updateIndicacao(id, indicacaoData) {
    try {
      const { status, valor } = indicacaoData;
      statements.updateIndicacao.run(status, valor, id);
      return indicacaoData;
    } catch (error) {
      console.error('Error updating indicacao:', error);
      throw error;
    }
  },

  // Metas operations
  async getMetas() {
    try {
      return statements.getMetas.get() || null;
    } catch (error) {
      console.error('Error fetching metas:', error);
      throw error;
    }
  },

  async updateMetas(metasData) {
    try {
      const { meta_mensal, meta_anual } = metasData;
      statements.updateMetas.run(meta_mensal, meta_anual);
      return await this.getMetas();
    } catch (error) {
      console.error('Error updating metas:', error);
      throw error;
    }
  },

  // Comissoes operations
  async getComissoes() {
    try {
      return statements.getComissoes.get() || null;
    } catch (error) {
      console.error('Error fetching comissoes:', error);
      throw error;
    }
  },

  async updateComissoes(comissoesData) {
    try {
      const { percentual } = comissoesData;
      statements.updateComissoes.run(percentual);
      return await this.getComissoes();
    } catch (error) {
      console.error('Error updating comissoes:', error);
      throw error;
    }
  },

  // Notifications operations
  async getNotificationsByUserId(userId) {
    try {
      return statements.getNotificationsByUserId.all(userId);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  },

  async createNotification(notificationData) {
    try {
      const { id, user_id, message, type = 'info' } = notificationData;
      statements.createNotification.run(id, user_id, message, type);
      return notificationData;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  },

  async deleteNotificationsByUserId(userId) {
    try {
      statements.deleteNotificationsByUserId.run(userId);
    } catch (error) {
      console.error('Error deleting notifications:', error);
      throw error;
    }
  },

  async markNotificationRead(id) {
    try {
      statements.markNotificationRead.run(id);
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  }
};

export default databaseService;
