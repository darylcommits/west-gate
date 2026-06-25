-- ==========================================
-- PROOF OF TRANSACTIONS TABLE
-- ==========================================
-- Run this in your Supabase SQL Editor

CREATE TABLE public.proof_of_transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  service_type TEXT NOT NULL,
  transaction_date DATE NOT NULL,
  description TEXT,
  media_url TEXT,
  media_type TEXT DEFAULT 'image' CHECK (media_type IN ('image', 'video')),
  thumbnail_url TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.proof_of_transactions ENABLE ROW LEVEL SECURITY;

-- Public can read published transactions
CREATE POLICY "transactions_public_read" ON public.proof_of_transactions
  FOR SELECT USING (is_published = true);

-- Admin can do everything
CREATE POLICY "transactions_admin_all" ON public.proof_of_transactions
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Auto-update updated_at
CREATE TRIGGER transactions_updated_at
  BEFORE UPDATE ON public.proof_of_transactions
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ==========================================
-- STORAGE BUCKET FOR TRANSACTION MEDIA
-- ==========================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'transaction-proofs',
  'transaction-proofs',
  true,
  104857600, -- 100MB
  ARRAY['image/jpeg','image/png','image/webp','image/avif','video/mp4','video/webm','video/quicktime']
) ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "transaction_proofs_public_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'transaction-proofs');

CREATE POLICY "transaction_proofs_admin_insert"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'transaction-proofs'
    AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "transaction_proofs_admin_delete"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'transaction-proofs'
    AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );
