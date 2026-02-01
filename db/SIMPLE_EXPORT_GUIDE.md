# Simple Database Export Guide

## 🎯 Easiest Method: Supabase Dashboard

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard
2. **Select your project**
3. **Navigate to**: Database → Backups
4. **Click "Download"** on any backup
5. **Done!** You have complete database export

---

## 🔧 Alternative: Using npx (No Installation)

Since global npm install doesn't work, use npx:

```bash
# 1. Login (first time only)
npx supabase@latest login

# 2. Link to your project
npx supabase@latest link --project-ref YOUR-PROJECT-REF

# 3. Export database
npx supabase@latest db dump -f complete_database.sql
```

**To find your PROJECT_REF:**
- Go to Supabase Dashboard → Settings → General
- Look for "Reference ID" or check your project URL: `https://supabase.com/dashboard/project/YOUR-PROJECT-REF`

---

## 📝 Manual Export via SQL Editor

If you prefer manual export:

1. **Get Schema**: Copy entire `supabase_schema.sql` file
2. **Get Data**: Run queries from `quick_export.sql` in SQL Editor
3. **Combine**: Schema + INSERT statements = Complete database

---

## 🚀 Quick Script (Windows)

Run `export_with_npx.bat` (update PROJECT_REF first)

---

## ⚠️ Important Notes

- **Passwords cannot be exported** - They're hashed in `auth.users` table
- **Backups include**: All tables, data, triggers, functions, policies
- **File size**: Depends on your data volume
- **Format**: Standard PostgreSQL SQL dump

