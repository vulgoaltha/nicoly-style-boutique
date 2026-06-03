import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { storeDataSchema, companyAddressSchema, returnAddressSchema, adminAccountSchema, changePasswordSchema, changeEmailSchema, emailSettingsSchema, generalSettingsSchema, shippingSettingsSchema, seoSettingsSchema } from "@/schemas/settingsSchema";
import type { z } from "zod";

export const Route = createFileRoute("/admin/configuracoes")({
  component: AdminSettings,
});

type StoreData = z.infer<typeof storeDataSchema>;
type CompanyAddress = z.infer<typeof companyAddressSchema>;
type ReturnAddress = z.infer<typeof returnAddressSchema>;
type AdminAccount = z.infer<typeof adminAccountSchema>;
type ChangePassword = z.infer<typeof changePasswordSchema>;
type ChangeEmail = z.infer<typeof changeEmailSchema>;
type EmailSettings = z.infer<typeof emailSettingsSchema>;
type GeneralSettings = z.infer<typeof generalSettingsSchema>;
type ShippingSettings = z.infer<typeof shippingSettingsSchema>;
type SeoSettings = z.infer<typeof seoSettingsSchema>;

const inputClass = "w-full border border-border rounded-sm px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20";
const labelClass = "text-xs tracking-editorial uppercase mb-1.5 block text-muted-foreground";
const sectionClass = "bg-background border border-border rounded-sm p-6 space-y-4";

function useSiteSettings() {
  return useQuery({
    queryKey: ["site_settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value");
      if (error) throw error;
      const settings: Record<string, any> = {};
      data.forEach((item) => {
        settings[item.key] = item.value;
      });
      return settings;
    },
  });
}

function SettingsSection({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div>
        <h2 className="font-medium text-lg">{title}</h2>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {children}
    </div>
  );
}

