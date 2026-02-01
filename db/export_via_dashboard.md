# Export Database via Supabase Dashboard (Easiest Method)

## Step-by-Step Guide

### Option 1: Download Existing Backup
1. Go to: https://supabase.com/dashboard
2. Select your project
3. Navigate to: **Database → Backups**
4. Click **"Download"** on any backup file
5. You'll get a complete `.sql` file with schema + data

### Option 2: Create New Backup
1. Go to: **Database → Backups**
2. Click **"Create Backup"** or **"New Backup"**
3. Wait for backup to complete
4. Click **"Download"**

### Option 3: Use SQL Editor to Export Data
1. Go to: **SQL Editor**
2. Run the queries from `quick_export.sql`
3. Copy the results (INSERT statements)
4. Combine with schema from `supabase_schema.sql`

