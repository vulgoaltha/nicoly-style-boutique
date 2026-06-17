import { useState, useEffect } from "react";
import { Copy, Check, Clock } from "lucide-react";
import { toast } from "sonner";

interface PixDisplayProps {
  qrCodeBase64: string | null;
  pixCode: string | null;
  expirationDate?: string;
  onExpire?: () => void;
}

export function PixDisplay({ qrCodeBase64, pixCode, expirationDate, onExpire }: PixDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!expirationDate) return;

    const end = new Date(expirationDate).getTime();

    const updateTimer = () => {
      const now = Date.now();
      const diff = end - now;
      if (diff <= 0) {
        setTimeLeft(0);
        onExpire?.();
        return;
      }
      setTimeLeft(diff);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [expirationDate, onExpire]);

  const handleCopy = async () => {
    if (!pixCode) return;
    try {
      await navigator.clipboard.writeText(pixCode);
      setCopied(true);
      toast.success("Codigo PIX copiado!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Erro ao copiar codigo PIX.");
    }
  };

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="space-y-4 p-4 border border-border rounded-sm bg-secondary/20">
      <h3 className="font-display text-lg text-center">Pagamento via PIX</h3>

      {qrCodeBase64 && (
        <div className="flex justify-center">
          <img
            src={`data:image/png;base64,${qrCodeBase64}`}
            alt="QR Code PIX"
            className="w-48 h-48 object-contain"
          />
        </div>
      )}

      {pixCode && (
        <div className="space-y-2">
          <label className="block text-xs tracking-editorial uppercase text-muted-foreground">
            Codigo PIX (copia e cola)
          </label>
          <div className="flex gap-2">
            <input
              readOnly
              value={pixCode}
              className="flex-1 border border-border bg-background rounded-sm px-3 py-2 text-sm font-mono text-xs break-all"
            />
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-primary text-primary-foreground rounded-sm text-xs font-medium hover:bg-primary/90"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copiado" : "Copiar"}
            </button>
          </div>
        </div>
      )}

      {timeLeft !== null && (
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>
            {timeLeft > 0 ? `Expira em: ${formatTime(timeLeft)}` : "Codigo PIX expirado."}
          </span>
        </div>
      )}

      <p className="text-xs text-muted-foreground text-center">
        Abra o app do seu banco, escaneie o QR Code ou cole o codigo acima para pagar.
      </p>
    </div>
  );
}
