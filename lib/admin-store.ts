import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { brands, business, categories, products } from "@/app/data";

export type AdminRow = Record<string, unknown> & {
  id: string;
  created_at: string;
  updated_at?: string;
  status?: string;
  slug?: string;
  name?: string;
  title?: string;
};

type AdminDatabase = Record<string, AdminRow[]>;

const dataDir = path.join(process.cwd(), ".data");
const dataFile = path.join(dataDir, "admin-store.json");
let memoryDatabase: AdminDatabase | null = null;

const tableNames = [
  "products",
  "product_categories",
  "brands",
  "accessories",
  "offers",
  "gallery_items",
  "blog_posts",
  "blog_categories",
  "blog_tags",
  "faqs",
  "testimonials",
  "contact_leads",
  "media_assets",
  "site_settings",
  "seo_settings",
] as const;

function now() {
  return new Date().toISOString();
}

function row(values: Omit<AdminRow, "id" | "created_at"> & { id?: string; created_at?: string }): AdminRow {
  const date = now();
  return {
    id: values.id || crypto.randomUUID(),
    created_at: values.created_at || date,
    updated_at: date,
    ...values,
  };
}

function defaultDatabase(): AdminDatabase {
  const categoryRows = categories.map((item) => row({
    id: item.slug,
    name: item.name,
    slug: item.slug,
    tagline: item.tagline,
    description: item.description,
    image_url: item.image,
    features: item.features,
    status: "published",
  }));

  const brandRows = brands.map((item) => row({
    id: item.slug,
    name: item.name,
    slug: item.slug,
    summary: item.summary,
    description: item.description,
    specialties: item.specialties,
    status: "published",
  }));

  const productRows = products.map((item) => row({
    id: item.slug,
    name: item.name,
    slug: item.slug,
    category_id: item.category,
    brand_id: item.brand,
    image_url: item.image,
    image_alt: item.name,
    short_description: item.short,
    full_description: item.description,
    features: item.features,
    status: "published",
    seo_title: item.name,
    seo_description: item.short,
    is_new_arrival: Boolean(item.isNew),
    is_featured: false,
    is_accessory: Boolean(item.accessory),
  }));

  return {
    products: productRows,
    product_categories: categoryRows,
    brands: brandRows,
    accessories: [],
    offers: [],
    gallery_items: [],
    blog_posts: [
      row({
        title: "Welcome to Span Fitness Equipments",
        slug: "welcome-to-span-fitness-equipments",
        excerpt: "Use the admin panel to create product updates, buying guides and gym setup articles.",
        content: "This starter post confirms that the local admin content store is working. Replace it with your own blog content from the admin panel.",
        author: business.name,
        status: "draft",
        meta_title: "Welcome to Span Fitness Equipments",
        meta_description: "Use the Span Fitness admin panel to manage website blog content.",
        published_at: null,
      }),
    ],
    blog_categories: [],
    blog_tags: [],
    faqs: [],
    testimonials: [],
    contact_leads: [],
    media_assets: [],
    site_settings: [
      row({ setting_key: "business_email", value: business.email }),
      row({ setting_key: "business_phone", value: business.phone }),
    ],
    seo_settings: [],
  };
}

function migrateSeededRows(database: AdminDatabase) {
  let changed = false;
  const productDefaults = new Map(products.map((item) => [item.slug, item]));
  const categoryDefaults = new Map(categories.map((item) => [item.slug, item]));
  const brandDefaults = new Map(brands.map((item) => [item.slug, item]));

  database.products = (database.products || []).map((item) => {
    const fallback = productDefaults.get(String(item.slug || item.id));
    if (!fallback) return item;

    const next = { ...item };
    if (!next.features) {
      next.features = fallback.features;
      changed = true;
    }
    if (!next.image_url) {
      next.image_url = fallback.image;
      changed = true;
    }
    if (next.updated_at === next.created_at) {
      if (next.is_new_arrival !== Boolean(fallback.isNew)) {
        next.is_new_arrival = Boolean(fallback.isNew);
        changed = true;
      }
      if (next.is_accessory !== Boolean(fallback.accessory)) {
        next.is_accessory = Boolean(fallback.accessory);
        changed = true;
      }
    }
    return next;
  });

  database.product_categories = (database.product_categories || []).map((item) => {
    const fallback = categoryDefaults.get(String(item.slug || item.id));
    if (!fallback) return item;

    const next = { ...item };
    if (!next.tagline) {
      next.tagline = fallback.tagline;
      changed = true;
    }
    if (!next.image_url) {
      next.image_url = fallback.image;
      changed = true;
    }
    if (!next.features) {
      next.features = fallback.features;
      changed = true;
    }
    return next;
  });

  database.brands = (database.brands || []).map((item) => {
    const fallback = brandDefaults.get(String(item.slug || item.id));
    if (!fallback) return item;

    const next = { ...item };
    if (!next.summary) {
      next.summary = fallback.summary;
      changed = true;
    }
    if (!next.description) {
      next.description = fallback.description;
      changed = true;
    }
    if (!next.specialties) {
      next.specialties = fallback.specialties;
      changed = true;
    }
    return next;
  });

  return changed;
}

