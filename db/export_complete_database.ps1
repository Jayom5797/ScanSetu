# Complete Database Export Script for Supabase (PowerShell)
# This script exports both schema and data

# Configuration - Update these values
$PROJECT_REF = "your-project-ref"
$DB_PASSWORD = "your-database-password"
$OUTPUT_FILE = "complete_database_$(Get-Date -Format 'yyyyMMdd_HHmmss').sql"

Write-Host "Starting database export..."
Write-Host "Project: $PROJECT_REF"
Write-Host "Output file: $OUTPUT_FILE"

# Method 1: Using Supabase CLI (if installed)
if (Get-Command supabase -ErrorAction SilentlyContinue) {
    Write-Host "Using Supabase CLI..."
    supabase db dump --project-ref $PROJECT_REF -f $OUTPUT_FILE
    Write-Host "Export complete: $OUTPUT_FILE"
    exit 0
}

# Method 2: Using pg_dump
if (Get-Command pg_dump -ErrorAction SilentlyContinue) {
    Write-Host "Using pg_dump..."
    $env:PGPASSWORD = $DB_PASSWORD
    pg_dump -h "db.$PROJECT_REF.supabase.co" `
            -U postgres `
            -d postgres `
            -F p `
            --no-owner `
            --no-acl `
            -f $OUTPUT_FILE
    
    Write-Host "Export complete: $OUTPUT_FILE"
    exit 0
}

Write-Host "Error: Neither supabase CLI nor pg_dump found."
Write-Host "Please install one of them:"
Write-Host "  - Supabase CLI: npm install -g supabase"
Write-Host "  - pg_dump: Install PostgreSQL client tools"
exit 1

