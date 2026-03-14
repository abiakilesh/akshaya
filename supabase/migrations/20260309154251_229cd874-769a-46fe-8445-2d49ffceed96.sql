-- Create admin user
INSERT INTO auth.users (
  id, instance_id, email, encrypted_password, email_confirmed_at, 
  created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
  aud, role, confirmation_token
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'admin@akshaya.com',
  crypt('admin123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}'::jsonb,
  '{}'::jsonb,
  'authenticated',
  'authenticated',
  ''
);

-- Also add identity for the user
INSERT INTO auth.identities (
  id, user_id, provider_id, provider, identity_data, last_sign_in_at, created_at, updated_at
) SELECT 
  gen_random_uuid(),
  id,
  email,
  'email',
  jsonb_build_object('sub', id::text, 'email', email),
  now(),
  now(),
  now()
FROM auth.users WHERE email = 'admin@akshaya.com';