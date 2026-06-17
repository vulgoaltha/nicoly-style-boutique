import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { storeDataSchema, seoSettingsSchema } from "@/schemas/settingsSchema";
import { z } from "zod";

export type StoreData = z.infer<typeof storeDataSchema>;
export type SeoSettings = z.infer<typeof seoSettingsSchema>;

export type SiteSettings = {
  store_data: StoreData | null;
  seo_settings: SeoSettings | null;
  instagram: {
    username: string;
    url: string;
    active: boolean;
  } | null;
};

export function useStoreSettings() {
  return useQuery({
    queryKey: ["site-settings", "all"],
    queryFn: async (): Promise<SiteSettings> => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value")
        .in("key", ["store_data", "seo_settings", "instagram"]);

      if (error) {
        console.error("Error fetching site settings:", error);
        return {
          store_data: null,
          seo_settings: null,
          instagram: null,
        };
      }

      const settings: SiteSettings = {
        store_data: null,
        seo_settings: null,
        instagram: null,
      };

      data?.forEach((item) => {
        if (item.key === "store_data") settings.store_data = item.value as StoreData;
        if (item.key === "seo_settings") settings.seo_settings = item.value as SeoSettings;
        if (item.key === "instagram") settings.instagram = item.value as SiteSettings["instagram"];
      });

      return settings;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}
