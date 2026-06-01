import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ImageUploader } from "@/components/admin/ImageUploader";

type Banner = {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string;
  button_text: string | null;
  button_link: string | null;
  active: boolean;
  order_position: number;
};

export const Route = createFileRoute("/admin/banners")({
  component: AdminBanners,
});

function AdminBanners() {
  const qc = useQueryClient();
  const { data: banners = [], refetch } = useQuery({
    queryKey: ["admin-banners"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("hero_banners")
        .select("*")
        .order("order_position");
      if (error) throw error;
      return data as Banner[];
    },
  });

  const [editing, setEditing] = useState<Banner | null>(null);

  const remove = async (id: string) => {
    if (!confirm("Excluir banner?")) return;
    const { error } = await supabase.from("hero_banners").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Excluído");
    refetch();
  };

  const move = async (b: Banner, dir: number) => {
    const { error } = await supabase
      .from("hero_banners")
      .update({ order_position: b.order_position + dir })
      .eq("id", b.id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["admin-banners"] });
    qc.invalidateQueries({ queryKey: ["hero-banners"] });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl">Banners da home</h1>
          <p className="text-sm text-muted-foreground">Hero carousel premium da vitrine</p>
        </div>
        <button
          onClick={() => setEditing({ id: "", title: "", subtitle: "", image_url: "", button_text: "Comprar", button_link: "/loja", active: true, order_position: banners.length })}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-xs tracking-editorial uppercase rounded-sm"
        >
          <Plus className="h-4 w-4" /> Novo banner
        </button>
      </div>

      <div className="bg-background border border-border rounded-sm divide-y divide-border">
        {banners.length === 0 && (
          <div className="p-8 text-sm text-muted-foreground text-center">
            Nenhum banner cadastrado. Crie o primeiro.
          </div>
        )}
        {banners.map((b) => (
          <div key={b.id} className="p-4 flex gap-4 items-center">
            <img src={b.image_url} alt="" className="w-28 h-16 object-cover rounded-sm bg-secondary" />
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{b.title}</div>
              <div className="text-xs text-muted-foreground truncate">{b.subtitle}</div>
              <div className="text-[10px] mt-1 tracking-editorial uppercase">
                {b.active ? <span className="text-green-700">Ativo</span> : <span className="text-muted-foreground">Inativo</span>} · ordem {b.order_position}
              </div>
            </div>
            <div className="flex gap-1">
              <button onClick={() => move(b, -1)} className="p-2 hover:bg-secondary rounded-sm"><ArrowUp className="h-4 w-4" /></button>
              <button onClick={() => move(b, 1)} className="p-2 hover:bg-secondary rounded-sm"><ArrowDown className="h-4 w-4" /></button>
              <button onClick={() => setEditing(b)} className="p-2 hover:bg-secondary rounded-sm"><Pencil className="h-4 w-4" /></button>
              <button onClick={() => remove(b.id)} className="p-2 hover:bg-secondary rounded-sm text-destructive"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <BannerEditor
          banner={editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            qc.invalidateQueries({ queryKey: ["admin-banners"] });
            qc.invalidateQueries({ queryKey: ["hero-banners"] });
          }}
        />
      )}
    </div>
  );
}

function BannerEditor({ banner, onClose, onSaved }: { banner: Banner; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState(banner);
  const [saving, setSaving] = useState(false);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.image_url) return toast.error("Título e imagem são obrigatórios");
    setSaving(true);
    const payload = {
      title: form.title,
      subtitle: form.subtitle || null,
      image_url: form.image_url,
      button_text: form.button_text || null,
      button_link: form.button_link || null,
      active: form.active,
      order_position: form.order_position,
    };
    const { error } = form.id
      ? await supabase.from("hero_banners").update(payload).eq("id", form.id)
      : await supabase.from("hero_banners").insert(payload);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Salvo");
    onSaved();
  };

  const input = "w-full border border-border rounded-sm px-3 py-2 text-sm bg-background";
  const label = "text-xs tracking-editorial uppercase mb-1.5 block";

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <form onSubmit={save} onClick={(e) => e.stopPropagation()} className="bg-background rounded-sm max-w-2xl w-full p-6 space-y-4 my-8">
        <h2 className="font-display text-2xl">{form.id ? "Editar banner" : "Novo banner"}</h2>
        <div>
          <label className={label}>Imagem *</label>
          <ImageUploader value={form.image_url} onChange={(url) => setForm({ ...form, image_url: url })} folder="banners" />
        </div>
        <div>
          <label className={label}>Título *</label>
          <input className={input} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        </div>
        <div>
          <label className={label}>Subtítulo</label>
          <textarea className={input} rows={2} value={form.subtitle ?? ""} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={label}>Texto do botão</label>
            <input className={input} value={form.button_text ?? ""} onChange={(e) => setForm({ ...form, button_text: e.target.value })} />
          </div>
          <div>
            <label className={label}>Link do botão</label>
            <input className={input} placeholder="/loja" value={form.button_link ?? ""} onChange={(e) => setForm({ ...form, button_link: e.target.value })} />
          </div>
          <div>
            <label className={label}>Ordem</label>
            <input type="number" className={input} value={form.order_position} onChange={(e) => setForm({ ...form, order_position: parseInt(e.target.value || "0") })} />
          </div>
          <label className="flex items-end gap-2 text-sm pb-2">
            <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
            Ativo
          </label>
        </div>
        <div className="flex gap-3 pt-2">
          <button disabled={saving} className="bg-primary text-primary-foreground px-5 py-2.5 text-xs tracking-editorial uppercase rounded-sm disabled:opacity-50">
            {saving ? "Salvando..." : "Salvar"}
          </button>
          <button type="button" onClick={onClose} className="border border-border px-5 py-2.5 text-xs tracking-editorial uppercase rounded-sm">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
