@echo off
REM Export Database using npx (no installation needed)
REM Update PROJECT_REF with your Supabase project reference

set PROJECT_REF=your-project-ref
set OUTPUT_FILE=complete_database_%date:~-4,4%%date:~-7,2%%date:~-10,2%_%time:~0,2%%time:~3,2%%time:~6,2%.sql
set OUTPUT_FILE=%OUTPUT_FILE: =0%

echo Exporting database...
echo Project: %PROJECT_REF%
echo Output: %OUTPUT_FILE%

REM First, login to Supabase
echo.
echo Step 1: Login to Supabase (if not already logged in)
npx supabase@latest login

echo.
echo Step 2: Linking to project...
npx supabase@latest link --project-ref %PROJECT_REF%

echo.
echo Step 3: Exporting database...
npx supabase@latest db dump -f %OUTPUT_FILE%

echo.
echo Export complete! File saved as: %OUTPUT_FILE%
pause

