import { useState } from "react";
import { Upload, X, Loader2, Info } from "lucide-react";
import { toast } from "sonner";
import { uploadImage } from "@/lib/upload";

export function ImageUploader({
  value,
  onChange,
  folder = "site",
}: {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
}) {
  const [loading, setLoading] = useState(false);

  const getRecommendations = () => {
    switch (folder) {
      case "banners": return "Recomendado: 1920x800 (Desktop) ou 800x1200 (Mobile). Máx 5MB.";
      case "products": return "Recomendado: 800x1000 (Formato retrato 4:5). Máx 5MB.";
      case "categories": return "Recomendado: 600x800. Máx 5MB.";
      case "collections": return "Recomendado: 1200x600 (Formato paisagem). Máx 5MB.";
      default: return "Formatos aceitos: JPG, PNG, WEBP. Tamanho máx: 5MB.";
    }
  };

  const handle = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error("O arquivo é muito grande. O limite máximo é 5MB.");
      return;
    }
    
    if (!file.type.startsWith("image/")) {
      toast.error("Por favor, selecione apenas arquivos de imagem.");
      return;
    }

    setLoading(true);
    try {
      const url = await uploadImage(file, folder);
      onChange(url);
      toast.success("Imagem enviada com sucesso! (Convertida para WebP e otimizada)");
    } catch (e: any) {
      toast.error(e.message ?? "Ocorreu um erro ao enviar a imagem.");
    } finally {
      setLoading(false);
    }
  };

  if (value) {
    return (
      <div className="space-y-2">
        <div className="relative aspect-video w-full max-w-md bg-secondary rounded-sm overflow-hidden border border-border">
          <img src={value} alt="Upload preview" className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 bg-background/90 rounded-full p-1.5 hover:bg-destructive hover:text-white transition-colors shadow-sm"
            title="Remover imagem"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2 max-w-md w-full">
      <label className="flex flex-col items-center justify-center gap-2 aspect-video w-full border-2 border-dashed border-border rounded-sm cursor-pointer hover:bg-secondary/50 transition-colors text-sm text-muted-foreground bg-secondary/20">
        {loading ? (
          <>
            <Loader2 className="h-6 w-6 animate-spin text-primary" /> 
            <span className="font-medium">Otimizando e enviando...</span>
          </>
        ) : (
          <>
            <Upload className="h-6 w-6 text-muted-foreground" /> 
            <span className="font-medium">Clique para selecionar imagem</span>
            <span className="text-xs text-muted-foreground/70">JPG, PNG ou WEBP</span>
          </>
        )}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              handle(e.target.files[0]);
              e.target.value = ''; // Reset input
            }
          }}
          disabled={loading}
        />
      </label>
      <div className="flex items-start gap-1.5 text-xs text-muted-foreground bg-secondary/30 p-2 rounded">
        <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />
        <p>{getRecommendations()}</p>
      </div>
    </div>
  );
}
