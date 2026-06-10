/**
 * Tipos relacionados à integração de pagamentos via Mercado Pago
 */

export type PaymentMethod = "pix" | "credit_card" | "debit_card" | "mercado_pago_balance";

export type PaymentStatus =
  | "pending"
  | "approved"
  | "authorized"
  | "in_process"
  | "in_mediation"
  | "rejected"
  | "cancelled"
  | "refunded"
  | "charged_back";

export type OrderPaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface PaymentPreferenceItem {
  id: string;
  title: string;
  description?: string;
  picture_url?: string;
  category_id?: string;
  quantity: number;
  unit_price: number;
}

export interface PaymentPreferencePayer {
  name?: string;
  surname?: string;
  email: string;
  phone?: {
    area_code?: string;
    number?: string;
  };
  identification?: {
    type: string;
    number: string;
  };
  address?: {
    zip_code?: string;
    street_name?: string;
    street_number?: string;
  };
}

export interface PaymentPreferenceRequest {
  items: PaymentPreferenceItem[];
  payer?: PaymentPreferencePayer;
  external_reference?: string;
  notification_url?: string;
  back_urls?: {
    success?: string;
    failure?: string;
    pending?: string;
  };
  auto_return?: "approved" | "all";
  payment_methods?: {
    excluded_payment_types?: { id: string }[];
    excluded_payment_methods?: { id: string }[];
    installments?: number;
    default_installments?: number;
  };
}

export interface PaymentPreferenceResponse {
  id: string;
  init_point: string;
  sandbox_init_point: string;
  external_reference: string | null;
  items: PaymentPreferenceItem[];
  payer: PaymentPreferencePayer;
  status: string;
}

export interface PixPaymentInfo {
  qr_code: string;
  qr_code_base64: string;
  ticket_url?: string;
  date_of_expiration?: string;
  transaction_data?: {
    qr_code: string;
    qr_code_base64: string;
    ticket_url: string;
    date_of_expiration: string;
  };
}

export interface CardPaymentInfo {
  id: number;
  status: PaymentStatus;
  status_detail: string;
  payment_method_id: string;
  payment_type_id: string;
  transaction_amount: number;
  installments: number;
  issuer_id?: string;
  processing_mode?: string;
  authorization_code?: string;
  date_created?: string;
  date_approved?: string;
  date_last_updated?: string;
}

export interface WebhookPayload {
  id: number;
  live_mode: boolean;
  type: string;
  date_created: string;
  user_id: number;
  api_version: string;
  action: string;
  data: {
    id: string;
  };
}

export interface WebhookPaymentData {
  id: number;
  status: PaymentStatus;
  status_detail: string;
  external_reference: string;
  transaction_amount: number;
  payment_method_id: string;
  payment_type_id: string;
  date_created: string;
  date_approved: string | null;
  date_last_updated: string;
  money_release_date: string | null;
  order?: {
    id: string;
    type: string;
  };
  payer: {
    id: string;
    email: string;
    identification: {
      type: string;
      number: string;
    };
  };
  additional_info?: Record<string, string>;
  transaction_details?: {
    total_paid_amount: number;
    net_received_amount: number;
    installment_amount?: number;
  };
}

export interface CreatePaymentPreferenceInput {
  orderId: string;
  items: Array<{
    id: string;
    title: string;
    unit_price: number;
    quantity: number;
    picture_url?: string;
  }>;
  payer: {
    name: string;
    email: string;
    phone?: string;
  };
  externalReference: string;
}

export interface PaymentStatusUpdate {
  orderId: string;
  paymentStatus: OrderPaymentStatus;
  orderStatus?: string;
  transactionId?: string | null;
  paymentGateway?: string | null;
  paidAt?: string | null;
  pixCode?: string | null;
  pixQrCode?: string | null;
  webhookPayload?: Record<string, string> | null;
}

export interface BrickCustomization {
  visual?: {
    hideFormTitle?: boolean;
    hidePaymentButton?: boolean;
    style?: {
      theme?: "default" | "dark" | "bootstrap" | "flat";
      customVariables?: Record<string, string>;
    };
  };
  paymentMethods?: {
    maxInstallments?: number;
    minInstallments?: number;
    excludedPaymentMethods?: string[];
    excludedPaymentTypes?: string[];
  };
}

export interface MercadoPagoConfig {
  publicKey: string;
  accessToken: string;
  webhookSecret: string;
  sandbox: boolean;
}