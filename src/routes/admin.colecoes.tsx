import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ImageUploader } from "@/components/admin/ImageUploader";

type Collection = {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string;
  redirect_url: string | null;
  order_position: number;
  active: boolean;
};

export const Route = createFileRoute("/admin/colecoes")({
  component: AdminCollections,
});

function AdminCollections() {
  const qc = useQueryClient();
  const { data: items = [], refetch } = useQuery({
    queryKey: ["admin-collections"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("homepage_collections")
        .select("*")
        .order("order_position");
      if (error) throw error;
      return data as Collection[];
    },
  });
  const [editing, setEditing] = useState<Collection | null>(null);

  const remove = async (id: string) => {
    if (!confirm("Excluir coleção?")) return;
    const { error } = await supabase.from("homepage_collections").delete().eq("id", id);
    if (error) return toast.error(error.message);
    refetch();
    qc.invalidateQueries({ queryKey: ["homepage-collections"] });
  };

  const move = async (c: Collection, dir: number) => {
    await supabase
      .from("homepage_collections")
      .update({ order_position: c.order_position + dir })
      .eq("id", c.id);
    qc.invalidateQueries({ queryKey: ["admin-collections"] });
    qc.invalidateQueries({ queryKey: ["homepage-collections"] });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl">Coleções</h1>
          <p className="text-sm text-muted-foreground">Cards premium da home</p>
        </div>
        <button
          onClick={() =>
            setEditing({
              id: "",
              title: "",
              subtitle: "",
              image_url: "",
              redirect_url: "/loja",
              order_position: items.length,
              active: true,
            })
          }
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-xs tracking-editorial uppercase rounded-sm"
        >
          <Plus className="h-4 w-4" /> Nova coleção
        </button>
      </div>

      <div className="bg-background border border-border rounded-sm divide-y divide-border">
        {items.length === 0 && (
          <div className="p-8 text-sm text-muted-foreground text-center">Sem coleções.</div>
        )}
        {items.map((c) => (
          <div key={c.id} className="p-4 flex gap-4 items-center">
            <img
              src={c.image_url}
              alt=""
              className="w-20 h-20 object-cover rounded-sm bg-secondary"
            />
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{c.title}</div>
              <div className="text-xs text-muted-foreground truncate">
                {c.subtitle} · {c.redirect_url}
              </div>
              <div className="text-[10px] mt-1 tracking-editorial uppercase">
                {c.active ? (
                  <span className="text-green-700">Ativa</span>
                ) : (
                  <span className="text-muted-foreground">Inativa</span>
                )}{" "}
                · ordem {c.order_position}
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
        ))}
      </div>

      {editing && (
        <Editor
          item={editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            qc.invalidateQueries({ queryKey: ["admin-collections"] });
            qc.invalidateQueries({ queryKey: ["homepage-collections"] });
          }}
        />
      )}
    </div>
  );
}

function Editor({
  item,
  onClose,
  onSaved,
}: {
  item: Collection;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState(item);
  const [saving, setSaving] = useState(false);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.image_url) return toast.error("Título e imagem são obrigatórios");
    setSaving(true);
    const payload = {
      title: form.title,
      subtitle: form.subtitle || null,
      image_url: form.image_url,
      redirect_url: form.redirect_url || null,
      order_position: form.order_position,
      active: form.active,
    };
    const { error } = form.id
      ? await supabase.from("homepage_collections").update(payload).eq("id", form.id)
      : await supabase.from("homepage_collections").insert(payload);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Salvo");
    onSaved();
  };

  const input = "w-full border border-border rounded-sm px-3 py-2 text-sm bg-background";
  const label = "text-xs tracking-editorial uppercase mb-1.5 block";

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <form
        onSubmit={save}
        onClick={(e) => e.stopPropagation()}
        className="bg-background rounded-sm max-w-2xl w-full p-6 space-y-4 my-8"
      >
        <h2 className="font-display text-2xl">{form.id ? "Editar coleção" : "Nova coleção"}</h2>
        <div>
          <label className={label}>Imagem *</label>
          <ImageUploader
            value={form.image_url}
            onChange={(url) => setForm({ ...form, image_url: url })}
            folder="collections"
          />
        </div>
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
          <label className={label}>Subtítulo</label>
          <input
            className={input}
            value={form.subtitle ?? ""}
            onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className={label}>Link de redirecionamento</label>
            <input
              className={input}
              placeholder="/loja?cat=vestidos"
              value={form.redirect_url ?? ""}
              onChange={(e) => setForm({ ...form, redirect_url: e.target.value })}
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
