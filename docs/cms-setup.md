# Trak Marketing CMS

## Architecture

- Public routes live under `/blog`, `/blog/[category]`, and `/blog/[category]/[slug]`.
- Studio routes live under `/studio`, `/studio/posts`, `/studio/posts/new`, `/studio/posts/[id]`, and `/studio/media`.
- Supabase Auth is used for sign-in. Studio access is only granted when the signed-in user's lowercase email exists in `admin_allowlist`.
- Studio route protection is enforced in `middleware.ts` for sessions and in `app/(studio)/studio/layout.tsx` for admin allowlist checks.
- Studio writes and uploads use the authenticated user's Supabase session with the publishable key, so RLS policies are exercised.
- Public blog reads use the publishable Supabase client without a user session and only query `status = 'published'` posts.

## Environment Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SECRET_KEY=
NEXT_PUBLIC_SITE_URL=https://sariasoftware.com
```

Use the new Supabase API keys: `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` should be the `sb_publishable_...` key. `SUPABASE_SECRET_KEY` should be the `sb_secret_...` key and must stay server-only. The CMS does not use the secret key for normal Studio writes because secret keys bypass RLS; it is reserved for future server-only maintenance jobs if needed.

`NEXT_PUBLIC_SITE_URL` is used for auth email redirects when the request origin is unavailable. The public site canonical base currently comes from `app/seo.ts`.

## Supabase Setup

1. Create a Supabase project.
2. Apply `supabase/migrations/20260421000000_trak_blog_cms.sql`.
3. Insert at least one admin:

```sql
insert into public.admin_allowlist (email)
values ('admin@example.com')
on conflict (email) do nothing;
```

4. In Supabase Auth, enable email magic links.
5. Add the deployed domain and local development URL to Auth redirect URLs, including `/studio/auth/callback`.
6. Confirm the `blog-media` public storage bucket exists. The migration creates it and applies public read plus admin-only write policies.

## Editor Serialization

The editor stores canonical content as Tiptap/ProseMirror JSON in `posts.editor_content_json`. `editor_content_html` exists for future render caching, but public rendering currently uses the JSON directly through `components/blog/ArticleBody.tsx`.

This keeps content structured, lets future nodes be added without reparsing HTML, and avoids trusting arbitrary editor HTML on public pages.

## Wrapped Image Representation

Body images are custom Tiptap `blogImage` nodes:

```json
{
  "type": "blogImage",
  "attrs": {
    "src": "https://...",
    "alt": "Launch calendar screenshot",
    "caption": "Optional caption",
    "layout": "float-right"
  }
}
```

Supported `layout` values are `center`, `wide`, `float-left`, and `float-right`. The editor uses the same values for authoring controls, and the public renderer maps them to CSS selectors in `components/blog/article-content.module.css`. `float-left` and `float-right` use real CSS floats on desktop, so long-form text wraps naturally around the media; mobile resets them to full-width blocks.

## Route Map

- `/blog`: published blog index.
- `/blog/[category]`: published posts filtered by category slug.
- `/blog/[category]/[slug]`: published article page with metadata and JSON-LD.
- `/studio/login`: magic-link sign-in.
- `/studio`: redirects to posts.
- `/studio/posts`: post list.
- `/studio/posts/new`: new post editor.
- `/studio/posts/[id]`: edit existing post.
- `/studio/media`: recent uploaded blog assets.
- `/api/studio/upload`: authenticated admin image upload endpoint.

## Publishing Rules

- `Save draft` writes `status = 'draft'` and clears `published_at`.
- `Publish` writes `status = 'published'` and sets `published_at` immediately.
- Public routes and RLS only expose posts where `status = 'published'` and `published_at <= now()`.
- Unpublishing is handled by saving a published post back to draft.
