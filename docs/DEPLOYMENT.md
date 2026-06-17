# Deployment

## Vercel And Supabase

Create the Supabase project, run the migration and seed files, then configure every variable from `.env.example` in Vercel. Use separate Supabase projects for staging and production.

Connect the production domain in Vercel and follow its DNS instructions. Vercel automatically issues SSL/TLS certificates and redirects HTTP traffic to HTTPS. Set `NEXT_PUBLIC_SITE_URL` to the exact canonical HTTPS origin and redeploy.

Before launch, verify `/`, `/contact`, `/blog`, a product page, `/sitemap.xml`, `/robots.txt`, `/llms.txt`, and `/feed.xml`. Submit a test enquiry and confirm the database row and optional email.

## Hostinger VPS

Install a supported Node.js LTS release, Nginx, Git, and PM2. Clone the repository, configure environment variables, run `npm ci && npm run build`, and start the app through PM2.

Configure Nginx as a reverse proxy to `127.0.0.1:3000`, pass proxy headers, and limit request body size to the intended upload limit. Use Certbot with the Nginx integration to obtain a Let's Encrypt certificate, enable renewal, and redirect all HTTP requests to HTTPS.

Keep Supabase managed services initially. If migrating away later, export PostgreSQL data, implement replacement authentication and object storage, rotate all secrets, and test RLS-equivalent authorization before DNS cutover.

Use zero-downtime PM2 reloads, database backups, uptime monitoring, and a staging deployment for production changes.
