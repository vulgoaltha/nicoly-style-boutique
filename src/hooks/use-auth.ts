import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { checkAdminRole } from "@/lib/auth.functions";

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) {
        setTimeout(() => {
          checkAdminRole({ data: s.user!.id })
            .then((data) => {
              console.log("DEBUG AUTH onAuthStateChange: valor final de isAdmin =", data.isAdmin);
              setIsAdmin(data.isAdmin);
            })
            .catch(() => setIsAdmin(false));
        }, 0);
      } else {
        setIsAdmin(false);
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
      if (data.session?.user) {
        checkAdminRole({ data: data.session.user.id })
          .then((apiData) => {
            console.log("DEBUG AUTH: valor final de isAdmin =", apiData.isAdmin);
            setIsAdmin(apiData.isAdmin);
          })
          .catch(() => setIsAdmin(false));
      }
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  return { session, user, isAdmin, loading };
}
