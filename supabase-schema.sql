-- ============================================
-- ENERX SUPABASE DATABASE SCHEMA
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. PROFILES (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'corporate', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 2. INSTALLATIONS
CREATE TABLE installations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  location TEXT,
  city TEXT,
  state TEXT,
  lat FLOAT,
  lng FLOAT,
  capacity_kw FLOAT NOT NULL,
  inverter_brand TEXT,
  inverter_serial TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE installations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own installations" ON installations
  USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all installations" ON installations FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 3. ENERGY READINGS
CREATE TABLE energy_readings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  installation_id UUID REFERENCES installations(id) ON DELETE CASCADE,
  recorded_at TIMESTAMPTZ DEFAULT NOW(),
  kwh_generated FLOAT NOT NULL DEFAULT 0,
  kw_current FLOAT DEFAULT 0
);

ALTER TABLE energy_readings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own readings" ON energy_readings FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM installations
    WHERE installations.id = energy_readings.installation_id
    AND installations.user_id = auth.uid()
  )
);
CREATE POLICY "Service role can insert readings" ON energy_readings FOR INSERT
  WITH CHECK (TRUE);

-- 4. CREDITS
CREATE TABLE credits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  type TEXT CHECK (type IN ('earned', 'redeemed')),
  description TEXT,
  partner TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE credits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own credits" ON credits FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Service role can insert credits" ON credits FOR INSERT WITH CHECK (TRUE);

-- 5. ESG REPORTS
CREATE TABLE esg_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  corporate_id UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  date_from DATE,
  date_to DATE,
  total_kwh FLOAT DEFAULT 0,
  total_co2_kg FLOAT DEFAULT 0,
  total_households INTEGER DEFAULT 0,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE esg_reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Corporate can view own reports" ON esg_reports FOR SELECT USING (auth.uid() = corporate_id);
CREATE POLICY "Admins can manage all reports" ON esg_reports USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ============================================
-- USEFUL VIEWS
-- ============================================

-- Daily generation per user
CREATE OR REPLACE VIEW daily_generation AS
SELECT
  i.user_id,
  DATE(er.recorded_at) as date,
  SUM(er.kwh_generated) as total_kwh,
  COUNT(*) as reading_count
FROM energy_readings er
JOIN installations i ON i.id = er.installation_id
GROUP BY i.user_id, DATE(er.recorded_at);

-- User credit balance
CREATE OR REPLACE VIEW credit_balances AS
SELECT
  user_id,
  SUM(CASE WHEN type = 'earned' THEN amount ELSE -amount END) as balance,
  SUM(CASE WHEN type = 'earned' THEN amount ELSE 0 END) as total_earned,
  SUM(CASE WHEN type = 'redeemed' THEN amount ELSE 0 END) as total_redeemed
FROM credits
GROUP BY user_id;

-- ============================================
-- SEED DATA (optional for testing)
-- ============================================

-- Insert a test admin user (update UUID after creating user in Supabase Auth)
-- INSERT INTO profiles (id, email, full_name, role) VALUES
--   ('your-uuid-here', 'admin@energx.in', 'EnerX Admin', 'admin');
