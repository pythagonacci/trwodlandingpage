-- Trak Marketing + Billing schema
-- Run this in Supabase SQL Editor. auth.users is managed by Supabase Auth.

-- Marketing leads (contact + demo forms)
create table if not exists public.marketing_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text,
  email text not null,
  company text,
  website text,
  message text,
  source text not null,
  utm jsonb
);

create index if not exists idx_marketing_leads_email on public.marketing_leads (email);
create index if not exists idx_marketing_leads_created_at on public.marketing_leads (created_at desc);
create index if not exists idx_marketing_leads_source on public.marketing_leads (source);

-- Billing: map Supabase auth user to Stripe customer
create table if not exists public.billing_customers (
  user_id uuid primary key references auth.users (id) on delete cascade,
  stripe_customer_id text unique not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_billing_customers_stripe on public.billing_customers (stripe_customer_id);

-- Billing: subscription state synced from Stripe webhooks
create table if not exists public.billing_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  stripe_customer_id text not null,
  stripe_subscription_id text unique,
  stripe_price_id text,
  status text not null,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_billing_subscriptions_user on public.billing_subscriptions (user_id);
create index if not exists idx_billing_subscriptions_stripe_sub on public.billing_subscriptions (stripe_subscription_id);

-- Optional: RLS (enable if you want to restrict access)
-- alter table public.marketing_leads enable row level security;
-- alter table public.billing_customers enable row level security;
-- alter table public.billing_subscriptions enable row level security;
-- Then create policies as needed. For marketing_leads, only service role should insert.
