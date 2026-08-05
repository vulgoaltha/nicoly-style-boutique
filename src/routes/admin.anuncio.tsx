import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/anuncio")({
  component: AdminAnnouncement,
});

type Form = {
  text: string;
  bg_color: string;
  text_color: string;
  active: boolean;
  speed: number;
};

const DEFAULT: Form = {
  text: "5% de desconto na primeira compra!",
  bg_color: "#f4d6d6",
  text_color: "#3a1f1f",
  active: true,
  speed: 30,
};

function AdminAnnouncement() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["site-setting", "announcement_bar", "admin"],
    queryFn: async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "announcement_bar")
        .maybeSingle();
      return (data?.value as Partial<Form> | null) ?? null;
    },
  });

  const [form, setForm] = useState<Form>(DEFAULT);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) setForm({ ...DEFAULT, ...data });
  }, [data]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase
      .from("site_settings")
      .upsert({ key: "announcement_bar", value: form });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Barra de anúncios salva");
    qc.invalidateQueries({ queryKey: ["site-setting"] });
  };

  const input = "w-full border border-border rounded-sm px-3 py-2 text-sm bg-background";
  const label = "text-xs tracking-editorial uppercase mb-1.5 block";

  return (
    <div className="max-w-xl">
      <h1 className="font-display text-3xl mb-1">Barra de anúncios</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Marquee infinito exibido acima e abaixo do banner principal
      </p>

      {/* Preview */}
      <div
        className="mb-6 overflow-hidden rounded-sm border border-border"
        style={{ backgroundColor: form.bg_color, color: form.text_color }}
      >
        <div
          className="flex whitespace-nowrap py-2.5"
          style={{ animation: `marquee ${form.speed}s linear infinite`, width: "max-content" }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="px-8 text-xs tracking-editorial uppercase font-medium inline-flex items-center"
            >
              {form.text || "—"}
              <span className="mx-4 opacity-50">✦</span>
            </span>
          ))}
        </div>
        <style>{`@keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }`}</style>
      </div>

      <form onSubmit={save} className="bg-background border border-border rounded-sm p-6 space-y-4">
        <div>
          <label className={label}>Texto</label>
          <input
            className={input}
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
            maxLength={200}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={label}>Cor de fundo</label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                className="h-10 w-14 rounded-sm border border-border bg-background cursor-pointer"
                value={form.bg_color}
                onChange={(e) => setForm({ ...form, bg_color: e.target.value })}
              />
              <input
                className={input}
                value={form.bg_color}
                onChange={(e) => setForm({ ...form, bg_color: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className={label}>Cor do texto</label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                className="h-10 w-14 rounded-sm border border-border bg-background cursor-pointer"
                value={form.text_color}
                onChange={(e) => setForm({ ...form, text_color: e.target.value })}
              />
              <input
                className={input}
                value={form.text_color}
                onChange={(e) => setForm({ ...form, text_color: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div>
          <label className={label}>Velocidade (segundos por loop) — {form.speed}s</label>
          <input
            type="range"
            min={10}
            max={80}
            value={form.speed}
            onChange={(e) => setForm({ ...form, speed: Number(e.target.value) })}
            className="w-full"
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
