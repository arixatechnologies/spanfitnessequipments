import {
  brands as fallbackBrands,
  categories as fallbackCategories,
  images,
  products as fallbackProducts,
  type Brand,
  type Category,
  type Product,
} from "@/app/data";
import { listLocalRows, type AdminRow } from "@/lib/admin-store";
import { createClient } from "@/lib/supabase/server";

export type PublicGalleryItem = {
  title: string;
  image: string;
  description: string;
  href: string;
};

export type PublicOfferItem = {
  slug: string;
  tag: string;
  title: string;
  text: string;
};

const defaultGalleryItems: PublicGalleryItem[] = [
  { title: "Commercial Gym Setup", image: "/images/gallery/premium-commercial-gym-gallery.png", description: "Complete floor planning", href: "/categories" },
  { title: "Cardio Zone", image: "/images/gallery/cardio-zone-gallery.png", description: "Treadmills, bikes and ellipticals", href: "/categories/cardio-equipment" },
  { title: "Strength Floor", image: "/images/gallery/strength-zone-gallery.png", description: "Racks, benches and machines", href: "/categories/strength-equipment" },
  { title: "Home Gym", image: "/images/gallery/home-gym-gallery.png", description: "Compact fitness corners", href: "/categories/home-gym-equipment" },
  { title: "Functional Training", image: "/images/gallery/functional-training-gallery.png", description: "Turf, ropes and conditioning", href: "/categories/functional-training" },
  { title: "Accessory Wall", image: "/images/gallery/accessories-wall-gallery.png", description: "Everyday essentials organized", href: "/accessories" },
];

const defaultOffers: PublicOfferItem[] = [
  { slug: "complete-gym-setup-consultation", tag: "Project Offer", title: "Complete Gym Setup Consultation", text: "Get a tailored equipment mix and layout guidance for gyms, apartments, hotels and institutions." },
  { slug: "strength-zone-packages", tag: "Bundle Offer", title: "Strength Zone Packages", text: "Enquire about coordinated bench, rack, barbell, plate and dumbbell combinations." },
  { slug: "new-arrival-enquiry-benefits", tag: "New Equipment", title: "New Arrival Enquiry Benefits", text: "Ask about current availability and introductory options on selected new cardio and strength products." },
];

function text(value: unknown, fallback = "") {
  const next = String(value ?? "").trim();
  return next || fallback;
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function list(value: unknown, fallback: string[] = []) {
  if (Array.isArray(value)) return value.map((item) => text(item)).filter(Boolean);
  if (typeof value === "string" && value.trim()) {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed.map((item) => text(item)).filter(Boolean);
    } catch {
      return value.split(/\r?\n|,/).map((item) => item.trim()).filter(Boolean);
    }
  }
  return fallback;
}

function flag(value: unknown, fallback = false) {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return ["true", "1", "yes", "on"].includes(value.toLowerCase());
  if (typeof value === "number") return value === 1;
  return fallback;
}

function isPublished(row: AdminRow) {
  return text(row.status, "published") === "published";
}

async function rows(table: string) {
  const supabase = await createClient();
  if (supabase) {
    const { data, error } = await supabase.from(table).select("*").order("created_at", { ascending: false });
    if (!error && data) return data as AdminRow[];
  }

  return listLocalRows(table);
}

function knownOrder<T extends { slug: string }>(items: T[], fallback: readonly { slug: string }[]) {
  const order = new Map(fallback.map((item, index) => [item.slug, index]));
  return [...items].sort((a, b) => {
    const aIndex = order.get(a.slug) ?? Number.MAX_SAFE_INTEGER;
    const bIndex = order.get(b.slug) ?? Number.MAX_SAFE_INTEGER;
    return aIndex - bIndex || a.slug.localeCompare(b.slug);
  });
}

function categoryFromRow(row: AdminRow): Category {
  const slug = text(row.slug || row.id);
  const fallback = fallbackCategories.find((item) => item.slug === slug);

  return {
    slug,
    name: text(row.name || row.title, fallback?.name || slug),
    tagline: text(row.tagline, fallback?.tagline || "Equipment selected around your space and goals."),
    description: text(row.description, fallback?.description || "Explore reliable fitness equipment options for your setup."),
    image: text(row.image_url || row.image, fallback?.image || images.setup),
    features: list(row.features, fallback?.features || ["Equipment guidance", "Home and commercial options", "Setup support", "Enquiry assistance"]),
  };
}

