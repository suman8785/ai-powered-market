
import { createClient } from '@supabase/supabase-js';

// Set default values for local development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-public-anon-key';

// Log missing environment variables as a warning instead of an error
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Missing Supabase environment variables. Using fallback values for development.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
