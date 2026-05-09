export type UserRole = 'user' | 'corporate' | 'admin'

export interface Profile {
  id: string
  email: string
  full_name: string
  role: UserRole
  created_at: string
}

export interface Installation {
  id: string
  user_id: string
  name: string
  location: string
  capacity_kw: number
  inverter_brand: string
  inverter_serial: string
  lat: number
  lng: number
  is_active: boolean
  created_at: string
}

export interface EnergyReading {
  id: string
  installation_id: string
  recorded_at: string
  kwh_generated: number
  kw_current: number
}

export interface Credit {
  id: string
  user_id: string
  amount: number
  type: 'earned' | 'redeemed'
  description: string
  partner?: string
  created_at: string
}

export interface ESGReport {
  id: string
  corporate_id: string
  title: string
  date_from: string
  date_to: string
  total_kwh: number
  total_co2_kg: number
  total_households: number
  status: 'draft' | 'published'
  created_at: string
}

export interface DashboardStats {
  total_kwh_today: number
  total_kwh_month: number
  total_credits: number
  carbon_offset_kg: number
  carbon_credits: number
  money_value_inr: number
  current_kw: number
}
