-- SQL to set up Supabase tables for INDICAPRO

-- Users table (extend the auth.users)
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
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
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  telefone TEXT,
  quem_indicou TEXT,
  vendedor_id UUID REFERENCES users(id),
  vendedor_nome TEXT,
  status TEXT DEFAULT 'pendente',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  pago BOOLEAN DEFAULT FALSE,
  tipo TEXT
);

-- Metas table
CREATE TABLE IF NOT EXISTS metas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  mensal INTEGER DEFAULT 10,
  anual INTEGER DEFAULT 120,
  bonus_mensal DECIMAL DEFAULT 500,
  bonus_anual DECIMAL DEFAULT 2000,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Comissoes table
CREATE TABLE IF NOT EXISTS comissoes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  evento DECIMAL DEFAULT 100,
  cartorio DECIMAL DEFAULT 150,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lixeira table
CREATE TABLE IF NOT EXISTS lixeira (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT,
  telefone TEXT,
  quem_indicou TEXT,
  vendedor_id UUID,
  vendedor_nome TEXT,
  status TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  pago BOOLEAN,
  tipo TEXT,
  deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  motivo TEXT
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE indicacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE metas ENABLE ROW LEVEL SECURITY;
ALTER TABLE comissoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE lixeira ENABLE ROW LEVEL SECURITY;

-- Policies for users
CREATE POLICY "Users can view their own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Gestores can view all users" ON users FOR SELECT USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'gestor'));
CREATE POLICY "Gestores can update all users" ON users FOR UPDATE USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'gestor'));

-- Policies for indicacoes
CREATE POLICY "Vendedores can view their own indicacoes" ON indicacoes FOR SELECT USING (auth.uid() = vendedor_id);
CREATE POLICY "Vendedores can insert their own indicacoes" ON indicacoes FOR INSERT WITH CHECK (auth.uid() = vendedor_id);
CREATE POLICY "Gestores can view all indicacoes" ON indicacoes FOR ALL USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'gestor'));

-- Similar policies for other tables

-- Insert default metas and comissoes
INSERT INTO metas (mensal, anual, bonus_mensal, bonus_anual) VALUES (10, 120, 500, 2000) ON CONFLICT DO NOTHING;
INSERT INTO comissoes (evento, cartorio) VALUES (100, 150) ON CONFLICT DO NOTHING;
