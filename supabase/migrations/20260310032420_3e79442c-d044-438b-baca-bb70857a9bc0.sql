INSERT INTO storage.buckets (id, name, public) VALUES ('gallery', 'gallery', true);

CREATE POLICY "Anyone can view gallery images" ON storage.objects FOR SELECT TO public USING (bucket_id = 'gallery');

CREATE POLICY "Authenticated users can upload gallery images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'gallery');

CREATE POLICY "Authenticated users can delete gallery images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'gallery');

CREATE POLICY "Authenticated users can update gallery images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'gallery');