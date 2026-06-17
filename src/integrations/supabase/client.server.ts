/**
 * Server-side Supabase Client (SSR / Server Functions)
 *
 * Uses SUPABASE_SERVICE_ROLE_KEY for admin privileges.
 * If that is not available, falls back to SUPABASE_ANON_KEY with a console warning.
 *
 * NOTE: Service Role bypasses RLS!  ONLY use this for trusted server-side operations.
 * For user-authenticated queries, use the auth middleware instead.
 */
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

interface ServerEnv {
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  SUPABASE_ANON_KEY?: string;
}

function getServerVar(name: string): string | undefined {
  if (typeof process !== "undefined" && process.env) {
    return process.env[name];
  }
  return undefined;
}

function createSupabaseAdminClient() {
  const SUPABASE_URL = getServerVar("SUPABASE_URL");
  const SERVICE_KEY = getServerVar("SUPABASE_SERVICE_ROLE_KEY");
  const ANON_KEY = getServerVar("SUPABASE_ANON_KEY") ?? getServerVar("SUPABASE_PUBLISHABLE_KEY");

  const SUPABASE_KEY = SERVICE_KEY ?? ANON_KEY;

  // Warn instead of hard-throwing when Service Role is missing.
  // This keeps dev server alive and lets the user fill in credentials later.
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    const missing = [
      ...(!SUPABASE_URL ? ["SUPABASE_URL"] : []),
      ...(!SUPABASE_KEY ? ["SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_ANON_KEY fallback)"] : []),
    ];
    const message =
      `Missing Supabase environment variable(s): ${missing.join(", ")}.\n` +
      `Please check your .env or system environment variables.\n` +
      `If you do not have a Service Role key yet, you can temporarily use the Anon key, ` +
      `but some admin-only operations may fail if they rely on RLS bypass.`;
    console.error(`[Supabase Server] ${message}`);

    // Throw a delayed error so dev server doesn't crash on import,
    // but the first actual query will fail with a clear message.
    throw new Error(message);
  }

  if (!SERVICE_KEY && ANON_KEY) {
    console.warn(
      `[Supabase Server] SUPABASE_SERVICE_ROLE_KEY not found. ` +
        `Using SUPABASE_ANON_KEY as fallback for read-only operations. ` +
        `Some admin actions (bypassing RLS) will be restricted.`,
    );
  }

  return createClient<Database>(SUPABASE_URL, SUPABASE_KEY, {
    auth: {
      storage: undefined,
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

let _supabaseAdmin: ReturnType<typeof createSupabaseAdminClient> | undefined;

export const supabaseAdmin = new Proxy({} as ReturnType<typeof createSupabaseAdminClient>, {
  get(_, prop, receiver) {
    if (!_supabaseAdmin) _supabaseAdmin = createSupabaseAdminClient();
    return Reflect.get(_supabaseAdmin, prop, receiver);
  },
});
