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

function getClientEnv(key: string): string | undefined {
  if (typeof import.meta !== "undefined" && import.meta.env) {
    return (import.meta.env as Record<string, string | undefined>)[key];
  }
  return undefined;
}

function createSupabaseClient() {
  const SUPABASE_URL =
    getClientEnv("VITE_SUPABASE_URL") ??
    (typeof process !== "undefined" ? process.env.SUPABASE_URL : undefined) ?? 
    "https://zycwvatimjfbsfnjjvns.supabase.co";

  const SUPABASE_ANON_KEY =
    getClientEnv("VITE_SUPABASE_ANON_KEY") ??
    getClientEnv("VITE_SUPABASE_PUBLISHABLE_KEY") ??
    (typeof process !== "undefined"
      ? (process.env.SUPABASE_ANON_KEY ?? process.env.SUPABASE_PUBLISHABLE_KEY)
      : undefined) ?? 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5Y3d2YXRpbWpmYnNmbmpqdm5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExODU1NDcsImV4cCI6MjA5Njc2MTU0N30.xMHVJVLDbDFZPmEApMsq391AxHHhI73pr6aG2nyXoDA";

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    const missing = [
      ...(!SUPABASE_URL ? ["SUPABASE_URL / VITE_SUPABASE_URL"] : []),
      ...(!SUPABASE_ANON_KEY
        ? ["SUPABASE_ANON_KEY / VITE_SUPABASE_ANON_KEY / SUPABASE_PUBLISHABLE_KEY"]
        : []),
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
