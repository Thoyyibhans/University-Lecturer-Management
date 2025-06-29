/*
  # Create lecturers table for university management system

  1. New Tables
    - `lecturers`
      - `id` (uuid, primary key)
      - `nidn` (text) - Lecturer ID number
      - `name` (text) - Full name of lecturer
      - `degree` (text) - Academic degree (e.g., Dr. S.Kom., M.Kom)
      - `scopus_id` (text, optional) - Scopus researcher ID
      - `functional_position` (text) - Jabatan fungsional
      - `rank` (text) - Kepangkatan
      - `last_education` (text) - Latest education background
      - `serdos_status` (text) - Status Sertifikasi Dosen
      - `created_at` (timestamp) - Auto-generated timestamp

  2. Security
    - Enable RLS on `lecturers` table
    - Add policy for public access (can be modified based on auth requirements)
*/

CREATE TABLE IF NOT EXISTS lecturers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nidn text NOT NULL UNIQUE,
  name text NOT NULL,
  degree text NOT NULL DEFAULT '',
  scopus_id text DEFAULT '',
  functional_position text NOT NULL DEFAULT '',
  rank text NOT NULL DEFAULT '',
  last_education text NOT NULL DEFAULT '',
  serdos_status text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE lecturers ENABLE ROW LEVEL SECURITY;

-- Allow public access for demo purposes
-- In production, you might want to restrict this to authenticated users
CREATE POLICY "Allow public access to lecturers"
  ON lecturers
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Create index for better performance on searches
CREATE INDEX IF NOT EXISTS idx_lecturers_name ON lecturers(name);
CREATE INDEX IF NOT EXISTS idx_lecturers_nidn ON lecturers(nidn);