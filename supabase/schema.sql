-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('admin', 'client')),
  address TEXT,
  city TEXT,
  province TEXT,
  bio TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.properties (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  property_code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(15,2) NOT NULL,
  price_label TEXT,
  property_type TEXT NOT NULL CHECK (property_type IN ('house_and_lot', 'lot_only', 'condominium', 'commercial', 'warehouse', 'farm_lot', 'townhouse')),
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'sold', 'reserved', 'off_market')),
  is_featured BOOLEAN DEFAULT false,
  lot_area NUMERIC(10,2),
  floor_area NUMERIC(10,2),
  bedrooms INTEGER,
  bathrooms INTEGER,
  garage INTEGER DEFAULT 0,
  location TEXT NOT NULL,
  barangay TEXT,
  city TEXT NOT NULL,
  province TEXT NOT NULL DEFAULT 'Ilocos Norte',
  latitude NUMERIC(10,8),
  longitude NUMERIC(11,8),
  google_map_embed TEXT,
  features JSONB DEFAULT '[]',
  amenities JSONB DEFAULT '[]',
  views_count INTEGER DEFAULT 0,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.property_images (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
  url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  caption TEXT,
  is_primary BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.property_videos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
  url TEXT NOT NULL,
  storage_path TEXT,
  title TEXT,
  thumbnail_url TEXT,
  video_type TEXT DEFAULT 'upload' CHECK (video_type IN ('upload', 'youtube', 'vimeo')),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.property_documents (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  doc_type TEXT DEFAULT 'pdf',
  file_size INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
  client_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed', 'cancelled')),
  notes TEXT,
  admin_notes TEXT,
  reschedule_date DATE,
  reschedule_time TIME,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.favorites (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(client_id, property_id)
);

CREATE TABLE public.inquiries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
  client_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'closed')),
  admin_reply TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info' CHECK (type IN ('info', 'booking', 'inquiry', 'system', 'alert')),
  is_read BOOLEAN DEFAULT false,
  link TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.testimonials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_title TEXT,
  client_avatar TEXT,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
  is_published BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.cms_content (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  section TEXT UNIQUE NOT NULL,
  title TEXT,
  subtitle TEXT,
  content JSONB DEFAULT '{}',
  is_published BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.activity_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  metadata JSONB DEFAULT '{}',
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_properties_status ON public.properties(status);
CREATE INDEX idx_properties_featured ON public.properties(is_featured);
CREATE INDEX idx_properties_type ON public.properties(property_type);
CREATE INDEX idx_properties_city ON public.properties(city);
CREATE INDEX idx_properties_province ON public.properties(province);
CREATE INDEX idx_properties_price ON public.properties(price);
CREATE INDEX idx_properties_created ON public.properties(created_at DESC);
CREATE INDEX idx_bookings_property ON public.bookings(property_id);
CREATE INDEX idx_bookings_client ON public.bookings(client_id);
CREATE INDEX idx_bookings_date ON public.bookings(booking_date);
CREATE INDEX idx_bookings_status ON public.bookings(status);
CREATE INDEX idx_notifications_user ON public.notifications(user_id);
CREATE INDEX idx_notifications_read ON public.notifications(is_read);
CREATE INDEX idx_property_images_property ON public.property_images(property_id);
CREATE INDEX idx_favorites_client ON public.favorites(client_id);
CREATE INDEX idx_inquiries_status ON public.inquiries(status);

-- RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_admin_all" ON public.profiles FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'));
CREATE POLICY "properties_public_read" ON public.properties FOR SELECT USING (status != 'off_market' OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'));
CREATE POLICY "properties_admin_all" ON public.properties FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'));
CREATE POLICY "property_images_public_read" ON public.property_images FOR SELECT USING (true);
CREATE POLICY "property_images_admin_all" ON public.property_images FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'));
CREATE POLICY "property_videos_public_read" ON public.property_videos FOR SELECT USING (true);
CREATE POLICY "property_videos_admin_all" ON public.property_videos FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'));
CREATE POLICY "property_docs_auth_read" ON public.property_documents FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "property_docs_admin_all" ON public.property_documents FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'));
CREATE POLICY "bookings_client_own" ON public.bookings FOR SELECT USING (client_id = auth.uid());
CREATE POLICY "bookings_client_insert" ON public.bookings FOR INSERT WITH CHECK (client_id = auth.uid());
CREATE POLICY "bookings_client_update" ON public.bookings FOR UPDATE USING (client_id = auth.uid() AND status = 'pending');
CREATE POLICY "bookings_admin_all" ON public.bookings FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'));
CREATE POLICY "favorites_client_own" ON public.favorites FOR ALL USING (client_id = auth.uid());
CREATE POLICY "inquiries_public_insert" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "inquiries_client_own" ON public.inquiries FOR SELECT USING (client_id = auth.uid());
CREATE POLICY "inquiries_admin_all" ON public.inquiries FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'));
CREATE POLICY "notifications_own" ON public.notifications FOR ALL USING (user_id = auth.uid());
CREATE POLICY "testimonials_public_read" ON public.testimonials FOR SELECT USING (is_published = true);
CREATE POLICY "testimonials_admin_all" ON public.testimonials FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'));
CREATE POLICY "cms_public_read" ON public.cms_content FOR SELECT USING (is_published = true);
CREATE POLICY "cms_admin_all" ON public.cms_content FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'));
CREATE POLICY "activity_admin_all" ON public.activity_logs FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'));

-- Functions
CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email), COALESCE(NEW.raw_user_meta_data->>'role', 'client'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.handle_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER properties_updated_at BEFORE UPDATE ON public.properties FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER bookings_updated_at BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER inquiries_updated_at BEFORE UPDATE ON public.inquiries FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE OR REPLACE FUNCTION public.notify_booking_status_change() RETURNS TRIGGER AS $$
DECLARE
  prop_name TEXT;
  notif_title TEXT;
  notif_msg TEXT;
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    SELECT name INTO prop_name FROM public.properties WHERE id = NEW.property_id;
    notif_title := CASE NEW.status WHEN 'approved' THEN 'Booking Approved!' WHEN 'rejected' THEN 'Booking Rejected' WHEN 'completed' THEN 'Viewing Completed' ELSE 'Booking Updated' END;
    notif_msg := CASE NEW.status WHEN 'approved' THEN 'Your viewing schedule for ' || prop_name || ' has been approved.' WHEN 'rejected' THEN 'Your booking for ' || prop_name || ' was not approved.' WHEN 'completed' THEN 'Your viewing for ' || prop_name || ' is complete.' ELSE 'Your booking for ' || prop_name || ' has been updated.' END;
    INSERT INTO public.notifications (user_id, title, message, type, link, metadata)
    VALUES (NEW.client_id, notif_title, notif_msg, 'booking', '/client/bookings', jsonb_build_object('booking_id', NEW.id, 'property_id', NEW.property_id, 'status', NEW.status));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_booking_status_change AFTER UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION public.notify_booking_status_change();

CREATE OR REPLACE FUNCTION public.notify_admin_new_booking() RETURNS TRIGGER AS $$
DECLARE
  prop_name TEXT;
  client_name TEXT;
  admin_id UUID;
BEGIN
  SELECT name INTO prop_name FROM public.properties WHERE id = NEW.property_id;
  SELECT full_name INTO client_name FROM public.profiles WHERE id = NEW.client_id;
  FOR admin_id IN SELECT id FROM public.profiles WHERE role = 'admin' LOOP
    INSERT INTO public.notifications (user_id, title, message, type, link, metadata)
    VALUES (admin_id, 'New Booking Request', client_name || ' booked viewing for ' || prop_name, 'booking', '/admin/bookings', jsonb_build_object('booking_id', NEW.id));
  END LOOP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_new_booking AFTER INSERT ON public.bookings FOR EACH ROW EXECUTE FUNCTION public.notify_admin_new_booking();

CREATE OR REPLACE FUNCTION public.notify_admin_new_inquiry() RETURNS TRIGGER AS $$
DECLARE
  admin_id UUID;
BEGIN
  FOR admin_id IN SELECT id FROM public.profiles WHERE role = 'admin' LOOP
    INSERT INTO public.notifications (user_id, title, message, type, link, metadata)
    VALUES (admin_id, 'New Inquiry', NEW.name || ' sent an inquiry', 'inquiry', '/admin/inquiries', jsonb_build_object('inquiry_id', NEW.id));
  END LOOP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_new_inquiry AFTER INSERT ON public.inquiries FOR EACH ROW EXECUTE FUNCTION public.notify_admin_new_inquiry();

CREATE OR REPLACE FUNCTION public.increment_property_views(property_uuid UUID) RETURNS VOID AS $$
BEGIN
  UPDATE public.properties SET views_count = views_count + 1 WHERE id = property_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.bookings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.inquiries;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types) VALUES
  ('property-images', 'property-images', true, 52428800, ARRAY['image/jpeg','image/png','image/webp','image/avif']),
  ('property-videos', 'property-videos', true, 524288000, ARRAY['video/mp4','video/webm']),
  ('property-documents', 'property-documents', false, 10485760, ARRAY['application/pdf']),
  ('avatars', 'avatars', true, 5242880, ARRAY['image/jpeg','image/png','image/webp'])
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "storage_property_images_read" ON storage.objects FOR SELECT USING (bucket_id = 'property-images');
CREATE POLICY "storage_property_images_insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'property-images' AND public.is_admin());
CREATE POLICY "storage_property_videos_read" ON storage.objects FOR SELECT USING (bucket_id = 'property-videos');
CREATE POLICY "storage_property_videos_insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'property-videos' AND public.is_admin());
CREATE POLICY "storage_property_videos_update" ON storage.objects FOR UPDATE USING (bucket_id = 'property-videos' AND public.is_admin());
CREATE POLICY "storage_property_videos_delete" ON storage.objects FOR DELETE USING (bucket_id = 'property-videos' AND public.is_admin());
CREATE POLICY "storage_avatars_read" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "storage_avatars_insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid() IS NOT NULL);
CREATE POLICY "storage_docs_read" ON storage.objects FOR SELECT USING (bucket_id = 'property-documents' AND auth.uid() IS NOT NULL);
CREATE POLICY "storage_docs_insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'property-documents' AND public.is_admin());

-- ==========================================
-- CRM CLIENTS TABLE (Standalone directory)
-- ==========================================
CREATE TABLE public.crm_clients (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  address TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.crm_clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "crm_clients_admin_all" ON public.crm_clients FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE TRIGGER crm_clients_updated_at BEFORE UPDATE ON public.crm_clients FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
