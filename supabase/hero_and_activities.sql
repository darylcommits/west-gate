-- ==========================================
-- HERO SLIDES TABLE
-- ==========================================
CREATE TABLE public.hero_slides (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  image_url TEXT NOT NULL,
  image_path TEXT,
  button_text TEXT DEFAULT 'View Properties',
  button_link TEXT DEFAULT '/properties',
  secondary_button_text TEXT DEFAULT 'Contact Us',
  secondary_button_link TEXT DEFAULT '/contact',
  is_published BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "hero_slides_public_read" ON public.hero_slides FOR SELECT USING (is_published = true);
CREATE POLICY "hero_slides_admin_all" ON public.hero_slides FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE TRIGGER hero_slides_updated_at BEFORE UPDATE ON public.hero_slides FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ==========================================
-- DAILY ACTIVITIES TABLE
-- ==========================================
CREATE TABLE public.daily_activities (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  activity_date DATE NOT NULL DEFAULT CURRENT_DATE,
  media_url TEXT,
  media_type TEXT DEFAULT 'image' CHECK (media_type IN ('image', 'video')),
  tags JSONB DEFAULT '[]',
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.daily_activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "daily_activities_public_read" ON public.daily_activities FOR SELECT USING (is_published = true);
CREATE POLICY "daily_activities_admin_all" ON public.daily_activities FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE TRIGGER daily_activities_updated_at BEFORE UPDATE ON public.daily_activities FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ==========================================
-- STORAGE BUCKETS
-- ==========================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('hero-slides', 'hero-slides', true, 20971520,
  ARRAY['image/jpeg','image/png','image/webp','image/avif'])
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('daily-activities', 'daily-activities', true, 104857600,
  ARRAY['image/jpeg','image/png','image/webp','image/avif','video/mp4','video/webm','video/quicktime'])
ON CONFLICT (id) DO NOTHING;

-- Storage policies - hero-slides
CREATE POLICY "hero_slides_storage_read" ON storage.objects FOR SELECT USING (bucket_id = 'hero-slides');
CREATE POLICY "hero_slides_storage_admin" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'hero-slides' AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "hero_slides_storage_delete" ON storage.objects FOR DELETE USING (bucket_id = 'hero-slides' AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Storage policies - daily-activities
CREATE POLICY "daily_activities_storage_read" ON storage.objects FOR SELECT USING (bucket_id = 'daily-activities');
CREATE POLICY "daily_activities_storage_admin" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'daily-activities' AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "daily_activities_storage_delete" ON storage.objects FOR DELETE USING (bucket_id = 'daily-activities' AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
