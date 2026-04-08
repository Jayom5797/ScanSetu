-- Create Auth Users for ScanSetu Demo
-- Run this in Supabase SQL Editor

-- ============================================
-- STEP 1: Insert into auth.users
-- ============================================

INSERT INTO auth.users (
  id, instance_id, email, encrypted_password,
  email_confirmed_at, created_at, updated_at,
  raw_app_meta_data, raw_user_meta_data,
  is_super_admin, role, aud
)
VALUES
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', 'admin@college.edu',        crypt('Admin@123',      gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}'::jsonb, '{"full_name":"Admin User"}'::jsonb,       false, 'authenticated', 'authenticated'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', 'lab.manager@college.edu',  crypt('LabMgr@123',     gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}'::jsonb, '{"full_name":"Lab Manager"}'::jsonb,      false, 'authenticated', 'authenticated'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', 'prof.sharma@college.edu',  crypt('Prof@123',       gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}'::jsonb, '{"full_name":"Prof Sharma"}'::jsonb,      false, 'authenticated', 'authenticated'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', 'rahul.sharma@college.edu', crypt('Rahul@123',      gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}'::jsonb, '{"full_name":"Rahul Sharma"}'::jsonb,     false, 'authenticated', 'authenticated'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', 'priya.patel@college.edu',  crypt('Priya@123',      gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}'::jsonb, '{"full_name":"Priya Patel"}'::jsonb,      false, 'authenticated', 'authenticated'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', 'amit.kumar@college.edu',   crypt('Amit@123',       gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}'::jsonb, '{"full_name":"Amit Kumar"}'::jsonb,       false, 'authenticated', 'authenticated'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', 'sneha.reddy@college.edu',  crypt('Sneha@123',      gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}'::jsonb, '{"full_name":"Sneha Reddy"}'::jsonb,      false, 'authenticated', 'authenticated'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', 'vikram.singh@college.edu', crypt('Vikram@123',     gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}'::jsonb, '{"full_name":"Vikram Singh"}'::jsonb,     false, 'authenticated', 'authenticated'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', 'ananya.iyer@college.edu',  crypt('Ananya@123',     gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}'::jsonb, '{"full_name":"Ananya Iyer"}'::jsonb,      false, 'authenticated', 'authenticated'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', 'rohan.gupta@college.edu',  crypt('Rohan@123',      gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}'::jsonb, '{"full_name":"Rohan Gupta"}'::jsonb,      false, 'authenticated', 'authenticated'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', 'kavya.nair@college.edu',   crypt('Kavya@123',      gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}'::jsonb, '{"full_name":"Kavya Nair"}'::jsonb,       false, 'authenticated', 'authenticated'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', 'arjun.mehta@college.edu',  crypt('Arjun@123',      gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}'::jsonb, '{"full_name":"Arjun Mehta"}'::jsonb,      false, 'authenticated', 'authenticated'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', 'divya.krishnan@college.edu',crypt('Divya@123',     gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}'::jsonb, '{"full_name":"Divya Krishnan"}'::jsonb,   false, 'authenticated', 'authenticated'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', 'karthik.rao@college.edu',  crypt('Karthik@123',    gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}'::jsonb, '{"full_name":"Karthik Rao"}'::jsonb,      false, 'authenticated', 'authenticated'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', 'meera.joshi@college.edu',  crypt('Meera@123',      gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}'::jsonb, '{"full_name":"Meera Joshi"}'::jsonb,      false, 'authenticated', 'authenticated'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', 'siddharth.verma@college.edu',crypt('Siddharth@123',gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}'::jsonb, '{"full_name":"Siddharth Verma"}'::jsonb,  false, 'authenticated', 'authenticated'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', 'aisha.khan@college.edu',   crypt('Aisha@123',      gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}'::jsonb, '{"full_name":"Aisha Khan"}'::jsonb,       false, 'authenticated', 'authenticated'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', 'nikhil.desai@college.edu', crypt('Nikhil@123',     gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}'::jsonb, '{"full_name":"Nikhil Desai"}'::jsonb,     false, 'authenticated', 'authenticated')
ON CONFLICT (email) DO NOTHING;

-- ============================================
-- STEP 2: Create profiles for all auth users
-- ============================================

INSERT INTO public.profiles (id, email, full_name, role)
SELECT
  au.id,
  au.email,
  au.raw_user_meta_data->>'full_name',
  CASE WHEN ae.email IS NOT NULL THEN 'admin' ELSE 'student' END
FROM auth.users au
LEFT JOIN public.admin_emails ae ON ae.email = au.email
WHERE au.email LIKE '%@college.edu'
ON CONFLICT (id) DO UPDATE
  SET full_name = EXCLUDED.full_name,
      role      = EXCLUDED.role,
      updated_at = now();

-- ============================================
-- STEP 3: Link auth users to public.users
-- ============================================

UPDATE public.users u
SET auth_user_id = au.id
FROM auth.users au
WHERE au.email = u.email
  AND u.auth_user_id IS NULL;
