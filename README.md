# Span Fitness Equipments

Production-oriented Next.js website and custom CMS for Span Fitness Equipments, Visakhapatnam.

## Features

- Multi-page product, category, brand, gallery, offer, contact, and blog website
- Supabase PostgreSQL schema, Row Level Security, Auth, and Storage
- Protected custom admin panel for catalog, content, leads, media, settings, and SEO
- Validated lead forms with honeypot, basic rate limiting, database storage, and optional Resend notification
- Dynamic blog with search, filters, metadata, JSON-LD, RSS, sitemap, robots.txt, and llms.txt
- Local image asset structure, responsive UI, floating WhatsApp, and mobile call actions
- Security headers and deployment documentation

## Tech Stack

- Next.js 16 App Router, React 19, TypeScript
- Tailwind CSS
- Supabase PostgreSQL, Auth, and Storage
- Vercel initially; Node.js/VPS compatible later

## Local Setup

1. Install Node.js 20 or newer.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local`.
4. Add Supabase credentials.
5. Run `npm run dev`.
6. Open `http://localhost:3000`.

Production verification:

```bash
npm run lint
npm run build
npm start
```

## Environment Variables

`NEXT_PUBLIC_SITE_URL` is the canonical website URL. Supabase public credentials are safe for browser use because access is constrained by RLS. `SUPABASE_SERVICE_ROLE_KEY` and `RESEND_API_KEY` are server secrets and must never be exposed in client code.

See `.env.example` for the full list.

## Supabase Setup

1. Create a Supabase project.
2. Open SQL Editor and run `supabase/migrations/202606130001_initial_schema.sql`.
3. Run `supabase/seed.sql`.
4. Add the project URL and anon key to `.env.local`.
5. Add the service role key only to secure server environment variables.
6. Confirm the public `media` Storage bucket was created by the migration.

### Create An Admin User

1. Create a user in Supabase Authentication.
2. Copy the user's UUID.
3. Run:

```sql
insert into public.profiles (id, full_name, role)
values ('AUTH_USER_UUID', 'Administrator', 'admin');
```

4. Sign in at `/admin/login`.

## Admin Usage

- Products: create from `/admin/products/new`; publish, unpublish, search, and delete from the list.
- Categories, brands, accessories, offers, gallery, blog categories, tags, FAQs, and testimonials: create drafts from their list screens and manage status.
- Blog: create and edit posts with content and SEO fields.
- Leads: search and review submissions under `/admin/leads`.
- Media: upload JPG, PNG, WebP, or SVG files up to 5 MB through `/admin/media/upload`.
- Settings and SEO: database-backed management tables are available for structured configuration records.

## Images

Image slots are defined in `src/config/site-assets.ts`. Public assets are grouped under `public/images/` by page and content type. Replace placeholder PNG files with final photography using the same paths, or update the asset mapping.

For production, export photographic assets as WebP or AVIF, preserve useful dimensions, keep the OG image near 1200x630, and update mapped extensions. Always provide descriptive alt text.

## SEO

- Page metadata is centralized through `lib/seo.ts`.
- Organization, LocalBusiness, WebSite, Product, Breadcrumb, BlogPosting, and FAQ structured data are supported.
- `/sitemap.xml` includes public catalog and blog routes.
- `/robots.txt` blocks admin/API crawling.
- `/llms.txt` summarizes business identity and public content.
- `/feed.xml` provides the blog RSS feed.

In Google Search Console, verify the production domain, submit `/sitemap.xml`, inspect important routes, and monitor indexing, Core Web Vitals, canonical conflicts, and 404 reports. Fix crawl errors by restoring intended routes or adding permanent redirects in `next.config.mjs`.

Analytics can be added through a consent-aware Google Analytics, Google Tag Manager, Plausible, or similar integration after IDs and privacy requirements are confirmed.

## Vercel Deployment

1. Push the project to a Git provider.
2. Import it in Vercel.
3. Add all production environment variables.
4. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS domain.
5. Deploy and run the Supabase migrations once.
6. Add the custom domain in Vercel Project Settings, then update DNS as instructed.

Vercel provisions and renews SSL/TLS certificates automatically. HTTPS redirects are automatic for configured domains. Security headers are defined in `next.config.mjs`; HSTS should only be enabled on domains that are fully HTTPS-ready.

## Hostinger VPS Migration

The application can run as a standard Node.js production build:

```bash
npm ci
npm run build
pm2 start npm --name span-fitness -- start
```

Place Nginx in front of port 3000, proxy the domain to the Node process, and use Certbot/Let's Encrypt for TLS. Configure automatic renewal and redirect HTTP to HTTPS. Environment variables should be stored outside the repository with restricted permissions.

Supabase can remain the managed database/auth/storage provider after moving the web server. A later PostgreSQL migration requires exporting data, replacing Supabase Auth/Storage dependencies, and validating equivalent access controls.

See `docs/DEPLOYMENT.md`, `docs/SECURITY.md`, and `docs/SEO.md`.

## Troubleshooting

- Admin redirects to login: verify Auth credentials and the matching `profiles.role = 'admin'` row.
- No database content: verify environment variables, migration execution, and RLS policies.
- Upload fails: confirm the `media` bucket and allowed MIME types.
- Build metadata uses localhost: set `NEXT_PUBLIC_SITE_URL` before building.
- Form email is missing: leads still save to Supabase; configure Resend and verify the sender domain for production email.
