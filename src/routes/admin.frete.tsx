import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Truck, Bike, PackageCheck, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/admin/frete")({
  component: AdminFrete,
});

const inputClass =
  "w-full border border-border rounded-sm px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20";
const labelClass =
  "text-xs tracking-editorial uppercase mb-1.5 block text-muted-foreground font-medium";
const sectionClass = "bg-background border border-border rounded-sm p-6 space-y-4";

function useShippingSettings() {
  return useQuery({
    queryKey: ["site_settings", "shipping_settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "shipping_settings")
        .maybeSingle();
      if (error) throw error;
      return data?.value || {};
    },
  });
}

function SettingsSection({ title, description, children, icon: Icon }: any) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
        <div>
          <h2 className="font-medium text-lg">{title}</h2>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

function AdminFrete() {
  const qc = useQueryClient();
  const { data: settings, isLoading } = useShippingSettings();
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    store_cep: "04864-090",
    whatsapp_number: "5511994565923",
    motoboy_enabled: true,
    motoboy_max_distance: 10,
    motoboy_base_price: 0,
    motoboy_price_per_km: 5,
    correios_api_enabled: true,
    correios_codigo_sedex: "04016",
    correios_codigo_pac: "04510",
    correios_usuario: "",
    correios_senha: "",
    correios_pac_sp: 18.5,
    correios_pac_br: 38.5,
    correios_sedex_sp: 25.9,
    correios_sedex_br: 65.9,
    melhorenvio_enabled: false,
    melhorenvio_sandbox: true,
    melhorenvio_token: "",
    default_package_weight: 0.3,
    default_package_height: 4,
    default_package_width: 20,
    default_package_length: 25,
  });

  useEffect(() => {
    if (settings && Object.keys(settings).length > 0) {
      setForm((prev) => ({
        ...prev,
        ...(settings as Record<string, any>),
      }));
    }
  }, [settings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from("site_settings").upsert({
      key: "shipping_settings",
      value: form,
    });
    setSaving(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Configurações de frete salvas com sucesso!");
      qc.invalidateQueries({ queryKey: ["site_settings", "shipping_settings"] });
    }
  };

  if (isLoading) {
    return <div className="p-10 text-sm text-muted-foreground">Carregando configurações...</div>;
  }

  return (
    <div className="max-w-4xl space-y-10">
      <div>
        <h1 className="font-display text-2xl md:text-3xl mb-1">Frete e Envios</h1>
        <p className="text-sm text-muted-foreground">
          Configure a integração oficial dos Correios, Melhor Envio e Motoboy.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Origem */}
        <SettingsSection
          title="Dados de Origem (Sede/Loja)"
          description="Usado para calcular o frete exato no servidor dos Correios."
          icon={MapPin}
        >
          <div className={sectionClass}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>CEP da Loja (Origem)</label>
                <input
                  name="store_cep"
                  value={form.store_cep}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="04864-090"
                  required
                />
              </div>
              <div>
                <label className={labelClass}>WhatsApp da Atendente (Motoboy)</label>
                <input
                  name="whatsapp_number"
                  value={form.whatsapp_number}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="5511994565923"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Com DDI e DDD (Ex: 5511994565923)
                </p>
              </div>
            </div>
          </div>
        </SettingsSection>

        {/* API Oficial dos Correios */}
        <SettingsSection
          title="API Oficial dos Correios (Preço e Prazo)"
          description="Cotação em tempo real diretamente dos servidores dos Correios."
          icon={Truck}
        >
          <div className={sectionClass}>
            <div className="flex items-center gap-2 mb-4 border-b border-border pb-4">
              <input
                type="checkbox"
                name="correios_api_enabled"
                id="correios_api_enabled"
                checked={form.correios_api_enabled}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="correios_api_enabled" className="text-sm font-medium cursor-pointer">
                Habilitar Cotação Oficial dos Correios (PAC / SEDEX)
              </label>
            </div>

            {form.correios_api_enabled && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Código do Serviço SEDEX</label>
                    <input
                      name="correios_codigo_sedex"
                      value={form.correios_codigo_sedex}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="04016 (sem contrato) ou 04782"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Padrão sem contrato: <strong>04016</strong>
                    </p>
                  </div>
                  <div>
                    <label className={labelClass}>Código do Serviço PAC</label>
                    <input
                      name="correios_codigo_pac"
                      value={form.correios_codigo_pac}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="04510 (sem contrato) ou 04669"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Padrão sem contrato: <strong>04510</strong>
                    </p>
                  </div>
                </div>

                <div className="bg-secondary/20 p-4 rounded border border-border space-y-3">
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-editorial">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    Contrato Correios (Opcional)
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Usuário / Código da Empresa</label>
                      <input
                        name="correios_usuario"
                        value={form.correios_usuario}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Opcional (apenas para contrato)"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Senha / Cartão de Postagem</label>
                      <input
                        type="password"
                        name="correios_senha"
                        value={form.correios_senha}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Opcional (apenas para contrato)"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </SettingsSection>

        {/* Integração Melhor Envio */}
        <SettingsSection
          title="Integração Melhor Envio (Opcional)"
          description="Cotação alternativa e geração de etiquetas."
          icon={PackageCheck}
        >
          <div className={sectionClass}>
            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                name="melhorenvio_enabled"
                id="melhorenvio_enabled"
                checked={form.melhorenvio_enabled}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300"
              />
              <label htmlFor="melhorenvio_enabled" className="text-sm font-medium cursor-pointer">
                Habilitar Melhor Envio
              </label>
            </div>

            {form.melhorenvio_enabled && (
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Token de Acesso da API (Bearer Token)</label>
                  <input
                    type="password"
                    name="melhorenvio_token"
                    value={form.melhorenvio_token}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Cole seu token do Melhor Envio..."
                  />
                </div>
              </div>
            )}
          </div>
        </SettingsSection>

        {/* Motoboy */}
        <SettingsSection
          title="Motoboy Próprio"
          description="Configurações de entrega local via WhatsApp."
          icon={Bike}
        >
          <div className={sectionClass}>
            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                name="motoboy_enabled"
                id="motoboy_enabled"
                checked={form.motoboy_enabled}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300"
              />
              <label htmlFor="motoboy_enabled" className="text-sm font-medium">
                Habilitar entrega via Motoboy (WhatsApp)
              </label>
            </div>
          </div>
        </SettingsSection>

        {/* Tabela Fixo (Fallback) */}
        <SettingsSection
          title="Tabela de Frete Fixo Correios (Fallback)"
          description="Usado caso a cotação em tempo real esteja inacessível."
          icon={Truck}
        >
          <div className={sectionClass}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium text-sm">Estado de Origem (Ex: SP)</h3>
                <div>
                  <label className={labelClass}>PAC (SP)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="correios_pac_sp"
                    value={form.correios_pac_sp}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>SEDEX (SP)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="correios_sedex_sp"
                    value={form.correios_sedex_sp}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium text-sm">Outros Estados (Brasil)</h3>
                <div>
                  <label className={labelClass}>PAC (Outros Estados)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="correios_pac_br"
                    value={form.correios_pac_br}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>SEDEX (Outros Estados)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="correios_sedex_br"
                    value={form.correios_sedex_br}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </SettingsSection>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="w-full sm:w-auto bg-primary text-primary-foreground px-8 py-3 text-xs tracking-editorial uppercase rounded-sm disabled:opacity-50"
          >
            {saving ? "Salvando..." : "Salvar Configurações"}
          </button>
        </div>
      </form>
    </div>
  );
}
