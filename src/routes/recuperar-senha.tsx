import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/recuperar-senha")({
  component: RecuperarSenhaPage,
});

function RecuperarSenhaPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "https://modasnicoly.com.br/atualizar-senha",
      });
      if (error) throw error;
      setSent(true);
      toast.success("E-mail de recuperação enviado!");
    } catch (err: any) {
      toast.error(err.message ?? "Erro ao solicitar recuperação");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-editorial py-16 md:py-24 max-w-md mx-auto">
      <h1 className="font-display text-4xl text-center mb-2">Recuperar Senha</h1>
      <p className="text-sm text-muted-foreground text-center mb-8">
        Digite seu e-mail para receber um link de redefinição de senha.
      </p>

      {sent ? (
        <div className="text-center space-y-4">
          <p className="text-sm text-green-600 bg-green-50 p-4 rounded-sm border border-green-200">
            Enviamos um link de redefinição para o e-mail: <strong>{email}</strong>
          </p>
          <Link to="/login" className="text-xs tracking-editorial uppercase hover:underline">
            Voltar para o Login
          </Link>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-xs tracking-editorial uppercase mb-1.5 block">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-border rounded-sm px-3 py-2.5 text-sm bg-background"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3 text-xs tracking-editorial uppercase rounded-sm disabled:opacity-50"
          >
            {loading ? "Aguarde..." : "Enviar link"}
          </button>
          <div className="text-center mt-4">
            <Link to="/login" className="text-xs text-muted-foreground hover:text-foreground">
              Voltar
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
