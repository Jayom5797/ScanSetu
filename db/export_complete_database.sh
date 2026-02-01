#!/bin/bash
# Complete Database Export Script for Supabase
# This script exports both schema and data

# Configuration - Update these values
PROJECT_REF="your-project-ref"
DB_PASSWORD="your-database-password"
OUTPUT_FILE="complete_database_$(date +%Y%m%d_%H%M%S).sql"

echo "Starting database export..."
echo "Project: $PROJECT_REF"
echo "Output file: $OUTPUT_FILE"

# Method 1: Using Supabase CLI (if installed)
if command -v supabase &> /dev/null; then
    echo "Using Supabase CLI..."
    supabase db dump --project-ref $PROJECT_REF -f $OUTPUT_FILE
    echo "Export complete: $OUTPUT_FILE"
    exit 0
fi

# Method 2: Using pg_dump
if command -v pg_dump &> /dev/null; then
    echo "Using pg_dump..."
    pg_dump -h db.$PROJECT_REF.supabase.co \
            -U postgres \
            -d postgres \
            -F p \
            --no-owner \
            --no-acl \
            -f $OUTPUT_FILE
    
    echo "Export complete: $OUTPUT_FILE"
    exit 0
fi

echo "Error: Neither supabase CLI nor pg_dump found."
echo "Please install one of them:"
echo "  - Supabase CLI: npm install -g supabase"
echo "  - pg_dump: Install PostgreSQL client tools"
exit 1

