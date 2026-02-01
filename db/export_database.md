# How to Export Complete Database (Schema + Data)

## Method 1: Using Supabase CLI (Recommended)

### Prerequisites
```bash
npm install -g supabase
supabase login
```

### Export Database
```bash
# Link to your project
supabase link --project-ref your-project-ref

# Export complete database (schema + data)
supabase db dump -f complete_database.sql --data-only false

# Or export with data only
supabase db dump -f complete_database.sql --data-only true

# Export both schema and data (default)
supabase db dump -f complete_database.sql
```

## Method 2: Using pg_dump (Direct PostgreSQL)

### Get Connection String
1. Go to Supabase Dashboard → Settings → Database
2. Copy the connection string (use "Connection pooling" mode for pg_dump)

### Export Command
```bash
# Export complete database (schema + data)
pg_dump "postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres" > complete_database.sql

# Or with connection string format
pg_dump -h db.[YOUR-PROJECT-REF].supabase.co \
        -U postgres \
        -d postgres \
        -F p \
        -f complete_database.sql
```

## Method 3: Using Supabase Dashboard

1. Go to Supabase Dashboard → Database → Backups
2. Click "Download" on any backup (or create a new one)
3. This gives you a complete database dump

## Method 4: Manual SQL Export (For Specific Tables)

Run this in Supabase SQL Editor to generate INSERT statements for all data:

