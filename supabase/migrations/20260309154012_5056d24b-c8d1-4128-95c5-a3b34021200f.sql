-- Create leads table
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  project_type TEXT NOT NULL,
  place TEXT NOT NULL,
  message TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a lead" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can view leads" ON public.leads FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete leads" ON public.leads FOR DELETE TO authenticated USING (true);

-- Create gallery table
CREATE TABLE public.gallery (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  project_type TEXT NOT NULL,
  place TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert gallery" ON public.gallery FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update gallery" ON public.gallery FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete gallery" ON public.gallery FOR DELETE TO authenticated USING (true);

-- Seed gallery data
INSERT INTO public.gallery (image_url, project_type, place, description) VALUES
  ('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600', 'Construction', 'Coimbatore', 'Modern residential complex with premium finishes'),
  ('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600', 'Interior Design', 'Chennai', 'Luxury villa interior with contemporary design'),
  ('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600', 'Construction', 'Coimbatore', 'Premium individual house construction'),
  ('https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600', '2D/3D Planning', 'Madurai', '3D architectural visualization for villa project'),
  ('https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=600', 'Real Estate', 'Coimbatore', 'Commercial real estate development'),
  ('https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600', 'Vastu Design', 'Trichy', '100% Vastu compliant residential design');