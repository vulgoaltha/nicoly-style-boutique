import { useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
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

  const handle = async (file: File) => {
    setLoading(true);
    try {
      const url = await uploadImage(file, folder);
      onChange(url);
      toast.success("Imagem enviada");
    } catch (e: any) {
      toast.error(e.message ?? "Erro no upload");
    } finally {
      setLoading(false);
    }
  };

  if (value) {
    return (
      <div className="relative aspect-video w-full max-w-md bg-secondary rounded-sm overflow-hidden">
        <img src={value} alt="" className="h-full w-full object-cover" />
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute top-2 right-2 bg-background/90 rounded-full p-1.5"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    );
  }

  return (
    <label className="flex items-center justify-center gap-2 aspect-video max-w-md w-full border-2 border-dashed border-border rounded-sm cursor-pointer hover:bg-secondary text-sm text-muted-foreground">
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" /> Enviando...
        </>
      ) : (
        <>
          <Upload className="h-4 w-4" /> Enviar imagem
        </>
      )}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && handle(e.target.files[0])}
      />
    </label>
  );
}
