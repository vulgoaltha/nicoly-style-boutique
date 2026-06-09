import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
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
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        if (!name || !cpf || !phone) {
          throw new Error("Por favor, preencha todos os campos.");
        }
        const { error, data } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: "https://modasnicoly.com.br/login",
            data: {
              name,
              cpf,
              phone,
            },
          },
        });
        if (error) throw error;

        if (data?.session) {
          toast.success("Cadastro realizado com sucesso!");
          navigate({ to: "/minha-conta/pedidos" });
        } else {
          toast.success("Cadastro realizado! Verifique seu e-mail para confirmar a conta.");
          setMode("login");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Bem-vinda de volta!");
        navigate({ to: "/minha-conta/pedidos" });
      }
    } catch (err: any) {
      toast.error(err.message ?? "Erro ao autenticar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-editorial py-16 md:py-24 max-w-md mx-auto">
      <h1 className="font-display text-4xl text-center mb-2">
        {mode === "login" ? "Entrar" : "Criar conta"}
      </h1>
      <p className="text-sm text-muted-foreground text-center mb-8">
        {mode === "login" ? "Acesse sua conta Nicoly Modas" : "Faça parte da nossa comunidade"}
      </p>

      <form onSubmit={submit} className="space-y-4">
        {mode === "signup" && (
          <>
            <div>
              <label className="text-xs tracking-editorial uppercase mb-1.5 block">
                Nome Completo
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-border rounded-sm px-3 py-2.5 text-sm bg-background"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs tracking-editorial uppercase mb-1.5 block">CPF</label>
                <input
                  type="text"
                  required
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  className="w-full border border-border rounded-sm px-3 py-2.5 text-sm bg-background"
                />
              </div>
              <div>
                <label className="text-xs tracking-editorial uppercase mb-1.5 block">
                  Telefone
                </label>
                <input
                  type="tel"
                  required
                  placeholder="(00) 00000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-border rounded-sm px-3 py-2.5 text-sm bg-background"
                />
              </div>
            </div>
          </>
        )}
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

        {mode === "login" && (
          <div className="flex justify-end">
            <Link
              to="/recuperar-senha"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Esqueceu a senha?
            </Link>
          </div>
        )}

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
