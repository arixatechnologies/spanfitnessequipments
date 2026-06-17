# Security

- Admin routes require a valid Supabase session and an `admin` profile role.
- Database Row Level Security restricts public reads to published content and public writes to new leads.
- Service role credentials are server-only.
- Lead forms use Zod validation, a honeypot, IP hashing, and basic application-level throttling.
- Media uploads validate MIME type and a 5 MB limit; Supabase Storage policies restrict writes to admins.
- Response headers include HSTS, frame denial, MIME sniffing protection, referrer controls, and permissions restrictions.

Use HTTPS for every production environment. Vercel manages TLS automatically. On a VPS, use Nginx and Let's Encrypt, renew certificates automatically, and force HTTP-to-HTTPS redirects.

Rotate exposed credentials immediately. Restrict dashboard access, enable MFA for Supabase administrators, review Auth logs, back up the database, and avoid logging form content or secrets.

Application memory rate limiting is intentionally basic and per-instance. High-volume deployments should move throttling to a shared provider such as Vercel Firewall, Upstash Redis, or an edge gateway.

A strict Content Security Policy should be introduced after final analytics, map, font, and image domains are known; deploying an inaccurate CSP would break legitimate production resources.
