import { createClient } from '@supabase/supabase-js'
import { Whiskey } from './types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Database {
  public: {
    Tables: {
      whiskeys: {
        Row: Whiskey
        Insert: Omit<Whiskey, 'id' | 'createdAt'>
        Update: Partial<Omit<Whiskey, 'id' | 'createdAt'>>
      }
    }
  }
}
