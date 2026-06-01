import { supabase } from "@/integrations/supabase/client";

export async function uploadImage(file: File, folder = "site"): Promise<string> {
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("products").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from("products").getPublicUrl(path);
  return data.publicUrl;
}
