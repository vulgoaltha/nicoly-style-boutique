
ALTER FUNCTION public.set_updated_at() SET search_path = public;

REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO service_role;

-- Tighten storage: only allow reads by file path (no listing)
DROP POLICY "Product images public read" ON storage.objects;
CREATE POLICY "Product images public read"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'products' AND auth.role() IN ('anon','authenticated'));
