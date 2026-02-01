-- ============================================
-- Export All Data from Database
-- Run this in Supabase SQL Editor
-- ============================================

-- ============================================
-- 1. Export Products Data
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
-- 2. Export Items Data
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
-- 3. Export Profiles Data
-- ============================================
SELECT 
    'INSERT INTO public.profiles (id, email, full_name, role, created_at, updated_at) VALUES (' ||
    quote_literal(id::text) || ', ' ||
    COALESCE(quote_literal(email), 'NULL') || ', ' ||
    COALESCE(quote_literal(full_name), 'NULL') || ', ' ||
    quote_literal(role) || ', ' ||
    quote_literal(created_at::text) || ', ' ||
    quote_literal(updated_at::text) || ');' as sql_statement
FROM public.profiles
ORDER BY created_at;

-- ============================================
-- 4. Export Users Data
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
-- 5. Export Assignments Data
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
-- 6. Export Admin Emails Data
-- ============================================
SELECT 
    'INSERT INTO public.admin_emails (email, created_at) VALUES (' ||
    quote_literal(email) || ', ' ||
    quote_literal(created_at::text) || ');' as sql_statement
FROM public.admin_emails
ORDER BY created_at;

-- ============================================
-- Complete Export Script (All in One)
-- ============================================
-- This generates a complete SQL file with schema + data

-- First, get the schema (run the supabase_schema.sql file)
-- Then run the INSERT statements below

-- Products
COPY (SELECT 'INSERT INTO public.products (id, name, sku, created_at) VALUES (' ||
    quote_literal(id::text) || ', ' ||
    quote_literal(name) || ', ' ||
    COALESCE(quote_literal(sku), 'NULL') || ', ' ||
    quote_literal(created_at::text) || ');'
FROM public.products) TO STDOUT;

-- Items  
COPY (SELECT 'INSERT INTO public.items (id, product_id, code, status, created_at) VALUES (' ||
    quote_literal(id::text) || ', ' ||
    quote_literal(product_id::text) || ', ' ||
    quote_literal(code) || ', ' ||
    quote_literal(status) || ', ' ||
    quote_literal(created_at::text) || ');'
FROM public.items) TO STDOUT;

-- Profiles
COPY (SELECT 'INSERT INTO public.profiles (id, email, full_name, role, created_at, updated_at) VALUES (' ||
    quote_literal(id::text) || ', ' ||
    COALESCE(quote_literal(email), 'NULL') || ', ' ||
    COALESCE(quote_literal(full_name), 'NULL') || ', ' ||
    quote_literal(role) || ', ' ||
    quote_literal(created_at::text) || ', ' ||
    quote_literal(updated_at::text) || ');'
FROM public.profiles) TO STDOUT;

-- Users
COPY (SELECT 'INSERT INTO public.users (id, full_name, email, auth_user_id, created_at) VALUES (' ||
    quote_literal(id::text) || ', ' ||
    quote_literal(full_name) || ', ' ||
    COALESCE(quote_literal(email), 'NULL') || ', ' ||
    COALESCE(quote_literal(auth_user_id::text), 'NULL') || ', ' ||
    quote_literal(created_at::text) || ');'
FROM public.users) TO STDOUT;

-- Assignments
COPY (SELECT 'INSERT INTO public.assignments (id, item_id, user_id, status, issued_at, returned_at, due_at) VALUES (' ||
    quote_literal(id::text) || ', ' ||
    quote_literal(item_id::text) || ', ' ||
    quote_literal(user_id::text) || ', ' ||
    quote_literal(status) || ', ' ||
    quote_literal(issued_at::text) || ', ' ||
    COALESCE(quote_literal(returned_at::text), 'NULL') || ', ' ||
    COALESCE(quote_literal(due_at::text), 'NULL') || ');'
FROM public.assignments) TO STDOUT;

-- Admin Emails
COPY (SELECT 'INSERT INTO public.admin_emails (email, created_at) VALUES (' ||
    quote_literal(email) || ', ' ||
    quote_literal(created_at::text) || ');'
FROM public.admin_emails) TO STDOUT;

