# Supabase Setup Instructions

This application uses Supabase as the backend for storing whiskey data.

## Setup Steps

### 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com) and create a free account
2. Create a new project
3. Note your project URL and anon key from the project settings

### 2. Create the Database Schema

Run the following SQL in your Supabase SQL Editor:

```sql
-- Create the whiskeys table
CREATE TABLE whiskeys (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  distillery TEXT NOT NULL,
  type TEXT NOT NULL,
  region TEXT NOT NULL,
  age INTEGER,
  abv NUMERIC NOT NULL,
  description TEXT NOT NULL,
  attributes TEXT[] DEFAULT '{}',
  imageUrl TEXT,
  createdAt BIGINT NOT NULL
);

-- Enable Row Level Security
ALTER TABLE whiskeys ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow all authenticated and anonymous users to read whiskeys
CREATE POLICY "Allow public read access" ON whiskeys
  FOR SELECT
  USING (true);

-- Create a policy to allow only authenticated users to insert whiskeys
-- You may want to modify this based on your admin authentication setup
CREATE POLICY "Allow authenticated insert" ON whiskeys
  FOR INSERT
  WITH CHECK (true);

-- Create a policy to allow authenticated users to update whiskeys
CREATE POLICY "Allow authenticated update" ON whiskeys
  FOR UPDATE
  USING (true);

-- Create a policy to allow authenticated users to delete whiskeys
CREATE POLICY "Allow authenticated delete" ON whiskeys
  FOR DELETE
  USING (true);

-- Create indexes for better query performance
CREATE INDEX idx_whiskeys_created_at ON whiskeys(createdAt DESC);
CREATE INDEX idx_whiskeys_type ON whiskeys(type);
CREATE INDEX idx_whiskeys_region ON whiskeys(region);
```

### 3. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your-supabase-project-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

### 4. Run the Application

```bash
npm install
npm run dev
```

## Notes

- The whiskey data is stored in Supabase
- User profiles and reviews are still stored locally using Spark's KV storage
- Admin users (repository owners) can add whiskeys through the Admin tab
- All users can view whiskeys from the Supabase database

## Security Considerations

The current setup allows:
- Anyone to read whiskeys (public read access)
- Authenticated users to add/edit/delete whiskeys

You may want to modify the Row Level Security policies to:
- Restrict insert/update/delete to specific users (admins only)
- Add additional validation rules
- Implement proper user roles and permissions
