import { useState } from "react";
import { Upload, X, Loader2, Info } from "lucide-react";
import { toast } from "sonner";
import { uploadImage } from "@/lib/upload";

export function ImageUploader({
  value,
  onChange,
  folder = "site",
  compact = false,
}: {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  compact?: boolean;
}) {
  const [loading, setLoading] = useState(false);

  const getRecommendations = () => {
    switch (folder) {
      case "category_icons":
        return "Recomendado: Imagem PNG ou JPG de 100x100px. Máx 10MB.";
      case "banners":
        return "Recomendado: 1920x800 (Desktop) ou 800x1200 (Mobile). Máx 10MB.";
      case "products":
        return "Recomendado: 800x1000 (Formato retrato 4:5). Máx 10MB.";
      case "categories":
        return "Recomendado: Ícone PNG ou JPG de 100x100px. Máx 10MB.";
      case "collections":
        return "Recomendado: 1200x600 (Formato paisagem). Máx 10MB.";
      default:
        return "Formatos aceitos: JPG, PNG, WEBP. Tamanho máx: 10MB.";
    }
  };

  const handle = async (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      toast.error("O arquivo é muito grande. O limite máximo é 10MB.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Por favor, selecione apenas arquivos de imagem (PNG ou JPG).");
      return;
    }

    setLoading(true);
    try {
      const url = await uploadImage(file, folder);
      onChange(url);
      toast.success("Ícone/Imagem enviado com sucesso!");
    } catch (e: unknown) {
      const err = e as { message?: string };
      toast.error(err.message ?? "Ocorreu um erro ao enviar a imagem.");
    } finally {
      setLoading(false);
    }
  };

  if (value) {
    return (
      <div className="space-y-2">
        <div
          className={`relative bg-secondary rounded-sm overflow-hidden border border-border flex items-center justify-center ${
            compact || folder === "category_icons"
              ? "w-24 h-24 aspect-square"
              : "aspect-video w-full max-w-md"
          }`}
        >
          <img src={value} alt="Preview do ícone" className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-1 right-1 bg-background/90 rounded-full p-1 hover:bg-destructive hover:text-white transition-colors shadow-sm"
            title="Remover imagem"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    );
  }

  const isSquare = compact || folder === "category_icons";

  return (
    <div className={`space-y-2 ${isSquare ? "w-auto" : "max-w-md w-full"}`}>
      <label
        className={`flex flex-col items-center justify-center gap-1.5 border-2 border-dashed border-border rounded-sm cursor-pointer hover:bg-secondary/50 transition-colors text-xs text-muted-foreground bg-secondary/20 p-2 ${
          isSquare ? "w-28 h-28 aspect-square" : "aspect-video w-full"
        }`}
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <span className="text-[11px] text-center font-medium">Enviando...</span>
          </>
        ) : (
          <>
            <Upload className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium text-[11px] text-center">Enviar ícone</span>
            <span className="text-[10px] text-muted-foreground/70">PNG ou JPG (100x100)</span>
          </>
        )}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              handle(e.target.files[0]);
              e.target.value = "";
            }
          }}
          disabled={loading}
        />
      </label>
      <div className="flex items-start gap-1.5 text-[11px] text-muted-foreground bg-secondary/30 p-1.5 rounded max-w-xs">
        <Info className="h-3 w-3 mt-0.5 shrink-0" />
        <p>{getRecommendations()}</p>
      </div>
    </div>
  );
}
