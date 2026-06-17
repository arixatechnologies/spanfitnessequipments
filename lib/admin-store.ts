import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { business, categories, products } from "@/app/data";

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
    description: item.description,
    status: "published",
  }));

  const brandRows = [
    "Welcare",
    "Hercules Fitness",
    "Reebok",
    "FIRM",
    "Accuniq",
  ].map((name) => row({
    id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    name,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
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
    status: "published",
    seo_title: item.name,
    seo_description: item.short,
    is_new_arrival: false,
    is_featured: false,
    is_accessory: item.category === "fitness-accessories",
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

async function ensureDatabase() {
  await mkdir(dataDir, { recursive: true });
  try {
    await readFile(dataFile, "utf8");
  } catch {
    await writeDatabase(defaultDatabase());
  }
}

async function readDatabase(): Promise<AdminDatabase> {
  await ensureDatabase();
  const raw = await readFile(dataFile, "utf8");
  const parsed = JSON.parse(raw) as AdminDatabase;
  for (const table of tableNames) parsed[table] ||= [];
  return parsed;
}

async function writeDatabase(database: AdminDatabase) {
  await mkdir(dataDir, { recursive: true });
  await writeFile(dataFile, `${JSON.stringify(database, null, 2)}\n`, "utf8");
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
