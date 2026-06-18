/**
 * Client-side Supabase Client (Browser / SSR-safe)
 *
 * Compatible with Vite (import.meta.env) and Node/SSR (process.env).
 * Falls back through multiple alias names for maximum flexibility.
 */
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

interface ViteEnv {
  VITE_SUPABASE_URL?: string;
  VITE_SUPABASE_ANON_KEY?: string;
  VITE_SUPABASE_PUBLISHABLE_KEY?: string;
}

function createSupabaseClient() {
  // Configuração estática obrigatória para o Vite + Vercel (com fallback para SUPABASE_ direto)
  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY || import.meta.env.SUPABASE_PUBLISHABLE_KEY;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    const missing = [
      ...(!SUPABASE_URL ? ["VITE_SUPABASE_URL or SUPABASE_URL"] : []),
      ...(!SUPABASE_ANON_KEY ? ["VITE_SUPABASE_ANON_KEY or SUPABASE_ANON_KEY"] : []),
    ];
    const message = `Missing Supabase environment variable(s): ${missing.join(", ")}. Please check your .env file.`;
    console.error(`[Supabase] ${message}`);
    throw new Error(message);
  }

  return createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      storage: typeof window !== "undefined" ? window.localStorage : undefined,
      persistSession: true,
      autoRefreshToken: true,
    },
  });
}

let _supabase: ReturnType<typeof createSupabaseClient> | undefined;

// Export a proxy that lazily initializes the real client on first property access.
// This avoids throwing at module import time; the error only appears on first use.
export const supabase = new Proxy({} as ReturnType<typeof createSupabaseClient>, {
  get(_, prop, receiver) {
    if (!_supabase) _supabase = createSupabaseClient();
    return Reflect.get(_supabase, prop, receiver);
  },
});
