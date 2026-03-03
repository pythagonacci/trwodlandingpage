# Trak Marketing Landing Page

Production-quality marketing site for Trak: Next.js (App Router), TypeScript, Supabase (Auth + DB), Stripe (checkout), Resend (email). Design matches the Hero Split Option A mockup (Inter + Newsreader, neutral palette).

## Quick start (local)

1. **Install and env**
   ```bash
   npm install
   cp .env.example .env.local
   ```
   Fill in `.env.local` with your values (see [Environment variables](#environment-variables)).

2. **Supabase**
   - Create a project at [supabase.com](https://supabase.com).
   - In SQL Editor, run the contents of `supabase/schema.sql` (creates `marketing_leads`, `billing_customers`, `billing_subscriptions`).
   - Copy Project URL and anon key to `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and Service role key to `SUPABASE_SERVICE_ROLE_KEY`.

3. **Run**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | This marketing site URL (e.g. `https://trak.com`) |
| `NEXT_PUBLIC_APP_URL` | App URL for signup/login (e.g. `https://app.trak.com`) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server only) |
| `RESEND_API_KEY` | Resend API key for sending lead notification emails |
| `LEADS_NOTIFY_EMAIL` | Email that receives contact/demo form submissions |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `STRIPE_PRICE_ID_PRO` | Stripe Price ID for Pro plan (subscription) |
| `STRIPE_PRICE_ID_TEAM` | Stripe Price ID for Team plan (optional) |

## Supabase tables

- **marketing_leads** – Contact and demo form submissions (name, email, company, message, source, utm).
- **billing_customers** – Maps `auth.users.id` to `stripe_customer_id`.
- **billing_subscriptions** – Subscription state from Stripe (subscription id, price, status, period end).

Run `supabase/schema.sql` in the Supabase SQL Editor. RLS is optional; the lead API uses the service role to insert into `marketing_leads`.

## Stripe setup

1. Create Products and Prices in Stripe (e.g. Pro monthly).
2. Set `STRIPE_PRICE_ID_PRO` (and optionally `STRIPE_PRICE_ID_TEAM`) in `.env.local`.
3. **Webhook**  
   - Stripe Dashboard → Developers → Webhooks → Add endpoint.  
   - URL: `https://your-domain.com/api/stripe/webhook`.  
   - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`.  
   - Copy the signing secret to `STRIPE_WEBHOOK_SECRET`.  
4. For logged-in users (app), call `POST /api/stripe/create-checkout-session` with `planId: 'pro'` and `clientReferenceId: userId` (Supabase auth user id) so the webhook can link the subscription to the user.

## Resend setup

1. Sign up at [resend.com](https://resend.com), create an API key, set `RESEND_API_KEY`.
2. Set `LEADS_NOTIFY_EMAIL` to the address that should receive contact/demo submissions.
3. Default “from” is `onboarding@resend.dev`. To use your domain, add and verify it in Resend and change the `from` in `src/app/api/lead/route.ts`.

## Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage (hero split, features, final CTA) |
| `/pricing` | Pricing cards; Free Trial → app signup, Paid → Stripe Checkout |
| `/contact` | Contact form (posts to `/api/lead`, source `contact`) |
| `/demo` | Request demo form (posts to `/api/lead`, source `demo`) |
| `/about` | Simple about page |
| `/privacy`, `/terms`, `/security` | Legal pages |

CTAs:

- **Start Free Trial / Get Started** → `NEXT_PUBLIC_APP_URL/signup`
- **Log in** → `NEXT_PUBLIC_APP_URL/login`
- **Subscribe with Stripe** (pricing) → `POST /api/stripe/create-checkout-session` then redirect to Stripe Checkout
- **Watch Demo** → Opens modal with video (placeholder: `/demos/hero.mp4`)

## Demo assets (placeholders)

- Hero video: `public/demos/hero.mp4`
- Hero poster: `public/demos/hero-poster.jpg`

Add your own files or leave missing; the UI still renders (video will show broken or blank until files exist). A `public/demos/README.txt` can remind you to add them.

## How to deploy

1. **Build**
   ```bash
   npm run build
   ```
2. Set all env vars in your host (Vercel, etc.).
3. Point Stripe webhook to `https://your-domain.com/api/stripe/webhook`.
4. Optional: rate limiting – the lead API uses a simple in-memory rate limit (per IP). For production, use a store (e.g. Redis) or a platform feature (e.g. Vercel edge config / rate limit middleware); see comments in `src/app/api/lead/route.ts`.

## Tech stack

- Next.js 14 (App Router), TypeScript
- Styling: CSS Modules + global CSS (variables from mockup)
- Supabase: `@supabase/supabase-js` (browser client + server admin)
- Stripe: `stripe`, Resend: `resend`, validation: `zod`

No UI framework; plain TSX + CSS. Marketing pages are static where possible; only API routes are dynamic.