function productFromRow(row: AdminRow): Product {
  const slug = text(row.slug || row.id);
  const fallback = fallbackProducts.find((item) => item.slug === slug);
  const category = text(row.category_id || row.category, fallback?.category || "");
  const brand = text(row.brand_id || row.brand, fallback?.brand || "span-fitness");
  const short = text(row.short_description || row.short || row.description, fallback?.short || "Fitness equipment available on enquiry.");
  const description = text(row.full_description || row.description, fallback?.description || short);

  return {
    slug,
    name: text(row.name || row.title, fallback?.name || slug),
    category,
    brand,
    image: text(row.image_url || row.image, fallback?.image || images.setup),
    short,
    description,
    features: list(row.features, fallback?.features || ["Current availability on enquiry", "Suitable for planned fitness spaces", "Product guidance available", "Delivery and setup support"]),
    isNew: flag(row.is_new_arrival, Boolean(fallback?.isNew)),
    accessory: flag(row.is_accessory, Boolean(fallback?.accessory)),
  };
}

function brandFromRow(row: AdminRow): Brand {
  const slug = text(row.slug || row.id || slugify(text(row.name || row.title, "")));
  const fallback = fallbackBrands.find((item) => item.slug === slug);
  const name = text(row.name || row.title, fallback?.name || slug);
  const summary = text(row.summary || row.description, fallback?.summary || "Premium fitness equipment brand options.");

  return {
    slug,
    name,
    summary,
    description: text(row.description, fallback?.description || summary),
    specialties: list(row.specialties, fallback?.specialties || ["Cardio equipment", "Strength equipment", "Fitness accessories"]),
  };
}

function galleryFromRow(row: AdminRow): PublicGalleryItem {
  const title = text(row.title || row.name || row.file_name, "Fitness Equipment Gallery");

  return {
    title,
    image: text(row.image_url || row.public_url || row.image, images.gym),
    description: text(row.description || row.alt_text, "Span Fitness equipment setup"),
    href: text(row.href || row.link_url, "/categories"),
  };
}

function offerFromRow(row: AdminRow): PublicOfferItem {
  const title = text(row.title || row.name, "Fitness Equipment Offer");

  return {
    slug: text(row.slug, slugify(title)),
    tag: text(row.tag || row.label, "Current Offer"),
    title,
    text: text(row.description || row.text || row.summary, "Contact Span Fitness Equipments for current offer details."),
  };
}

export async function getPublicCategories() {
  const items = (await rows("product_categories")).filter(isPublished).map(categoryFromRow);
  return knownOrder(items, fallbackCategories);
}

export async function getPublicCategoryBySlug(slug: string) {
  return (await getPublicCategories()).find((item) => item.slug === slug);
}

export async function getPublicProducts() {
  const items = (await rows("products")).filter(isPublished).map(productFromRow);
  return knownOrder(items, fallbackProducts);
}

export async function getPublicProductBySlug(slug: string) {
  return (await getPublicProducts()).find((item) => item.slug === slug);
}

export async function getPublicBrands() {
  const items = (await rows("brands")).filter(isPublished).map(brandFromRow);
  return knownOrder(items, fallbackBrands);
}

export async function getPublicGalleryItems() {
  const items = (await rows("gallery_items")).filter(isPublished).map(galleryFromRow);
  return items.length ? items : defaultGalleryItems;
}

export async function getPublicOffers() {
  const items = (await rows("offers")).filter(isPublished).map(offerFromRow);
  return items.length ? items : defaultOffers;
}

export async function getPublicHomeContent() {
  const [categories, products, brands, galleryItems] = await Promise.all([
    getPublicCategories(),
    getPublicProducts(),
    getPublicBrands(),
    getPublicGalleryItems(),
  ]);

  return { categories, products, brands, galleryItems };
}
