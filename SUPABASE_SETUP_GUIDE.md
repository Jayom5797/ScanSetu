# Supabase Setup Guide for ScanSetu

## Step 1: Create a New Supabase Project

1. Go to https://supabase.com/dashboard
2. Click **"New Project"**
3. Fill in the details:
   - **Name**: ScanSetu (or any name you prefer)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to you
   - **Pricing Plan**: Free tier is fine for development
4. Click **"Create new project"**
5. Wait 2-3 minutes for the project to be created

## Step 2: Get Your Project Credentials

1. Once the project is ready, go to **Settings** (gear icon in sidebar)
2. Click **API** in the left menu
3. You'll see:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long JWT token)
4. **Keep this page open** - you'll need these values

## Step 3: Update Your .env File

1. Open the `.env` file in your project root
2. Replace the values with your new credentials:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
```

## Step 4: Set Up the Database Schema

1. In your Supabase dashboard, click **SQL Editor** in the sidebar
2. Click **"New query"**
3. Copy the entire contents of `db/supabase_schema.sql` file
4. Paste it into the SQL editor
5. Click **"Run"** (or press Ctrl+Enter)
6. You should see "Success. No rows returned" - this is good!

## Step 5: Configure Authentication

1. Go to **Authentication** → **Providers** in the Supabase dashboard
2. Make sure **Email** is enabled (it should be by default)
3. Under **Email Auth**, configure:
   - ✅ Enable Email provider
   - ✅ Confirm email (optional - disable for testing)
   - ✅ Secure email change (recommended)

## Step 6: Add Admin Email (Optional)

To make yourself an admin:

1. Go to **SQL Editor** in Supabase
2. Run this query (replace with your email):

```sql
INSERT INTO public.admin_emails (email) 
VALUES ('your-email@example.com');
```

## Step 7: Test the Connection

1. Restart your dev server (if running):
   - Stop the current server (Ctrl+C in terminal)
   - Run: `npm run dev`
2. Open http://localhost:5173
3. Try to register a new account
4. You should be able to sign up and log in!

## Troubleshooting

### "Failed to fetch" error
- Make sure your Supabase project is not paused
- Check that the URL and anon key in `.env` are correct
- Restart your dev server after changing `.env`

### Can't see tables in dashboard
- Go to **Table Editor** in Supabase dashboard
- You should see: products, items, users, profiles, assignments, admin_emails

### Email confirmation required
- Go to **Authentication** → **Providers** → **Email**
- Toggle off "Confirm email" for easier testing
- Or check your email inbox for confirmation link

### RLS (Row Level Security) errors
- The schema includes permissive policies for development
- For production, you'll want to tighten these policies

## Next Steps

Once everything is working:
1. Create your first product in the Products page
2. Add items with barcodes
3. Test issuing and returning items
4. Invite team members by adding their emails to admin_emails table

## Need Help?

If you encounter issues:
1. Check the browser console (F12) for detailed error messages
2. Check the Supabase logs: **Logs** → **API** in dashboard
3. Verify your `.env` file has the correct credentials
