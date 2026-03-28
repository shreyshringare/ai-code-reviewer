-- schema.sql — SnapCode Supabase Database Schema
-- Run this in Supabase → SQL Editor to create the required tables.
-- Safe to re-run: uses IF NOT EXISTS / DO NOTHING guards.

-- ── Extensions ───────────────────────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ── reviews ──────────────────────────────────────────────────────────────────
create table if not exists public.reviews (
  id          uuid primary key default uuid_generate_v4(),

  -- The submitted code (or JSON metadata for GitHub repo reviews).
  code        text not null,

  -- The AI-generated review text (Markdown).
  review      text not null,

  -- Detected programming language, or "github-repo" for full-repo reviews.
  language    text not null default 'javascript',

  -- Nullable: links the review to a Supabase Auth user.
  -- Reviews submitted without auth have user_id = NULL.
  user_id     uuid references auth.users(id) on delete cascade,

  -- Nullable: set for GitHub repo reviews, used for cache lookup.
  repo_url    text,

  created_at  timestamptz not null default now()
);

-- ── Indexes ───────────────────────────────────────────────────────────────────
-- Speed up paginated history fetches per user
create index if not exists reviews_user_id_created_at_idx
  on public.reviews (user_id, created_at desc);

-- Speed up cache lookups for GitHub repo reviews
create index if not exists reviews_repo_url_idx
  on public.reviews (repo_url)
  where repo_url is not null;

-- ── Row Level Security ────────────────────────────────────────────────────────
-- Users can only read their own reviews. The backend uses the service role key
-- (which bypasses RLS) to write reviews, including anonymous ones.

alter table public.reviews enable row level security;

-- Authenticated users can read only their own reviews.
drop policy if exists "Users can read own reviews" on public.reviews;
create policy "Users can read own reviews"
  on public.reviews for select
  using (auth.uid() = user_id);

-- The service role key (backend) can insert any review.
-- This policy is for completeness; the service role bypasses RLS by default.
drop policy if exists "Service role can insert reviews" on public.reviews;
create policy "Service role can insert reviews"
  on public.reviews for insert
  with check (true);
