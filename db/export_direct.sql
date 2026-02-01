-- Direct Database Export via SQL Editor
-- Run these queries in Supabase SQL Editor and copy the results

-- ============================================
-- 1. EXPORT PRODUCTS
-- ============================================
SELECT 
    'INSERT INTO public.products (id, name, sku, created_at) VALUES (' ||
    quote_literal(id::text) || ', ' ||
    quote_literal(name) || ', ' ||
    COALESCE(quote_literal(sku), 'NULL') || ', ' ||
    quote_literal(created_at::text) || ');' as sql_statement
FROM public.products
ORDER BY created_at;

-- ============================================
-- 2. EXPORT ITEMS
-- ============================================
SELECT 
    'INSERT INTO public.items (id, product_id, code, status, created_at) VALUES (' ||
    quote_literal(id::text) || ', ' ||
    quote_literal(product_id::text) || ', ' ||
    quote_literal(code) || ', ' ||
    quote_literal(status) || ', ' ||
    quote_literal(created_at::text) || ');' as sql_statement
FROM public.items
ORDER BY created_at;

-- ============================================
-- 3. EXPORT PROFILES
-- ============================================
SELECT 
    'INSERT INTO public.profiles (id, email, full_name, role, created_at) VALUES (' ||
    quote_literal(id::text) || ', ' ||
    COALESCE(quote_literal(email), 'NULL') || ', ' ||
    COALESCE(quote_literal(full_name), 'NULL') || ', ' ||
    quote_literal(role) || ', ' ||
    quote_literal(created_at::text) || ');' as sql_statement
FROM public.profiles
ORDER BY created_at;

-- ============================================
-- 4. EXPORT USERS
-- ============================================
SELECT 
    'INSERT INTO public.users (id, full_name, email, auth_user_id, created_at) VALUES (' ||
    quote_literal(id::text) || ', ' ||
    quote_literal(full_name) || ', ' ||
    COALESCE(quote_literal(email), 'NULL') || ', ' ||
    COALESCE(quote_literal(auth_user_id::text), 'NULL') || ', ' ||
    quote_literal(created_at::text) || ');' as sql_statement
FROM public.users
ORDER BY created_at;

-- ============================================
-- 5. EXPORT ASSIGNMENTS
-- ============================================
SELECT 
    'INSERT INTO public.assignments (id, item_id, user_id, status, issued_at, returned_at, due_at) VALUES (' ||
    quote_literal(id::text) || ', ' ||
    quote_literal(item_id::text) || ', ' ||
    quote_literal(user_id::text) || ', ' ||
    quote_literal(status) || ', ' ||
    quote_literal(issued_at::text) || ', ' ||
    COALESCE(quote_literal(returned_at::text), 'NULL') || ', ' ||
    COALESCE(quote_literal(due_at::text), 'NULL') || ');' as sql_statement
FROM public.assignments
ORDER BY issued_at;

-- ============================================
-- 6. EXPORT ADMIN EMAILS
-- ============================================
SELECT 
    'INSERT INTO public.admin_emails (email, created_at) VALUES (' ||
    quote_literal(email) || ', ' ||
    quote_literal(created_at::text) || ');' as sql_statement
FROM public.admin_emails
ORDER BY created_at;

