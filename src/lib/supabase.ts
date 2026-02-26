import { createClient, SupabaseClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl as string | undefined;
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey as string | undefined;

export const isSupabaseConfigured =
  typeof supabaseUrl === 'string' && typeof supabaseAnonKey === 'string' &&
  supabaseUrl.length > 0 && supabaseAnonKey.length > 0;

/** Redacted host for debug (e.g. "abc•••.supabase.co" or "not set") */
export function getSupabaseHostForDebug(): string {
  if (!supabaseUrl || supabaseUrl.length < 10) return 'not set';
  try {
    const u = new URL(supabaseUrl);
    const h = u.hostname;
    if (h.includes('supabase.co')) return h.replace(/^(.{3}).*(\.supabase\.co)$/, '$1•••$2');
    return h;
  } catch {
    return 'invalid';
  }
}

if (!isSupabaseConfigured) {
  console.warn(
    'Missing SUPABASE_URL or SUPABASE_ANON_KEY. Set them in .env.local (see .env.example).'
  );
}

const placeholderClient = createClient(
  'https://placeholder.supabase.co',
  'placeholder-key'
);

// Use native fetch on web to avoid RN polyfill issues that can cause "Failed to fetch"
const isWeb = typeof window !== 'undefined' && typeof window.fetch === 'function';
const clientOptions = isWeb ? { global: { fetch: window.fetch.bind(window) } } : undefined;

export const supabase: SupabaseClient = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!, clientOptions)
  : placeholderClient;

/** Call from UI to test if the browser can reach Supabase. Returns a short message. */
export async function testSupabaseConnection(): Promise<string> {
  if (!isSupabaseConfigured || !supabaseUrl) return 'Not configured';
  const base = supabaseUrl.replace(/\/$/, '');
  try {
    const res = await fetch(base + '/rest/v1/', { method: 'GET', mode: 'cors' });
    if (res.ok || res.status === 406) return 'Reachable';
    return `HTTP ${res.status}`;
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return `Error: ${msg}`;
  }
}
