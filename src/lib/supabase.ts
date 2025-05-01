
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

// Types for our database tables
export type User = {
  id: string;
  email: string;
  name?: string;
  created_at: string;
};

export type Order = {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  status: 'pending' | 'completed' | 'cancelled';
  created_at: string;
};

export type CartItem = {
  product_id: string;
  quantity: number;
};
