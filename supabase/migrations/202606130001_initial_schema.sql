create extension if not exists "pgcrypto";

create type public.content_status as enum ('draft', 'published', 'archived');
create type public.lead_status as enum ('new', 'contacted', 'qualified', 'closed', 'spam');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'editor' check (role in ('admin', 'editor')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.site_settings (
  id uuid primary key default gen_random_uuid(),
  setting_key text unique not null,
  setting_value jsonb not null default '{}'::jsonb,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.product_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  image_url text,
  image_alt text,
  status public.content_status not null default 'draft',
  featured boolean not null default false,
  sort_order integer not null default 0,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  logo_url text,
  image_alt text,
  specialties jsonb not null default '[]'::jsonb,
  status public.content_status not null default 'draft',
  featured boolean not null default false,
  sort_order integer not null default 0,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  category_id uuid references public.product_categories(id) on delete set null,
  brand_id uuid references public.brands(id) on delete set null,
  short_description text,
  full_description text,
  features jsonb not null default '[]'::jsonb,
  specifications jsonb not null default '{}'::jsonb,
  image_url text,
  image_alt text,
  is_new_arrival boolean not null default false,
  is_featured boolean not null default false,
  is_accessory boolean not null default false,
  status public.content_status not null default 'draft',
  sort_order integer not null default 0,
  seo_title text,
  seo_description text,
  canonical_url text,
  og_title text,
  og_description text,
  og_image text,
  noindex boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  image_url text not null,
  image_alt text,
  is_primary boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.accessories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  image_url text,
  image_alt text,
  status public.content_status not null default 'draft',
  featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.offers (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text,
  terms text,
  image_url text,
  image_alt text,
  starts_at timestamptz,
  ends_at timestamptz,
  status public.content_status not null default 'draft',
  featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text,
  image_url text not null,
  image_alt text not null,
  category text,
  status public.content_status not null default 'draft',
  featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.blog_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  status public.content_status not null default 'published',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.blog_tags (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text not null,
  category_id uuid references public.blog_categories(id) on delete set null,
  author text not null default 'Span Fitness Equipments',
  featured_image text,
  featured_image_alt text,
  meta_title text,
  meta_description text,
  canonical_url text,
  og_title text,
  og_description text,
  og_image text,
  noindex boolean not null default false,
  faqs jsonb not null default '[]'::jsonb,
  status public.content_status not null default 'draft',
  featured boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.blog_post_tags (
  post_id uuid not null references public.blog_posts(id) on delete cascade,
  tag_id uuid not null references public.blog_tags(id) on delete cascade,
  primary key (post_id, tag_id)
);

create table public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  page_path text,
  status public.content_status not null default 'published',
  featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  location text,
  quote text not null,
  rating smallint check (rating between 1 and 5),
  image_url text,
  status public.content_status not null default 'draft',
  featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.contact_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  requirement text not null,
  product_id uuid references public.products(id) on delete set null,
  message text,
  source_page text,
  status public.lead_status not null default 'new',
  ip_hash text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  file_name text not null,
  storage_path text unique not null,
  public_url text,
  mime_type text,
  size_bytes bigint,
  width integer,
  height integer,
  alt_text text,
  title text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.seo_settings (
  id uuid primary key default gen_random_uuid(),
  page_path text unique not null,
  title text,
  description text,
  canonical_url text,
  og_title text,
  og_description text,
  og_image text,
  noindex boolean not null default false,
  schema_json jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index products_status_idx on public.products(status);
create index products_category_idx on public.products(category_id);
create index products_brand_idx on public.products(brand_id);
create index products_created_idx on public.products(created_at desc);
create index blog_posts_status_idx on public.blog_posts(status);
create index blog_posts_category_idx on public.blog_posts(category_id);
create index blog_posts_published_idx on public.blog_posts(published_at desc);
create index contact_leads_status_idx on public.contact_leads(status);
create index contact_leads_created_idx on public.contact_leads(created_at desc);
create index gallery_status_idx on public.gallery_items(status);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare table_name text;
begin
  foreach table_name in array array[
    'profiles','site_settings','product_categories','brands','products','product_images',
    'accessories','offers','gallery_items','blog_categories','blog_tags','blog_posts',
    'faqs','testimonials','contact_leads','media_assets','seo_settings'
  ]
  loop
    execute format('create trigger set_%I_updated_at before update on public.%I for each row execute function public.set_updated_at()', table_name, table_name);
  end loop;
end $$;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists(select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

alter table public.profiles enable row level security;
alter table public.site_settings enable row level security;
alter table public.product_categories enable row level security;
alter table public.brands enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.accessories enable row level security;
alter table public.offers enable row level security;
alter table public.gallery_items enable row level security;
alter table public.blog_categories enable row level security;
alter table public.blog_tags enable row level security;
alter table public.blog_posts enable row level security;
alter table public.blog_post_tags enable row level security;
alter table public.faqs enable row level security;
alter table public.testimonials enable row level security;
alter table public.contact_leads enable row level security;
alter table public.media_assets enable row level security;
alter table public.seo_settings enable row level security;

create policy "published categories are public" on public.product_categories for select using (status = 'published' or public.is_admin());
create policy "published brands are public" on public.brands for select using (status = 'published' or public.is_admin());
create policy "published products are public" on public.products for select using (status = 'published' or public.is_admin());
create policy "published product images are public" on public.product_images for select using (exists(select 1 from public.products p where p.id = product_id and p.status = 'published') or public.is_admin());
create policy "published accessories are public" on public.accessories for select using (status = 'published' or public.is_admin());
create policy "published offers are public" on public.offers for select using (status = 'published' or public.is_admin());
create policy "published gallery is public" on public.gallery_items for select using (status = 'published' or public.is_admin());
create policy "published blog categories are public" on public.blog_categories for select using (status = 'published' or public.is_admin());
create policy "blog tags are public" on public.blog_tags for select using (true);
create policy "published blog posts are public" on public.blog_posts for select using (status = 'published' or public.is_admin());
create policy "published post tags are public" on public.blog_post_tags for select using (exists(select 1 from public.blog_posts p where p.id = post_id and p.status = 'published') or public.is_admin());
create policy "published faqs are public" on public.faqs for select using (status = 'published' or public.is_admin());
create policy "published testimonials are public" on public.testimonials for select using (status = 'published' or public.is_admin());
create policy "public can submit leads" on public.contact_leads for insert with check (status = 'new');
create policy "admins manage profiles" on public.profiles for all using (public.is_admin()) with check (public.is_admin());

do $$
declare table_name text;
begin
  foreach table_name in array array[
    'site_settings','product_categories','brands','products','product_images','accessories',
    'offers','gallery_items','blog_categories','blog_tags','blog_posts','blog_post_tags',
    'faqs','testimonials','contact_leads','media_assets','seo_settings'
  ]
  loop
    execute format('create policy "admins manage %1$s" on public.%1$I for all using (public.is_admin()) with check (public.is_admin())', table_name);
  end loop;
end $$;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('media', 'media', true, 5242880, array['image/jpeg','image/png','image/webp','image/svg+xml'])
on conflict (id) do nothing;

create policy "public reads media" on storage.objects for select using (bucket_id = 'media');
create policy "admins upload media" on storage.objects for insert with check (bucket_id = 'media' and public.is_admin());
create policy "admins update media" on storage.objects for update using (bucket_id = 'media' and public.is_admin());
create policy "admins delete media" on storage.objects for delete using (bucket_id = 'media' and public.is_admin());