async function readDatabase(): Promise<AdminDatabase> {
  try {
    const raw = await readFile(dataFile, "utf8");
    const parsed = JSON.parse(raw.replace(/^\uFEFF/, "")) as AdminDatabase;
    for (const table of tableNames) parsed[table] ||= [];
    if (migrateSeededRows(parsed)) await writeDatabase(parsed);
    memoryDatabase = parsed;
    return parsed;
  } catch {
    memoryDatabase ||= defaultDatabase();
    for (const table of tableNames) memoryDatabase[table] ||= [];
    return memoryDatabase;
  }
}

async function writeDatabase(database: AdminDatabase) {
  memoryDatabase = database;
  try {
    await mkdir(dataDir, { recursive: true });
    await writeFile(dataFile, `${JSON.stringify(database, null, 2)}\n`, "utf8");
  } catch {
    // Vercel/serverless filesystems are read-only. Keep local fallback data in memory
    // so public pages render instead of failing when Supabase is not configured.
  }
}

function getSearchField(table: string) {
  if (["offers", "gallery_items", "blog_posts"].includes(table)) return "title";
  if (table === "faqs") return "question";
  if (table === "media_assets") return "file_name";
  if (table === "site_settings") return "setting_key";
  if (table === "seo_settings") return "page_path";
  return "name";
}

export async function listLocalRows(table: string, options: { search?: string; status?: string; limit?: number } = {}) {
  const database = await readDatabase();
  let rows = [...(database[table] || [])];
  if (options.search) {
    const field = getSearchField(table);
    const query = options.search.toLowerCase();
    rows = rows.filter((item) => String(item[field] || "").toLowerCase().includes(query));
  }
  if (options.status) rows = rows.filter((item) => item.status === options.status);
  rows.sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)));
  return rows.slice(0, options.limit || 100);
}

export async function countLocalRows(table: string, status?: string) {
  const rows = await listLocalRows(table, { status });
  return rows.length;
}

export async function getLocalRow(table: string, id: string) {
  const database = await readDatabase();
  return (database[table] || []).find((item) => item.id === id) || null;
}

export async function insertLocalRow(table: string, values: Record<string, unknown>) {
  const database = await readDatabase();
  const next = row(values as Omit<AdminRow, "id" | "created_at">);
  database[table] = [next, ...(database[table] || [])];
  await writeDatabase(database);
  return next;
}

export async function updateLocalRow(table: string, id: string, values: Record<string, unknown>) {
  const database = await readDatabase();
  const rows = database[table] || [];
  const index = rows.findIndex((item) => item.id === id);
  if (index === -1) throw new Error("Record not found.");
  rows[index] = { ...rows[index], ...values, updated_at: now() };
  database[table] = rows;
  await writeDatabase(database);
  return rows[index];
}

export async function upsertLocalRow(table: string, matchField: string, values: Record<string, unknown>) {
  const database = await readDatabase();
  const rows = database[table] || [];
  const index = rows.findIndex((item) => item[matchField] === values[matchField]);
  if (index === -1) {
    const next = row(values as Omit<AdminRow, "id" | "created_at">);
    database[table] = [next, ...rows];
    await writeDatabase(database);
    return next;
  }
  rows[index] = { ...rows[index], ...values, updated_at: now() };
  database[table] = rows;
  await writeDatabase(database);
  return rows[index];
}

export async function deleteLocalRow(table: string, id: string) {
  const database = await readDatabase();
  database[table] = (database[table] || []).filter((item) => item.id !== id);
  await writeDatabase(database);
}
