import { supabase } from "@/integrations/supabase/client";
import imageCompression from "browser-image-compression";

export async function uploadImage(file: File, folder = "site"): Promise<string> {
  const options = {
    maxSizeMB: 2,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: "image/webp",
  };
  
  let processedFile = file;
  try {
    processedFile = await imageCompression(file, options);
  } catch (error) {
    console.warn("A compressão de imagem falhou, fazendo upload do arquivo original", error);
  }

  // Se o fileType virou webp, a extensão também deve ser
  const ext = processedFile.type === "image/webp" ? "webp" : (file.name.split(".").pop() ?? "jpg");
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  
  const { error } = await supabase.storage.from("products").upload(path, processedFile, {
    cacheControl: "3600",
    upsert: false,
    contentType: processedFile.type,
  });
  
  if (error) throw error;
  const { data } = supabase.storage.from("products").getPublicUrl(path);
  return data.publicUrl;
}

export async function deleteImageFromUrl(url: string | null | undefined) {
  if (!url) return;
  try {
    // A URL pública tem o formato: https://zycwvatimjfbsfnjjvns.supabase.co/storage/v1/object/public/products/pasta/arquivo.webp
    // Precisamos extrair apenas "pasta/arquivo.webp"
    const urlParts = url.split("/products/");
    if (urlParts.length !== 2) return;
    
    const path = urlParts[1];
    if (path) {
      await supabase.storage.from("products").remove([path]);
    }
  } catch (error) {
    console.error("Erro ao deletar imagem do storage:", error);
  }
}
