import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/configuracoes")({
  component: AdminSettings,
});

function AdminSettings() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["site-setting", "instagram", "admin"],
    queryFn: async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "instagram")
        .maybeSingle();
      return (data?.value as { username: string; url: string; active: boolean } | null) ?? null;
    },
  });

  const [form, setForm] = useState({
    username: "_nicoly.modas",
    url: "https://www.instagram.com/_nicoly.modas",
    active: true,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase
      .from("site_settings")
      .upsert({ key: "instagram", value: form });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Configurações salvas");
    qc.invalidateQueries({ queryKey: ["site-setting"] });
  };

  const input = "w-full border border-border rounded-sm px-3 py-2 text-sm bg-background";
  const label = "text-xs tracking-editorial uppercase mb-1.5 block";

  return (
    <div className="max-w-xl">
      <h1 className="font-display text-3xl mb-1">Configurações do site</h1>
      <p className="text-sm text-muted-foreground mb-8">Instagram oficial e ajustes gerais</p>

      <form onSubmit={save} className="bg-background border border-border rounded-sm p-6 space-y-4">
        <h2 className="font-medium">Instagram</h2>
        <div>
          <label className={label}>Username (sem @)</label>
          <input
            className={input}
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </div>
        <div>
          <label className={label}>URL completa</label>
          <input
            className={input}
            type="url"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
          />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => setForm({ ...form, active: e.target.checked })}
          />
          Exibir no site
        </label>
        <div className="pt-2">
          <button
            disabled={saving}
            className="bg-primary text-primary-foreground px-5 py-2.5 text-xs tracking-editorial uppercase rounded-sm disabled:opacity-50"
          >
            {saving ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
}
