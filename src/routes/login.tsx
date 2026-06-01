import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast.success("Cadastro realizado! Verifique seu e-mail para confirmar.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Bem-vinda de volta!");
        navigate({ to: "/admin" });
      }
    } catch (err: any) {
      toast.error(err.message ?? "Erro ao autenticar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-editorial py-16 md:py-24 max-w-md">
      <h1 className="font-display text-4xl text-center mb-2">
        {mode === "login" ? "Entrar" : "Criar conta"}
      </h1>
      <p className="text-sm text-muted-foreground text-center mb-8">
        {mode === "login" ? "Acesse sua conta Nicoly Modas" : "Faça parte da nossa comunidade"}
      </p>

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
        <div>
          <label className="text-xs tracking-editorial uppercase mb-1.5 block">Senha</label>
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
          {loading ? "Aguarde..." : mode === "login" ? "Entrar" : "Cadastrar"}
        </button>
      </form>

      <button
        type="button"
        onClick={() => setMode(mode === "login" ? "signup" : "login")}
        className="w-full mt-4 text-xs text-muted-foreground hover:text-foreground"
      >
        {mode === "login" ? "Não tem conta? Cadastre-se" : "Já tem conta? Entre"}
      </button>
    </div>
  );
}
