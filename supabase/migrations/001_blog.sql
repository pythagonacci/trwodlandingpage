-- Run this in your Supabase project's SQL editor.
-- After running this migration:
-- 1. Go to Supabase dashboard -> Storage.
-- 2. Create a public bucket named blog-images.
-- 3. Add storage policies allowing public reads and authenticated/service-role writes.

create table posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  content jsonb not null default '{}',
  cover_image_url text,
  excerpt text,
  is_published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger posts_updated_at
  before update on posts
  for each row execute function update_updated_at();

alter table posts enable row level security;

create policy "Public can read published posts"
  on posts for select
  using (is_published = true);

create policy "Service role has full access"
  on posts for all
  using (true)
  with check (true);
