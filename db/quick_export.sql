-- ============================================
-- QUICK DATABASE EXPORT - Run in Supabase SQL Editor
-- This generates INSERT statements for all your data
-- ============================================

-- Step 1: Copy the schema from supabase_schema.sql
-- Step 2: Run the queries below to get INSERT statements for all data

-- ============================================
-- Export Products
-- ============================================
SELECT 
    'INSERT INTO public.products (id, name, sku, created_at) VALUES (' ||
    quote_literal(id::text) || ', ' ||
    quote_literal(name) || ', ' ||
    COALESCE(quote_literal(sku), 'NULL') || ', ' ||
    quote_literal(created_at::text) || ');' as export_sql
FROM public.products
ORDER BY created_at;

-- ============================================
-- Export Items
-- ============================================
SELECT 
    'INSERT INTO public.items (id, product_id, code, status, created_at) VALUES (' ||
    quote_literal(id::text) || ', ' ||
    quote_literal(product_id::text) || ', ' ||
    quote_literal(code) || ', ' ||
    quote_literal(status) || ', ' ||
    quote_literal(created_at::text) || ');' as export_sql
FROM public.items
ORDER BY created_at;

-- ============================================
-- Export Profiles
-- ============================================
SELECT 
    'INSERT INTO public.profiles (id, email, full_name, role, created_at) VALUES (' ||
    quote_literal(id::text) || ', ' ||
    COALESCE(quote_literal(email), 'NULL') || ', ' ||
    COALESCE(quote_literal(full_name), 'NULL') || ', ' ||
    quote_literal(role) || ', ' ||
    quote_literal(created_at::text) || ');' as export_sql
FROM public.profiles
ORDER BY created_at;

-- ============================================
-- Export Users
-- ============================================
SELECT 
    'INSERT INTO public.users (id, full_name, email, auth_user_id, created_at) VALUES (' ||
    quote_literal(id::text) || ', ' ||
    quote_literal(full_name) || ', ' ||
    COALESCE(quote_literal(email), 'NULL') || ', ' ||
    COALESCE(quote_literal(auth_user_id::text), 'NULL') || ', ' ||
    quote_literal(created_at::text) || ');' as export_sql
FROM public.users
ORDER BY created_at;

-- ============================================
-- Export Assignments
-- ============================================
SELECT 
    'INSERT INTO public.assignments (id, item_id, user_id, status, issued_at, returned_at, due_at) VALUES (' ||
    quote_literal(id::text) || ', ' ||
    quote_literal(item_id::text) || ', ' ||
    quote_literal(user_id::text) || ', ' ||
    quote_literal(status) || ', ' ||
    quote_literal(issued_at::text) || ', ' ||
    COALESCE(quote_literal(returned_at::text), 'NULL') || ', ' ||
    COALESCE(quote_literal(due_at::text), 'NULL') || ');' as export_sql
FROM public.assignments
ORDER BY issued_at;

-- ============================================
-- Export Admin Emails
-- ============================================
SELECT 
    'INSERT INTO public.admin_emails (email, created_at) VALUES (' ||
    quote_literal(email) || ', ' ||
    quote_literal(created_at::text) || ');' as export_sql
FROM public.admin_emails
ORDER BY created_at;

