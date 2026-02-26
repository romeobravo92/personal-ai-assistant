import { createClient, SupabaseClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl as string | undefined;
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey as string | undefined;

export const isSupabaseConfigured =
  typeof supabaseUrl === 'string' && typeof supabaseAnonKey === 'string' &&
  supabaseUrl.length > 0 && supabaseAnonKey.length > 0;

if (!isSupabaseConfigured) {
  console.warn(
    'Missing SUPABASE_URL or SUPABASE_ANON_KEY. Set them in .env.local (see .env.example).'
  );
}

const placeholderClient = createClient(
  'https://placeholder.supabase.co',
  'placeholder-key'
);

export const supabase: SupabaseClient = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : placeholderClient;
