import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type InstagramSetting = {
  username: string;
  url: string;
  active: boolean;
};

export function useInstagram() {
  return useQuery({
    queryKey: ["site-setting", "instagram"],
    queryFn: async (): Promise<InstagramSetting | null> => {
      const { data } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "instagram")
        .maybeSingle();
      return (data?.value as InstagramSetting) ?? null;
    },
  });
}
