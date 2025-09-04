import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Create database directory if it doesn't exist
const dbDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'app.db');
const db = new Database(dbPath);

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'vendedor',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS indicacoes (
    id TEXT PRIMARY KEY,
    vendedor_id TEXT NOT NULL,
    cliente_nome TEXT NOT NULL,
    cliente_email TEXT,
    cliente_telefone TEXT,
    status TEXT DEFAULT 'pendente',
    valor REAL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vendedor_id) REFERENCES users (id)
  );

  CREATE TABLE IF NOT EXISTS metas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    meta_mensal REAL DEFAULT 0,
    meta_anual REAL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS comissoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    percentual REAL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS notifications (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'info',
    read BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  );

  -- Insert default values if tables are empty
  INSERT OR IGNORE INTO metas (id, meta_mensal, meta_anual) VALUES (1, 10000, 120000);
  INSERT OR IGNORE INTO comissoes (id, percentual) VALUES (1, 5.0);
`);

// Prepare statements for better performance
const statements = {
  // Users
  getUserById: db.prepare('SELECT * FROM users WHERE id = ?'),
  createUser: db.prepare('INSERT INTO users (id, name, email, role) VALUES (?, ?, ?, ?)'),
  updateUser: db.prepare('UPDATE users SET name = ?, email = ?, role = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'),
  getAllUsers: db.prepare('SELECT * FROM users ORDER BY created_at DESC'),

  // Indicacoes
  getIndicacoesByUserId: db.prepare('SELECT * FROM indicacoes WHERE vendedor_id = ? ORDER BY created_at DESC'),
  createIndicacao: db.prepare(`
    INSERT INTO indicacoes (id, vendedor_id, cliente_nome, cliente_email, cliente_telefone, status, valor)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `),
  getAllIndicacoes: db.prepare('SELECT * FROM indicacoes ORDER BY created_at DESC'),
  updateIndicacao: db.prepare('UPDATE indicacoes SET status = ?, valor = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'),

  // Metas
  getMetas: db.prepare('SELECT * FROM metas LIMIT 1'),
  updateMetas: db.prepare('UPDATE metas SET meta_mensal = ?, meta_anual = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1'),

  // Comissoes
  getComissoes: db.prepare('SELECT * FROM comissoes LIMIT 1'),
  updateComissoes: db.prepare('UPDATE comissoes SET percentual = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1'),

  // Notifications
  getNotificationsByUserId: db.prepare('SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC'),
  createNotification: db.prepare('INSERT INTO notifications (id, user_id, message, type) VALUES (?, ?, ?, ?)'),
  deleteNotificationsByUserId: db.prepare('DELETE FROM notifications WHERE user_id = ?'),
  markNotificationRead: db.prepare('UPDATE notifications SET read = TRUE WHERE id = ?'),
};

// SQLite wrapper to mimic postgres syntax
const sql = (strings, ...values) => {
  const query = strings.join('?');
  const stmt = db.prepare(query);
  return {
    run: () => stmt.run(...values),
    get: () => stmt.get(...values),
    all: () => stmt.all(...values),
    [Symbol.iterator]: function* () {
      const result = stmt.all(...values);
      yield* result;
    }
  };
};

// Export the database instance and helper functions
export { db, statements };
export default sql;
