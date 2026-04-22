-- Trak marketing CMS schema.
-- Apply with `supabase db push` or paste into the Supabase SQL editor.

create extension if not exists pgcrypto;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'post_status') then
    create type public.post_status as enum ('draft', 'published');
  end if;
end $$;

create table if not exists public.admin_allowlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now(),
  constraint admin_allowlist_email_lowercase check (email = lower(email))
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  created_at timestamptz not null default now(),
  constraint categories_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null,
  excerpt text,
  category_id uuid not null references public.categories(id) on delete restrict,
  cover_image_url text,
  cover_image_alt text,
  editor_content_json jsonb not null default '{"type":"doc","content":[]}'::jsonb,
  editor_content_html text,
  status public.post_status not null default 'draft',
  published_at timestamptz,
  author_name text,
  seo_title text,
  seo_description text,
  seo_og_image_url text,
  canonical_url text,
  reading_time integer not null default 1,
  featured boolean not null default false,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint posts_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint posts_reading_time_positive check (reading_time >= 1),
  constraint posts_published_at_required check (status = 'draft' or published_at is not null),
  constraint posts_category_slug_unique unique (category_id, slug)
);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  bucket text not null default 'blog-media',
  path text not null unique,
  public_url text not null,
  filename text not null,
  content_type text not null,
  size_bytes bigint not null,
  alt_text text,
  uploaded_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists posts_status_published_at_idx
  on public.posts (status, published_at desc);

create index if not exists posts_category_status_idx
  on public.posts (category_id, status, published_at desc);

create index if not exists posts_featured_idx
  on public.posts (featured, published_at desc)
  where status = 'published';

create index if not exists media_assets_created_at_idx
  on public.media_assets (created_at desc);

create or replace function public.update_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists posts_updated_at on public.posts;
create trigger posts_updated_at
  before update on public.posts
  for each row execute function public.update_updated_at();

create or replace function public.is_admin_user()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_allowlist
    where email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

alter table public.admin_allowlist enable row level security;
alter table public.categories enable row level security;
alter table public.posts enable row level security;
alter table public.media_assets enable row level security;

drop policy if exists "Admins can read allowlist" on public.admin_allowlist;
create policy "Admins can read allowlist"
  on public.admin_allowlist for select
  to authenticated
  using (public.is_admin_user());

drop policy if exists "Users can check own allowlist entry" on public.admin_allowlist;
create policy "Users can check own allowlist entry"
  on public.admin_allowlist for select
  to authenticated
  using (email = lower(coalesce(auth.jwt() ->> 'email', '')));

drop policy if exists "Public can read categories" on public.categories;
create policy "Public can read categories"
  on public.categories for select
  to anon, authenticated
  using (true);

drop policy if exists "Admins can manage categories" on public.categories;
create policy "Admins can manage categories"
  on public.categories for all
  to authenticated
  using (public.is_admin_user())
  with check (public.is_admin_user());

drop policy if exists "Public can read published posts" on public.posts;
create policy "Public can read published posts"
  on public.posts for select
  to anon, authenticated
  using (status = 'published' and published_at <= now());

drop policy if exists "Admins can manage posts" on public.posts;
create policy "Admins can manage posts"
  on public.posts for all
  to authenticated
  using (public.is_admin_user())
  with check (public.is_admin_user());

drop policy if exists "Admins can manage media assets" on public.media_assets;
create policy "Admins can manage media assets"
  on public.media_assets for all
  to authenticated
  using (public.is_admin_user())
  with check (public.is_admin_user());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'blog-media',
  'blog-media',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can read blog media" on storage.objects;
create policy "Public can read blog media"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'blog-media');

drop policy if exists "Admins can upload blog media" on storage.objects;
create policy "Admins can upload blog media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'blog-media' and public.is_admin_user());

drop policy if exists "Admins can update blog media" on storage.objects;
create policy "Admins can update blog media"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'blog-media' and public.is_admin_user())
  with check (bucket_id = 'blog-media' and public.is_admin_user());

drop policy if exists "Admins can delete blog media" on storage.objects;
create policy "Admins can delete blog media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'blog-media' and public.is_admin_user());

insert into public.categories (name, slug, description)
values
  ('Strategy', 'strategy', 'Launch teardowns, brand operating models, and growth essays.'),
  ('Product', 'product', 'Product workflows, workspace systems, and operating ideas.'),
  ('Operations', 'operations', 'How modern teams plan, approve, and ship brand work.')
on conflict (slug) do nothing;
