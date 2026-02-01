-- SQL Queries to Get All User Information
-- Note: Passwords are hashed and cannot be retrieved in plain text (this is by design for security)

-- ============================================
-- 1. Get all user profiles with roles
-- ============================================
SELECT 
    p.id as user_id,
    p.email,
    p.full_name,
    p.role,
    p.created_at as profile_created_at
FROM public.profiles p
ORDER BY p.created_at DESC;

-- ============================================
-- 2. Get all users from users directory table
-- ============================================
SELECT 
    u.id,
    u.full_name,
    u.email,
    u.auth_user_id,
    u.created_at
FROM public.users u
ORDER BY u.created_at DESC;

-- ============================================
-- 3. Get comprehensive user information (profiles + users table)
-- ============================================
SELECT 
    p.id as auth_user_id,
    p.email,
    p.full_name,
    p.role,
    u.id as user_directory_id,
    p.created_at as profile_created_at,
    u.created_at as user_directory_created_at
FROM public.profiles p
LEFT JOIN public.users u ON u.auth_user_id = p.id
ORDER BY p.created_at DESC;

-- ============================================
-- 4. Get user authentication metadata from auth.users
-- (Note: This requires service_role key or admin access)
-- ============================================
SELECT 
    au.id,
    au.email,
    au.created_at,
    au.updated_at,
    au.last_sign_in_at,
    au.email_confirmed_at,
    au.phone_confirmed_at,
    au.confirmed_at,
    au.recovery_sent_at,
    au.new_email,
    au.invited_at,
    au.action_link,
    au.encrypted_password,  -- This is the hashed password (cannot be decrypted)
    au.email_change_token_new,
    au.email_change,
    au.phone_change_token,
    au.phone_change,
    au.confirmed_at,
    au.email_change_sent_at,
    au.recovery_sent_at,
    au.deleted_at,
    au.is_sso_user,
    au.sso_providers
FROM auth.users au
ORDER BY au.created_at DESC;

-- ============================================
-- 5. Get all users with their activity summary
-- ============================================
SELECT 
    p.id as user_id,
    p.email,
    p.full_name,
    p.role,
    COUNT(DISTINCT a.id) as total_assignments,
    COUNT(DISTINCT CASE WHEN a.status = 'issued' THEN a.id END) as currently_issued_items,
    COUNT(DISTINCT CASE WHEN a.status = 'returned' THEN a.id END) as returned_items,
    MAX(a.issued_at) as last_issue_date,
    MAX(a.returned_at) as last_return_date
FROM public.profiles p
LEFT JOIN public.users u ON u.auth_user_id = p.id
LEFT JOIN public.assignments a ON a.user_id = u.id
GROUP BY p.id, p.email, p.full_name, p.role
ORDER BY p.created_at DESC;

-- ============================================
-- 6. Get admin users only
-- ============================================
SELECT 
    p.id as user_id,
    p.email,
    p.full_name,
    p.role,
    p.created_at
FROM public.profiles p
WHERE p.role = 'admin'
ORDER BY p.created_at DESC;

-- ============================================
-- 7. Get student users only
-- ============================================
SELECT 
    p.id as user_id,
    p.email,
    p.full_name,
    p.role,
    p.created_at
FROM public.profiles p
WHERE p.role = 'student'
ORDER BY p.created_at DESC;

-- ============================================
-- 8. Get users with admin email configuration
-- ============================================
SELECT 
    p.id as user_id,
    p.email,
    p.full_name,
    p.role,
    ae.email as admin_email_config,
    ae.created_at as admin_config_created_at
FROM public.profiles p
LEFT JOIN public.admin_emails ae ON ae.email = p.email
ORDER BY p.created_at DESC;

-- ============================================
-- IMPORTANT NOTES:
-- ============================================
-- 1. Passwords are stored as encrypted_password in auth.users but CANNOT be decrypted
-- 2. To reset a user's password, use Supabase Dashboard or API, not SQL
-- 3. The auth.users table requires service_role access or admin privileges
-- 4. For production, always use Row Level Security (RLS) policies
-- 5. Never expose auth.users queries in client-side code

