# Installing Supabase CLI on Windows

## Method 1: Using Scoop (Recommended for Windows)

```powershell
# Install Scoop if you don't have it
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression

# Install Supabase CLI
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

## Method 2: Using Chocolatey

```powershell
# Install Chocolatey if you don't have it
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Install Supabase CLI
choco install supabase
```

## Method 3: Direct Download (Windows Binary)

1. Go to: https://github.com/supabase/cli/releases
2. Download: `supabase_windows_amd64.zip` (or appropriate version)
3. Extract and add to PATH

## Method 4: Using npx (No Installation Needed)

Instead of installing globally, use npx:

```bash
npx supabase@latest db dump --project-ref your-project-ref -f complete_database.sql
```

## Method 5: Use Supabase Dashboard (Easiest - No Installation)

1. Go to your Supabase Dashboard
2. Navigate to: **Database → Backups**
3. Click **"Download"** on any backup
4. This gives you complete database export

