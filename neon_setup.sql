-- SQL to set up Neon database tables for INDICAPRO

-- Users table (linked to Supabase auth)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT,
  role TEXT DEFAULT 'vendedor',
  pix TEXT,
  banco TEXT,
  agencia TEXT,
  conta TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indicacoes table
CREATE TABLE IF NOT EXISTS indicacoes (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  nome TEXT NOT NULL,
  telefone TEXT,
  quem_indicou TEXT,
  vendedor_id TEXT REFERENCES users(id),
  vendedor_nome TEXT,
  status TEXT DEFAULT 'pendente',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  pago BOOLEAN DEFAULT FALSE,
  tipo TEXT
);

-- Metas table
CREATE TABLE IF NOT EXISTS metas (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  mensal INTEGER DEFAULT 10,
  anual INTEGER DEFAULT 120,
  bonus_mensal DECIMAL DEFAULT 500,
  bonus_anual DECIMAL DEFAULT 2000,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Comissoes table
CREATE TABLE IF NOT EXISTS comissoes (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  evento DECIMAL DEFAULT 100,
  cartorio DECIMAL DEFAULT 150,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lixeira table
CREATE TABLE IF NOT EXISTS lixeira (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  nome TEXT,
  telefone TEXT,
  quem_indicou TEXT,
  vendedor_id TEXT,
  vendedor_nome TEXT,
  status TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  pago BOOLEAN,
  tipo TEXT,
  deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  motivo TEXT
);

-- Insert default metas and comissoes
INSERT INTO metas (mensal, anual, bonus_mensal, bonus_anual)
VALUES (10, 120, 500, 2000)
ON CONFLICT DO NOTHING;

INSERT INTO comissoes (evento, cartorio)
VALUES (100, 150)
ON CONFLICT DO NOTHING;
