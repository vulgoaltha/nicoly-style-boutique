import { z } from "zod";

// --- 1. Dados da Loja ---
export const storeDataSchema = z.object({
  store_name: z.string().min(2, "Nome da loja é obrigatório"),
  store_phone: z.string().optional().or(z.literal("")),
  store_email: z.string().email("Email inválido").optional().or(z.literal("")),
  store_cnpj: z.string().optional().or(z.literal("")),
  store_logo_url: z.string().url("URL inválida").optional().or(z.literal("")),
  store_favicon_url: z.string().url("URL inválida").optional().or(z.literal("")),
});

// --- 2. Endereço da Empresa ---
export const companyAddressSchema = z.object({
  company_cep: z.string().min(8, "CEP inválido"),
  company_street: z.string().min(2, "Rua é obrigatória"),
  company_number: z.string().min(1, "Número é obrigatório"),
  company_complement: z.string().optional().or(z.literal("")),
  company_neighborhood: z.string().min(2, "Bairro é obrigatório"),
  company_city: z.string().min(2, "Cidade é obrigatória"),
  company_state: z.string().length(2, "UF inválida"),
});

// --- 3. Endereço de Devolução ---
export const returnAddressSchema = z.object({
  return_cep: z.string().min(8, "CEP inválido"),
  return_street: z.string().min(2, "Rua é obrigatória"),
  return_number: z.string().min(1, "Número é obrigatório"),
  return_complement: z.string().optional().or(z.literal("")),
  return_neighborhood: z.string().min(2, "Bairro é obrigatório"),
  return_city: z.string().min(2, "Cidade é obrigatória"),
  return_state: z.string().length(2, "UF inválida"),
});

// --- 4. Conta Administrativa ---
export const adminAccountSchema = z.object({
  admin_name: z.string().min(2, "Nome é obrigatório"),
  admin_phone: z.string().optional().or(z.literal("")),
  admin_role: z.string().optional().or(z.literal("")),
});

// --- 5. Alteração de Senha ---
export const changePasswordSchema = z.object({
  current_password: z.string().min(6, "Senha atual é obrigatória"),
  new_password: z.string().min(6, "Nova senha deve ter no mínimo 6 caracteres"),
  confirm_password: z.string().min(6, "Confirmação de senha é obrigatória"),
}).refine((data) => data.new_password === data.confirm_password, {
  message: "As senhas não coincidem",
  path: ["confirm_password"],
});

// --- 6. Alteração de Email ---
export const changeEmailSchema = z.object({
  new_email: z.string().email("Email inválido"),
  current_password: z.string().min(6, "Senha atual é obrigatória"),
});

// --- 7. Configurações de Email ---
export const emailSettingsSchema = z.object({
  smtp_host: z.string().min(1, "Host SMTP é obrigatório"),
  smtp_port: z.coerce.number().min(1, "Porta inválida"),
  smtp_user: z.string().min(1, "Usuário SMTP é obrigatório"),
  smtp_password: z.string().min(1, "Senha SMTP é obrigatória"),
  smtp_from: z.string().email("Email remetente inválido"),
  smtp_secure: z.boolean().default(true),
});

// --- 8. Configurações Gerais ---
export const generalSettingsSchema = z.object({
  maintenance_mode: z.boolean().default(false),
  allow_register: z.boolean().default(true),
  currency: z.string().default("BRL"),
  timezone: z.string().default("America/Sao_Paulo"),
  date_format: z.string().default("DD/MM/YYYY"),
});

// --- 9. Frete ---
export const shippingSettingsSchema = z.object({
  default_shipping_cost: z.coerce.number().min(0, "Custo não pode ser negativo"),
  free_shipping_threshold: z.coerce.number().min(0).optional(),
  shipping_provider: z.string().default("manual"),
  delivery_time_min: z.coerce.number().min(1).optional(),
  delivery_time_max: z.coerce.number().min(1).optional(),
});

// --- 10. SEO e Marketing ---
export const seoSettingsSchema = z.object({
  site_title: z.string().min(1, "Título do site é obrigatório"),
  site_description: z.string().max(160, "Máximo 160 caracteres").optional().or(z.literal("")),
  site_keywords: z.string().optional().or(z.literal("")),
  google_analytics_id: z.string().optional().or(z.literal("")),
  facebook_pixel_id: z.string().optional().or(z.literal("")),
});

// --- 11. Redes Sociais ---
export const socialMediaSchema = z.object({
  instagram_username: z.string().optional().or(z.literal("")),
  instagram_url: z.string().url("URL inválida").optional().or(z.literal("")),
  instagram_active: z.boolean().default(true),
  facebook_url: z.string().url("URL inválida").optional().or(z.literal("")),
  facebook_active: z.boolean().default(false),
  twitter_url: z.string().url("URL inválida").optional().or(z.literal("")),
  twitter_active: z.boolean().default(false),
  tiktok_url: z.string().url("URL inválida").optional().or(z.literal("")),
  tiktok_active: z.boolean().default(false),
  youtube_url: z.string().url("URL inválida").optional().or(z.literal("")),
  youtube_active: z.boolean().default(false),
  whatsapp_number: z.string().optional().or(z.literal("")),
  whatsapp_active: z.boolean().default(false),
  pinterest_url: z.string().url("URL inválida").optional().or(z.literal("")),
  pinterest_active: z.boolean().default(false),
});

// --- 12. Integrações ---
export const integrationsSchema = z.object({
  // Mercado Pago
  mp_public_key: z.string().optional().or(z.literal("")),
  mp_access_token: z.string().optional().or(z.literal("")),
  mp_active: z.boolean().default(false),
  // InfinityPay
  infinitypay_key: z.string().optional().or(z.literal("")),
  infinitypay_secret: z.string().optional().or(z.literal("")),
  infinitypay_active: z.boolean().default(false),
  // Google Analytics
  ga_measurement_id: z.string().optional().or(z.literal("")),
  ga_active: z.boolean().default(false),
  // Meta Pixel
  meta_pixel_id: z.string().optional().or(z.literal("")),
  meta_pixel_active: z.boolean().default(false),
});
