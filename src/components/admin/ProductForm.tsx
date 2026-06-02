import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { X, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { slugify } from "@/lib/format";
import type { Product, Category } from "@/lib/types";

interface Props {
  productId?: string;
}

export function ProductForm({ productId }: Props) {
  const navigate = useNavigate();
  const isEdit = !!productId;

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await supabase.from("categories").select("*").order("name");
      return (data ?? []) as unknown as Category[];
    },
  });

  const { data: existing } = useQuery({
    queryKey: ["product-edit", productId],
    enabled: isEdit,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId!)
        .single();
      if (error) throw error;
      return data as unknown as Product;
    },
  });

  const [form, setForm] = useState({
    name: "",
    description: "",
    category_id: "",
    price: "",
    sale_price: "",
    stock: "0",
    sku: "",
    sizes: "",
    colors: "",
    is_featured: false,
    is_new: true,
    is_on_sale: false,
    is_active: true,
  });
  const [images, setImages] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (existing) {
      setForm({
        name: existing.name,
        description: existing.description ?? "",
        category_id: existing.category_id ?? "",
        price: String(existing.price),
        sale_price: existing.sale_price ? String(existing.sale_price) : "",
        stock: String(existing.stock),
        sku: existing.sku ?? "",
        sizes: existing.sizes.join(", "),
        colors: existing.colors.join(", "),
        is_featured: existing.is_featured,
        is_new: existing.is_new,
        is_on_sale: existing.is_on_sale,
        is_active: existing.is_active,
      });
      setImages(existing.images);
    }
  }, [existing]);

  const upload = async (files: FileList) => {
    setUploading(true);
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        const ext = file.name.split(".").pop();
        const path = `${crypto.randomUUID()}.${ext}`;
        const { error } = await supabase.storage.from("products").upload(path, file);
        if (error) throw error;
        const { data } = supabase.storage.from("products").getPublicUrl(path);
        urls.push(data.publicUrl);
      }
      setImages((prev) => [...prev, ...urls]);
      toast.success(`${urls.length} imagem(ns) enviada(s)`);
    } catch (e: any) {
      toast.error(e.message ?? "Erro no upload");
    } finally {
      setUploading(false);
    }
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price) return toast.error("Nome e preço são obrigatórios");
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        slug: slugify(form.name) + (isEdit ? "" : "-" + Math.random().toString(36).slice(2, 6)),
        description: form.description || null,
        category_id: form.category_id || null,
        price: parseFloat(form.price),
        sale_price: form.sale_price ? parseFloat(form.sale_price) : null,
        stock: parseInt(form.stock || "0"),
        sku: form.sku || null,
        sizes: form.sizes
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        colors: form.colors
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        images,
        is_featured: form.is_featured,
        is_new: form.is_new,
        is_on_sale: form.is_on_sale,
        is_active: form.is_active,
      };
      if (isEdit) {
        const { slug, ...update } = payload;
        const { error } = await supabase.from("products").update(update).eq("id", productId!);
        if (error) throw error;
        toast.success("Produto atualizado");
      } else {
        const { error } = await supabase.from("products").insert(payload);
        if (error) throw error;
        toast.success("Produto criado");
      }
      navigate({ to: "/admin/produtos" });
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  const input = "w-full border border-border rounded-sm px-3 py-2 text-sm bg-background";
  const label = "text-xs tracking-editorial uppercase mb-1.5 block";

  return (
    <form onSubmit={save} className="max-w-4xl space-y-6">
      <h1 className="font-display text-3xl">{isEdit ? "Editar produto" : "Novo produto"}</h1>

      <div className="bg-background border border-border rounded-sm p-6 space-y-4">
        <div>
          <label className={label}>Nome *</label>
          <input
            className={input}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label className={label}>Descrição</label>
          <textarea
            className={input}
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className={label}>Categoria</label>
            <select
              className={input}
              value={form.category_id}
              onChange={(e) => setForm({ ...form, category_id: e.target.value })}
            >
              <option value="">—</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={label}>SKU</label>
            <input
              className={input}
              value={form.sku}
              onChange={(e) => setForm({ ...form, sku: e.target.value })}
            />
          </div>
          <div>
            <label className={label}>Estoque</label>
            <input
              type="number"
              min={0}
              className={input}
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
            />
          </div>
          <div>
            <label className={label}>Preço (R$) *</label>
            <input
              type="number"
              step="0.01"
              min={0}
              className={input}
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
            />
          </div>
          <div>
            <label className={label}>Preço promo (R$)</label>
            <input
              type="number"
              step="0.01"
              min={0}
              className={input}
              value={form.sale_price}
              onChange={(e) => setForm({ ...form, sale_price: e.target.value })}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={label}>Tamanhos (separados por vírgula)</label>
            <input
              className={input}
              placeholder="P, M, G, GG"
              value={form.sizes}
              onChange={(e) => setForm({ ...form, sizes: e.target.value })}
            />
          </div>
          <div>
            <label className={label}>Cores (separadas por vírgula)</label>
            <input
              className={input}
              placeholder="Rosa, Preto, Off-white"
              value={form.colors}
              onChange={(e) => setForm({ ...form, colors: e.target.value })}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-sm pt-2">
          {(
            [
              ["is_active", "Ativo"],
              ["is_featured", "Destaque"],
              ["is_new", "Novidade"],
              ["is_on_sale", "Em promoção"],
            ] as const
          ).map(([k, l]) => (
            <label key={k} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form[k as keyof typeof form] as boolean}
                onChange={(e) => setForm({ ...form, [k]: e.target.checked })}
              />
              {l}
            </label>
          ))}
        </div>
      </div>

      <div className="bg-background border border-border rounded-sm p-6">
        <label className={label}>Imagens</label>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-3">
          {images.map((url, i) => (
            <div
              key={i}
              className="relative aspect-square bg-secondary rounded-sm overflow-hidden group"
            >
              <img src={url} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => setImages(images.filter((_, j) => j !== i))}
                className="absolute top-1 right-1 bg-background/90 rounded-full p-1 opacity-0 group-hover:opacity-100"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          <label className="aspect-square border-2 border-dashed border-border rounded-sm flex flex-col items-center justify-center text-xs text-muted-foreground cursor-pointer hover:bg-secondary">
            <Upload className="h-5 w-5 mb-1" />
            {uploading ? "Enviando..." : "Enviar"}
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => e.target.files && upload(e.target.files)}
            />
          </label>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-primary text-primary-foreground px-6 py-3 text-xs tracking-editorial uppercase rounded-sm disabled:opacity-50"
        >
          {saving ? "Salvando..." : isEdit ? "Salvar alterações" : "Criar produto"}
        </button>
        <button
          type="button"
          onClick={() => navigate({ to: "/admin/produtos" })}
          className="border border-border px-6 py-3 text-xs tracking-editorial uppercase rounded-sm"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
