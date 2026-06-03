import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/atualizar-senha")({
  component: AtualizarSenhaPage,
});

function AtualizarSenhaPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Verifica se há uma sessão de recuperação ativa
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        toast.error("Sessão inválida ou expirada. Tente recuperar a senha novamente.");
        navigate({ to: "/recuperar-senha" });
      }
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast.success("Senha atualizada com sucesso!");
      navigate({ to: "/minha-conta/pedidos" });
    } catch (err: any) {
      toast.error(err.message ?? "Erro ao atualizar senha");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-editorial py-16 md:py-24 max-w-md mx-auto">
      <h1 className="font-display text-4xl text-center mb-2">Nova Senha</h1>
      <p className="text-sm text-muted-foreground text-center mb-8">
        Digite sua nova senha abaixo.
      </p>

      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="text-xs tracking-editorial uppercase mb-1.5 block">Nova Senha</label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-border rounded-sm px-3 py-2.5 text-sm bg-background"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-primary-foreground py-3 text-xs tracking-editorial uppercase rounded-sm disabled:opacity-50"
        >
          {loading ? "Aguarde..." : "Salvar Senha"}
        </button>
      </form>
    </div>
  );
}
