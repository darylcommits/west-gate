-- ==========================================
-- STORAGE BUCKET FOR TESTIMONIAL AVATARS
-- ==========================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'testimonials',
  'testimonials',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg','image/png','image/webp','image/avif','image/gif']
) ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "testimonials_public_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'testimonials');

CREATE POLICY "testimonials_admin_insert"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'testimonials'
    AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "testimonials_admin_update"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'testimonials'
    AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "testimonials_admin_delete"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'testimonials'
    AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );
