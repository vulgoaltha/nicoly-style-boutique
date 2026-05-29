
-- hero_banners
CREATE TABLE public.hero_banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  image_url TEXT NOT NULL,
  button_text TEXT,
  button_link TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  order_position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.hero_banners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Active banners public read" ON public.hero_banners
  FOR SELECT TO anon, authenticated
  USING (active = true OR has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins write banners" ON public.hero_banners
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_hero_banners_updated BEFORE UPDATE ON public.hero_banners
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- homepage_categories
CREATE TABLE public.homepage_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Shirt',
  color TEXT NOT NULL DEFAULT '#f4d6d6',
  slug TEXT NOT NULL,
  order_position INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.homepage_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Active hp categories public read" ON public.homepage_categories
  FOR SELECT TO anon, authenticated
  USING (active = true OR has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins write hp categories" ON public.homepage_categories
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_hp_categories_updated BEFORE UPDATE ON public.homepage_categories
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- homepage_collections
CREATE TABLE public.homepage_collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  image_url TEXT NOT NULL,
  redirect_url TEXT,
  order_position INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.homepage_collections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Active collections public read" ON public.homepage_collections
  FOR SELECT TO anon, authenticated
  USING (active = true OR has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins write collections" ON public.homepage_collections
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_collections_updated BEFORE UPDATE ON public.homepage_collections
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- site_settings
CREATE TABLE public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Settings public read" ON public.site_settings
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins write settings" ON public.site_settings
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_site_settings_updated BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Seed Instagram setting
INSERT INTO public.site_settings (key, value) VALUES
  ('instagram', '{"username":"_nicoly.modas","url":"https://www.instagram.com/_nicoly.modas","active":true}'::jsonb)
ON CONFLICT (key) DO NOTHING;
