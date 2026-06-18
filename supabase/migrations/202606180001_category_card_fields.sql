alter table public.product_categories
  add column if not exists tagline text,
  add column if not exists features jsonb not null default '[]'::jsonb;
