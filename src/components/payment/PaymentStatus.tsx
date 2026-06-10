import { CheckCircle, XCircle, Clock, AlertCircle, CreditCard, QrCode, Wallet } from "lucide-react";

export type PaymentStatusType = "pending" | "paid" | "failed" | "refunded" | "unknown";
export type PaymentMethodType =
  | "pix"
  | "credit_card"
  | "debit_card"
  | "mercado_pago_balance"
  | "unknown";

interface PaymentStatusProps {
  status: PaymentStatusType;
  method?: PaymentMethodType;
  transactionId?: string | null;
  paidAt?: string | null;
  className?: string;
}

const STATUS_CONFIG: Record<
  PaymentStatusType,
  { label: string; color: string; icon: React.ReactNode }
> = {
  pending: {
    label: "Aguardando pagamento",
    color: "text-amber-600 bg-amber-50 border-amber-200",
    icon: <Clock className="h-4 w-4" />,
  },
  paid: {
    label: "Pagamento confirmado",
    color: "text-emerald-600 bg-emerald-50 border-emerald-200",
    icon: <CheckCircle className="h-4 w-4" />,
  },
  failed: {
    label: "Pagamento recusado",
    color: "text-red-600 bg-red-50 border-red-200",
    icon: <XCircle className="h-4 w-4" />,
  },
  refunded: {
    label: "Pagamento reembolsado",
    color: "text-slate-600 bg-slate-50 border-slate-200",
    icon: <AlertCircle className="h-4 w-4" />,
  },
  unknown: {
    label: "Status desconhecido",
    color: "text-gray-600 bg-gray-50 border-gray-200",
    icon: <AlertCircle className="h-4 w-4" />,
  },
};

const METHOD_CONFIG: Record<PaymentMethodType, { label: string; icon: React.ReactNode }> = {
  pix: { label: "PIX", icon: <QrCode className="h-3.5 w-3.5" /> },
  credit_card: { label: "Cartao de Credito", icon: <CreditCard className="h-3.5 w-3.5" /> },
  debit_card: { label: "Cartao de Debito", icon: <CreditCard className="h-3.5 w-3.5" /> },
  mercado_pago_balance: { label: "Saldo Mercado Pago", icon: <Wallet className="h-3.5 w-3.5" /> },
  unknown: { label: "Metodo desconhecido", icon: <CreditCard className="h-3.5 w-3.5" /> },
};

export function PaymentStatus({
  status,
  method,
  transactionId,
  paidAt,
  className = "",
}: PaymentStatusProps) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.unknown;
  const methodConfig = method ? (METHOD_CONFIG[method] ?? METHOD_CONFIG.unknown) : null;

  return (
    <div className={`space-y-2 ${className}`}>
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-sm text-sm border ${config.color}`}
      >
        {config.icon}
        <span className="font-medium">{config.label}</span>
      </div>

      {methodConfig && (
        <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          {methodConfig.icon}
          <span>{methodConfig.label}</span>
        </div>
      )}

      <div className="text-xs text-muted-foreground space-y-0.5">
        {transactionId && (
          <div>
            Transacao: <span className="font-mono">{transactionId}</span>
          </div>
        )}
        {paidAt && <div>Pago em: {new Date(paidAt).toLocaleString("pt-BR")}</div>}
      </div>
    </div>
  );
}
