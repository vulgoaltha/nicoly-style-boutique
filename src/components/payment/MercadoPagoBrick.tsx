import { useEffect, useRef } from "react";
import { initMercadoPago, Payment } from "@mercadopago/sdk-react";

interface MercadoPagoBrickProps {
  preferenceId: string;
  onPaymentComplete?: (result: unknown) => void;
  onPaymentError?: (error: unknown) => void;
}

export function MercadoPagoBrick({
  preferenceId,
  onPaymentComplete,
  onPaymentError,
}: MercadoPagoBrickProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const publicKey = import.meta.env.VITE_MP_PUBLIC_KEY;

    if (!publicKey) {
      console.error("VITE_MP_PUBLIC_KEY nao configurado.");
      return;
    }

    initMercadoPago(publicKey, { locale: "pt-BR" });
  }, []);

  const customization = {
    visual: {
      style: {
        theme: "default" as const,
      },
    },
    paymentMethods: {
      maxInstallments: 12,
      minInstallments: 1,
    },
  };

  const onSubmit = async (formData: unknown) => {
    try {
      // O SDK do Mercado Pago ja processa o pagamento internamente.
      // Aqui apenas propagamos o resultado para o componente pai.
      if (onPaymentComplete) {
        onPaymentComplete(formData);
      }
    } catch (error) {
      if (onPaymentError) {
        onPaymentError(error);
      }
    }
  };

  return (
    <div ref={containerRef} className="w-full">
      <Payment
        initialization={{ amount: 1, preferenceId } as any}
        customization={customization as any}
        onSubmit={onSubmit}
      />
    </div>
  );
}
