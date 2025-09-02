import sql from './neonClient.js';

// Database service functions using Neon
export const databaseService = {
  // Users operations
  async getUserById(id) {
    try {
      const result = await sql`SELECT * FROM users WHERE id = ${id}`;
      return result[0] || null;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  async createUser(userData) {
    try {
      const { id, name, email, role = 'vendedor' } = userData;
      const result = await sql`
        INSERT INTO users (id, name, email, role)
        VALUES (${id}, ${name}, ${email}, ${role})
        RETURNING *
      `;
      return result[0];
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  async updateUser(id, userData) {
    try {
      const result = await sql`
        UPDATE users
        SET ${sql(userData)}
        WHERE id = ${id}
        RETURNING *
      `;
      return result[0];
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  // Indicacoes operations
  async getIndicacoesByUserId(userId) {
    try {
      const result = await sql`
        SELECT * FROM indicacoes
        WHERE vendedor_id = ${userId}
        ORDER BY created_at DESC
      `;
      return result;
    } catch (error) {
      console.error('Error fetching indicacoes:', error);
      throw error;
    }
  },

  async createIndicacao(indicacaoData) {
    try {
      const result = await sql`
        INSERT INTO indicacoes ${sql(indicacaoData)}
        RETURNING *
      `;
      return result[0];
    } catch (error) {
      console.error('Error creating indicacao:', error);
      throw error;
    }
  },

  async getAllIndicacoes() {
    try {
      const result = await sql`
        SELECT * FROM indicacoes
        ORDER BY created_at DESC
      `;
      return result;
    } catch (error) {
      console.error('Error fetching all indicacoes:', error);
      throw error;
    }
  },

  // Metas operations
  async getMetas() {
    try {
      const result = await sql`SELECT * FROM metas LIMIT 1`;
      return result[0] || null;
    } catch (error) {
      console.error('Error fetching metas:', error);
      throw error;
    }
  },

  async updateMetas(metasData) {
    try {
      const result = await sql`
        UPDATE metas
        SET ${sql(metasData)}
        WHERE id = (SELECT id FROM metas LIMIT 1)
        RETURNING *
      `;
      return result[0];
    } catch (error) {
      console.error('Error updating metas:', error);
      throw error;
    }
  },

  // Comissoes operations
  async getComissoes() {
    try {
      const result = await sql`SELECT * FROM comissoes LIMIT 1`;
      return result[0] || null;
    } catch (error) {
      console.error('Error fetching comissoes:', error);
      throw error;
    }
  },

  async updateComissoes(comissoesData) {
    try {
      const result = await sql`
        UPDATE comissoes
        SET ${sql(comissoesData)}
        WHERE id = (SELECT id FROM comissoes LIMIT 1)
        RETURNING *
      `;
      return result[0];
    } catch (error) {
      console.error('Error updating comissoes:', error);
      throw error;
    }
  }
};

export default databaseService;
