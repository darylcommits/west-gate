-- Add media_type to hero_slides table (run in Supabase SQL Editor)
ALTER TABLE public.hero_slides
  ADD COLUMN IF NOT EXISTS media_type TEXT DEFAULT 'image' CHECK (media_type IN ('image', 'video'));

-- Update hero-slides bucket to also allow video
UPDATE storage.buckets
SET allowed_mime_types = ARRAY[
  'image/jpeg','image/png','image/webp','image/avif',
  'video/mp4','video/webm','video/quicktime'
],
file_size_limit = 209715200  -- 200MB for videos
WHERE id = 'hero-slides';