function AdminSettings() {
  const qc = useQueryClient();
  const { data: settings, isLoading } = useSiteSettings();
  const [saving, setSaving] = useState<string | null>(null);

  const getValue = (key: string, defaultValue?: any) => {
    if (!settings) return defaultValue ?? "";
    return settings[key] ?? defaultValue ?? "";
  };

  const saveSetting = async (key: string, value: any) => {
    setSaving(key);
    const { error } = await supabase.from("site_settings").upsert({ key, value });
    setSaving(null);
    if (error) {
      toast.error(error.message);
      return false;
    }
    toast.success("Configuração salva com sucesso");
    qc.invalidateQueries({ queryKey: ["site_settings"] });
    return true;
  };

  // --- 1. Dados da Loja ---
  const storeForm = useForm<StoreData>({ resolver: zodResolver(storeDataSchema), defaultValues: { store_name: getValue("store_name"), store_phone: getValue("store_phone"), store_email: getValue("store_email"), store_cnpj: getValue("store_cnpj"), store_logo_url: getValue("store_logo_url"), } });
  
  // --- 2. Endereço da Empresa ---
  const companyForm = useForm<CompanyAddress>({ resolver: zodResolver(companyAddressSchema), defaultValues: { company_cep: getValue("company_cep"), company_street: getValue("company_street"), company_number: getValue("company_number"), company_complement: getValue("company_complement"), company_neighborhood: getValue("company_neighborhood"), company_city: getValue("company_city"), company_state: getValue("company_state"), } });

  // --- 3. Endereço de Devolução ---
  const returnForm = useForm<ReturnAddress>({ resolver: zodResolver(returnAddressSchema), defaultValues: { return_cep: getValue("return_cep"), return_street: getValue("return_street"), return_number: getValue("return_number"), return_complement: getValue("return_complement"), return_neighborhood: getValue("return_neighborhood"), return_city: getValue("return_city"), return_state: getValue("return_state"), } });

  // --- 4. Conta Administrativa ---
  const accountForm = useForm<AdminAccount>({ resolver: zodResolver(adminAccountSchema), defaultValues: { admin_name: getValue("admin_name"), admin_phone: getValue("admin_phone"), admin_role: getValue("admin_role"), } });

  // --- 5. Alteração de Senha ---
  const passwordForm = useForm<ChangePassword>({ resolver: zodResolver(changePasswordSchema), defaultValues: { current_password: "", new_password: "", confirm_password: "" } });

  // --- 6. Alteração de Email ---
  const emailForm = useForm<ChangeEmail>({ resolver: zodResolver(changeEmailSchema), defaultValues: { new_email: "", current_password: "" } });

  // --- 7. Configurações de Email ---
  const emailSettingsForm = useForm<EmailSettings>({ resolver: zodResolver(emailSettingsSchema), defaultValues: { smtp_host: getValue("smtp_host"), smtp_port: Number(getValue("smtp_port", 587)), smtp_user: getValue("smtp_user"), smtp_password: getValue("smtp_password"), smtp_from: getValue("smtp_from"), smtp_secure: getValue("smtp_secure", true), } });

  // --- 8. Configurações Gerais ---
  const generalForm = useForm<GeneralSettings>({ resolver: zodResolver(generalSettingsSchema), defaultValues: { maintenance_mode: getValue("maintenance_mode", false), allow_register: getValue("allow_register", true), currency: getValue("currency", "BRL"), timezone: getValue("timezone", "America/Sao_Paulo"), date_format: getValue("date_format", "DD/MM/YYYY"), } });

  // --- 9. Frete ---
  const shippingForm = useForm<ShippingSettings>({ resolver: zodResolver(shippingSettingsSchema), defaultValues: { default_shipping_cost: Number(getValue("default_shipping_cost", 0)), free_shipping_threshold: Number(getValue("free_shipping_threshold", 0)), shipping_provider: getValue("shipping_provider", "manual"), delivery_time_min: Number(getValue("delivery_time_min", 1)), delivery_time_max: Number(getValue("delivery_time_max", 10)), } });

  // --- 10. SEO e Marketing ---
  const seoForm = useForm<SeoSettings>({ resolver: zodResolver(seoSettingsSchema), defaultValues: { site_title: getValue("site_title"), site_description: getValue("site_description"), site_keywords: getValue("site_keywords"), google_analytics_id: getValue("google_analytics_id"), facebook_pixel_id: getValue("facebook_pixel_id"), } });

  // --- 11. Instagram (preservado) ---
  const [instagramForm, setInstagramForm] = useState({
    username: "_nicoly.modas",
    url: "https://www.instagram.com/_nicoly.modas",
    active: true,
  });

  useEffect(() => {
    if (settings?.instagram) {
      setInstagramForm(settings.instagram as typeof instagramForm);
    }
  }, [settings]);

  if (isLoading) return <div className="p-10 text-sm text-muted-foreground">Carregando configurações...</div>;

  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="font-display text-3xl mb-1">Configurações do Site</h1>
        <p className="text-sm text-muted-foreground">Gerencie dados da loja, endereços, contas e configurações gerais</p>
      </div>

      {/* 1. Dados da Loja */}
      <SettingsSection title="Dados da Loja" description="Informações principais da sua loja.">
        <form onSubmit={storeForm.handleSubmit((data) => saveSetting("store_data", data))} className={sectionClass}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className={labelClass}>Nome da Loja</label>
              <input {...storeForm.register("store_name")} className={inputClass} placeholder="Ex: Nicoly Modas" />
              {storeForm.formState.errors.store_name && <p className="text-xs text-destructive mt-1">{storeForm.formState.errors.store_name.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Telefone</label>
              <input {...storeForm.register("store_phone")} className={inputClass} placeholder="" />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input {...storeForm.register("store_email")} className={inputClass} placeholder="contato@exemplo.com" type="email" />
            </div>
            <div>
              <label className={labelClass}>CNPJ</label>
              <input {...storeForm.register("store_cnpj")} className={inputClass} placeholder="00.000.000/0000-00" />
            </div>
            <div>
              <label className={labelClass}>URL do Logo</label>
              <input {...storeForm.register("store_logo_url")} className={inputClass} placeholder="https://..." type="url" />
            </div>
          </div>
          <div className="pt-2">
            <button disabled={!!saving} className="bg-primary text-primary-foreground px-5 py-2.5 text-xs tracking-editorial uppercase rounded-sm disabled:opacity-50">{saving === "store_data" ? "Salvando..." : "Salvar Dados da Loja"}</button>
          </div>
        </form>
      </SettingsSection>

      {/* 2. Endereço da Empresa */}
      <SettingsSection title="Endereço da Empresa">
        <form onSubmit={companyForm.handleSubmit((data) => saveSetting("company_address", data))} className={sectionClass}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>CEP</label>
              <input {...companyForm.register("company_cep")} className={inputClass} placeholder="00000-000" />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Rua</label>
              <input {...companyForm.register("company_street")} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Número</label>
              <input {...companyForm.register("company_number")} className={inputClass} />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Complemento</label>
              <input {...companyForm.register("company_complement")} className={inputClass} />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Bairro</label>
              <input {...companyForm.register("company_neighborhood")} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Cidade</label>
              <input {...companyForm.register("company_city")} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Estado (UF)</label>
              <input {...companyForm.register("company_state")} className={inputClass} maxLength={2} placeholder="SP" />
            </div>
          </div>
          <div className="pt-2">
            <button disabled={!!saving} className="bg-primary text-primary-foreground px-5 py-2.5 text-xs tracking-editorial uppercase rounded-sm disabled:opacity-50">{saving === "company_address" ? "Salvando..." : "Salvar Endereço"}</button>
          </div>
        </form>
      </SettingsSection>

      {/* 3. Endereço de Devolução */}
      <SettingsSection title="Endereço de Devolução">
        <form onSubmit={returnForm.handleSubmit((data) => saveSetting("return_address", data))} className={sectionClass}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>CEP</label>
              <input {...returnForm.register("return_cep")} className={inputClass} placeholder="00000-000" />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Rua</label>
              <input {...returnForm.register("return_street")} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Número</label>
              <input {...returnForm.register("return_number")} className={inputClass} />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Complemento</label>
              <input {...returnForm.register("return_complement")} className={inputClass} />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Bairro</label>
              <input {...returnForm.register("return_neighborhood")} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Cidade</label>
              <input {...returnForm.register("return_city")} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Estado (UF)</label>
              <input {...returnForm.register("return_state")} className={inputClass} maxLength={2} placeholder="SP" />
            </div>
          </div>
          <div className="pt-2">
            <button disabled={!!saving} className="bg-primary text-primary-foreground px-5 py-2.5 text-xs tracking-editorial uppercase rounded-sm disabled:opacity-50">{saving === "return_address" ? "Salvando..." : "Salvar Endereço de Devolução"}</button>
          </div>
        </form>
      </SettingsSection>

      {/* 4. Conta Administrativa */}
      <SettingsSection title="Conta Administrativa">
        <form onSubmit={accountForm.handleSubmit((data) => saveSetting("admin_account", data))} className={sectionClass}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Nome</label>
              <input {...accountForm.register("admin_name")} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Telefone</label>
              <input {...accountForm.register("admin_phone")} className={inputClass} />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Função</label>
              <input {...accountForm.register("admin_role")} className={inputClass} />
            </div>
          </div>
          <div className="pt-2">
            <button disabled={!!saving} className="bg-primary text-primary-foreground px-5 py-2.5 text-xs tracking-editorial uppercase rounded-sm disabled:opacity-50">{saving === "admin_account" ? "Salvando..." : "Salvar Conta"}</button>
          </div>
        </form>
      </SettingsSection>

      {/* 5. Alteração de Senha */}
      <SettingsSection title="Alteração de Senha">
        <form onSubmit={passwordForm.handleSubmit(async (data) => {
          const { error } = await supabase.auth.updateUser({ password: data.new_password });
          if (error) return toast.error(error.message);
          toast.success("Senha alterada com sucesso");
          passwordForm.reset();
        })} className={sectionClass}>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className={labelClass}>Senha Atual</label>
              <input type="password" {...passwordForm.register("current_password")} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Nova Senha</label>
              <input type="password" {...passwordForm.register("new_password")} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Confirme a Nova Senha</label>
              <input type="password" {...passwordForm.register("confirm_password")} className={inputClass} />
            </div>
          </div>
          <div className="pt-2">
            <button disabled={!!saving} className="bg-primary text-primary-foreground px-5 py-2.5 text-xs tracking-editorial uppercase rounded-sm disabled:opacity-50">Alterar Senha</button>
          </div>
        </form>
      </SettingsSection>

      {/* 6. Alteração de Email Login */}
      <SettingsSection title="Alteração de Email Login">
        <form onSubmit={emailForm.handleSubmit(async (data) => {
          const { error } = await supabase.auth.updateUser({ email: data.new_email });
          if (error) return toast.error(error.message);
          toast.success("Email de login alterado com sucesso. Verifique seu novo email.");
          emailForm.reset();
        })} className={sectionClass}>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className={labelClass}>Novo Email</label>
              <input type="email" {...emailForm.register("new_email")} className={inputClass} placeholder="novo@email.com" />
            </div>
            <div>
              <label className={labelClass}>Senha Atual</label>
              <input type="password" {...emailForm.register("current_password")} className={inputClass} />
            </div>
          </div>
          <div className="pt-2">
            <button disabled={!!saving} className="bg-primary text-primary-foreground px-5 py-2.5 text-xs tracking-editorial uppercase rounded-sm disabled:opacity-50">Alterar Email</button>
          </div>
        </form>
      </SettingsSection>

      {/* 7. Configurações de Email */}
      <SettingsSection title="Configurações de Email (SMTP)">
        <form onSubmit={emailSettingsForm.handleSubmit((data) => saveSetting("email_settings", data))} className={sectionClass}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Host SMTP</label>
              <input {...emailSettingsForm.register("smtp_host")} className={inputClass} placeholder="smtp.exemplo.com" />
            </div>
            <div>
              <label className={labelClass}>Porta</label>
              <input type="number" {...emailSettingsForm.register("smtp_port")} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Usuário</label>
              <input {...emailSettingsForm.register("smtp_user")} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Senha</label>
              <input type="password" {...emailSettingsForm.register("smtp_password")} className={inputClass} />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Email Remetente</label>
              <input {...emailSettingsForm.register("smtp_from")} className={inputClass} placeholder="noreply@exemplo.com" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" {...emailSettingsForm.register("smtp_secure")} id="smtp_secure" />
              <label htmlFor="smtp_secure" className="text-sm">Usar conexão segura (SSL/TLS)</label>
            </div>
          </div>
          <div className="pt-2">
            <button disabled={!!saving} className="bg-primary text-primary-foreground px-5 py-2.5 text-xs tracking-editorial uppercase rounded-sm disabled:opacity-50">{saving === "email_settings" ? "Salvando..." : "Salvar Configurações de Email"}</button>
          </div>
        </form>
      </SettingsSection>

      {/* 8. Configurações Gerais */}
      <SettingsSection title="Configurações Gerais">
        <form onSubmit={generalForm.handleSubmit((data) => saveSetting("general_settings", data))} className={sectionClass}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <input type="checkbox" {...generalForm.register("maintenance_mode")} id="maintenance_mode" />
              <label htmlFor="maintenance_mode" className="text-sm">Modo Manutenção</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" {...generalForm.register("allow_register")} id="allow_register" />
              <label htmlFor="allow_register" className="text-sm">Permitir Cadastro de novos usuários</label>
            </div>
            <div>
              <label className={labelClass}>Moeda</label>
              <input {...generalForm.register("currency")} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Fuso Horário</label>
              <input {...generalForm.register("timezone")} className={inputClass} />
            </div>
          </div>
          <div className="pt-2">
            <button disabled={!!saving} className="bg-primary text-primary-foreground px-5 py-2.5 text-xs tracking-editorial uppercase rounded-sm disabled:opacity-50">{saving === "general_settings" ? "Salvando..." : "Salvar Configurações Gerais"}</button>
          </div>
        </form>
      </SettingsSection>

      {/* 9. Frete */}
      <SettingsSection title="Frete">
        <form onSubmit={shippingForm.handleSubmit((data) => saveSetting("shipping_settings", data))} className={sectionClass}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Custo Padrão de Frete</label>
              <input type="number" step="0.01" {...shippingForm.register("default_shipping_cost")} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Frete Grátis acima de (R$)</label>
              <input type="number" step="0.01" {...shippingForm.register("free_shipping_threshold")} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Provedor de Frete</label>
              <input {...shippingForm.register("shipping_provider")} className={inputClass} />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className={labelClass}>Prazo Mínimo (dias)</label>
                <input type="number" {...shippingForm.register("delivery_time_min")} className={inputClass} />
              </div>
              <div className="flex-1">
                <label className={labelClass}>Prazo Máximo (dias)</label>
                <input type="number" {...shippingForm.register("delivery_time_max")} className={inputClass} />
              </div>
            </div>
          </div>
          <div className="pt-2">
            <button disabled={!!saving} className="bg-primary text-primary-foreground px-5 py-2.5 text-xs tracking-editorial uppercase rounded-sm disabled:opacity-50">{saving === "shipping_settings" ? "Salvando..." : "Salvar Configurações de Frete"}</button>
          </div>
        </form>
      </SettingsSection>

      {/* 10. SEO e Marketing */}
      <SettingsSection title="SEO e Marketing">
        <form onSubmit={seoForm.handleSubmit((data) => saveSetting("seo_settings", data))} className={sectionClass}>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className={labelClass}>Título do Site</label>
              <input {...seoForm.register("site_title")} className={inputClass} placeholder="Título para motores de busca" />
            </div>
            <div>
              <label className={labelClass}>Descrição do Site</label>
              <textarea {...seoForm.register("site_description")} className={inputClass} rows={3} placeholder="Máximo 160 caracteres..." />
            </div>
            <div>
              <label className={labelClass}>Palavras-chave</label>
              <input {...seoForm.register("site_keywords")} className={inputClass} placeholder="moda, vestidos, roupas femininas" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Google Analytics ID</label>
                <input {...seoForm.register("google_analytics_id")} className={inputClass} placeholder="G-XXXXXXXXXX" />
              </div>
              <div>
                <label className={labelClass}>Facebook Pixel ID</label>
                <input {...seoForm.register("facebook_pixel_id")} className={inputClass} placeholder="XXXXXXXXXXXXXXXXXXX" />
              </div>
            </div>
          </div>
          <div className="pt-2">
            <button disabled={!!saving} className="bg-primary text-primary-foreground px-5 py-2.5 text-xs tracking-editorial uppercase rounded-sm disabled:opacity-50">{saving === "seo_settings" ? "Salvando..." : "Salvar SEO e Marketing"}</button>
          </div>
        </form>
      </SettingsSection>

      {/* 11. Instagram — funcionalidade preservada */}
      <SettingsSection title="Instagram" description="Configurações do Instagram oficial da loja.">
        <form onSubmit={(e) => { e.preventDefault(); saveSetting("instagram", instagramForm); }} className={sectionClass}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className={labelClass}>Username (sem @)</label>
              <input value={instagramForm.username} onChange={(e) => setInstagramForm({ ...instagramForm, username: e.target.value })} className={inputClass} placeholder="_nicoly.modas" />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>URL completa</label>
              <input value={instagramForm.url} onChange={(e) => setInstagramForm({ ...instagramForm, url: e.target.value })} className={inputClass} type="url" placeholder="https://www.instagram.com/_nicoly.modas" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={instagramForm.active} onChange={(e) => setInstagramForm({ ...instagramForm, active: e.target.checked })} id="instagram_active" />
              <label htmlFor="instagram_active" className="text-sm">Exibir no site</label>
            </div>
          </div>
          <div className="pt-2">
            <button disabled={!!saving} className="bg-primary text-primary-foreground px-5 py-2.5 text-xs tracking-editorial uppercase rounded-sm disabled:opacity-50">{saving === "instagram" ? "Salvando..." : "Salvar Instagram"}</button>
          </div>
        </form>
      </SettingsSection>

    </div>
  );
}
