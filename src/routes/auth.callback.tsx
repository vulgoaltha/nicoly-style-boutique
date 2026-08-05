import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/auth/callback")({
  component: AuthCallbackPage,
});

function AuthCallbackPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Processando autenticação...");

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");

    if (code) {
      supabase.auth.exchangeCodeForSession(code).then(({ data, error }) => {
        if (error) {
          toast.error("Erro ao confirmar e-mail: " + error.message);
          setStatus("Falha na autenticação. Redirecionando...");
          setTimeout(() => navigate({ to: "/login" }), 2000);
        } else {
          toast.success("Conta confirmada com sucesso! Bem-vinda.");
          setStatus("Sucesso! Redirecionando...");
          setTimeout(() => navigate({ to: "/minha-conta/pedidos" }), 1000);
        }
      });
    } else {
      setStatus("Nenhum código de autenticação encontrado. Redirecionando...");
      setTimeout(() => navigate({ to: "/login" }), 2000);
    }
  }, [navigate]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-2xl mb-2">{status}</h1>
        <p className="text-muted-foreground">Aguarde...</p>
      </div>
    </div>
  );
}
