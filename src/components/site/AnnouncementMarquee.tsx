import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type AnnouncementSetting = {
  text: string;
  bg_color: string;
  text_color: string;
  active: boolean;
  speed: number;
};

const DEFAULT: AnnouncementSetting = {
  text: "5% de desconto na primeira compra!",
  bg_color: "#f4d6d6",
  text_color: "#3a1f1f",
  active: true,
  speed: 30,
};

export function AnnouncementMarquee() {
  const { data } = useQuery({
    queryKey: ["site-setting", "announcement_bar"],
    queryFn: async (): Promise<AnnouncementSetting> => {
      const { data } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "announcement_bar")
        .maybeSingle();
      return { ...DEFAULT, ...((data?.value as Partial<AnnouncementSetting>) ?? {}) };
    },
  });

  const s = data ?? DEFAULT;
  if (!s.active || !s.text) return null;

  const items = Array.from({ length: 12 });

  return (
    <div
      className="overflow-hidden border-y border-black/5"
      style={{ backgroundColor: s.bg_color, color: s.text_color }}
      aria-label="Anúncio"
    >
      <div
        className="flex whitespace-nowrap py-2.5"
        style={{
          animation: `marquee ${s.speed}s linear infinite`,
          width: "max-content",
        }}
      >
        {items.map((_, i) => (
          <span
            key={i}
            className="px-8 text-xs tracking-editorial uppercase font-medium inline-flex items-center"
          >
            {s.text}
            <span className="mx-4 opacity-50">✦</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
