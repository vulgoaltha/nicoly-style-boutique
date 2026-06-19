import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import * as Icons from "lucide-react";
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type HCategory = {
  id: string;
  title: string;
  icon: string;
  color: string;
  slug: string;
  order_position: number;
  active: boolean;
};

const ICON_OPTIONS: { value: string; label: string }[] = [
  { value: "Shirt", label: "👚 Camiseta" },
  { value: "ShoppingBag", label: "🛍️ Sacola de Compras" },
  { value: "Sparkles", label: "✨ Brilhos" },
  { value: "Crown", label: "👑 Coroa" },
  { value: "Heart", label: "❤️ Coração" },
  { value: "Gem", label: "💎 Joia" },
  { value: "Scissors", label: "✂️ Tesoura" },
  { value: "Footprints", label: "👣 Calçado" },
  { value: "Watch", label: "⌚ Relógio" },
  { value: "Glasses", label: "👓 Óculos" },
  { value: "Flower2", label: "🌸 Flor" },
  { value: "Star", label: "⭐ Estrela" },
  { value: "Sun", label: "☀️ Sol" },
  { value: "Palette", label: "🎨 Paleta de Cores" },
];

export const Route = createFileRoute("/admin/categorias-home")({
  component: AdminHomeCategories,
});

function AdminHomeCategories() {
  const qc = useQueryClient();
  const { data: cats = [], refetch } = useQuery({
    queryKey: ["admin-hp-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("homepage_categories")
        .select("*")
        .order("order_position");
      if (error) throw error;
      return data as HCategory[];
    },
  });
  const [editing, setEditing] = useState<HCategory | null>(null);

  const remove = async (id: string) => {
    if (!confirm("Remover esta categoria?")) return;
    const { error } = await supabase.from("homepage_categories").delete().eq("id", id);
    if (error) return toast.error(error.message);
    
    toast.success("Categoria removida");
    qc.invalidateQueries({ queryKey: ["admin-hp-categories"] });
  };

  const move = async (c: HCategory, dir: number) => {
    await supabase
      .from("homepage_categories")
      .update({ order_position: c.order_position + dir })
      .eq("id", c.id);
    qc.invalidateQueries({ queryKey: ["admin-hp-categories"] });
    qc.invalidateQueries({ queryKey: ["homepage-categories"] });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl">Categorias da home</h1>
          <p className="text-sm text-muted-foreground">Carousel de categorias premium</p>
        </div>
        <button
          onClick={() =>
            setEditing({
              id: "",
              title: "",
              icon: "Shirt",
              color: "#f4d6d6",
              slug: "",
              order_position: cats.length,
              active: true,
            })
          }
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-xs tracking-editorial uppercase rounded-sm"
        >
          <Plus className="h-4 w-4" /> Nova categoria
        </button>
      </div>

      <div className="bg-background border border-border rounded-sm divide-y divide-border">
        {cats.length === 0 && (
          <div className="p-8 text-sm text-muted-foreground text-center">Sem categorias.</div>
        )}
        {cats.map((c) => {
          const Ico = (Icons as any)[c.icon] ?? Icons.Shirt;
          return (
            <div key={c.id} className="p-4 flex gap-4 items-center">
              <div
                className="h-12 w-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: c.color }}
              >
                <Ico className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="font-medium">{c.title}</div>
                <div className="text-xs text-muted-foreground">
                  slug: {c.slug} · {c.active ? "ativa" : "inativa"} · ordem {c.order_position}
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => move(c, -1)} className="p-2 hover:bg-secondary rounded-sm">
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button onClick={() => move(c, 1)} className="p-2 hover:bg-secondary rounded-sm">
                  <ArrowDown className="h-4 w-4" />
                </button>
                <button onClick={() => setEditing(c)} className="p-2 hover:bg-secondary rounded-sm">
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => remove(c.id)}
                  className="p-2 hover:bg-secondary rounded-sm text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {editing && (
        <Editor
          cat={editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            qc.invalidateQueries({ queryKey: ["admin-hp-categories"] });
            qc.invalidateQueries({ queryKey: ["homepage-categories"] });
          }}
        />
      )}
    </div>
  );
}

function Editor({
  cat,
  onClose,
  onSaved,
}: {
  cat: HCategory;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState(cat);
  const [saving, setSaving] = useState(false);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.slug) return toast.error("Título e slug são obrigatórios");
    setSaving(true);
    const payload = {
      title: form.title,
      icon: form.icon,
      color: form.color,
      slug: form.slug,
      order_position: form.order_position,
      active: form.active,
    };
    const { error } = form.id
      ? await supabase.from("homepage_categories").update(payload).eq("id", form.id)
      : await supabase.from("homepage_categories").insert(payload);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Salvo");
    onSaved();
  };

  const input = "w-full border border-border rounded-sm px-3 py-2 text-sm bg-background";
  const label = "text-xs tracking-editorial uppercase mb-1.5 block";

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <form
        onSubmit={save}
        onClick={(e) => e.stopPropagation()}
        className="bg-background rounded-sm max-w-lg w-full p-6 space-y-4"
      >
        <h2 className="font-display text-2xl">{form.id ? "Editar categoria" : "Nova categoria"}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={label}>Título *</label>
            <input
              className={input}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label className={label}>Slug *</label>
            <input
              className={input}
              placeholder="vestidos"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              required
            />
          </div>
          <div>
            <label className={label}>Ícone</label>
            <select
              className={input}
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
            >
              {ICON_OPTIONS.map((i) => (
                <option key={i.value} value={i.value}>
                  {i.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={label}>Cor do círculo</label>
            <input
              type="color"
              className="w-full h-10 border border-border rounded-sm bg-background"
              value={form.color}
              onChange={(e) => setForm({ ...form, color: e.target.value })}
            />
          </div>
          <div>
            <label className={label}>Ordem</label>
            <input
              type="number"
              className={input}
              value={form.order_position}
              onChange={(e) =>
                setForm({ ...form, order_position: parseInt(e.target.value || "0") })
              }
            />
          </div>
          <label className="flex items-end gap-2 text-sm pb-2">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
            />
            Ativa
          </label>
        </div>
        <div className="flex gap-3 pt-2">
          <button
            disabled={saving}
            className="bg-primary text-primary-foreground px-5 py-2.5 text-xs tracking-editorial uppercase rounded-sm disabled:opacity-50"
          >
            {saving ? "Salvando..." : "Salvar"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="border border-border px-5 py-2.5 text-xs tracking-editorial uppercase rounded-sm"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
