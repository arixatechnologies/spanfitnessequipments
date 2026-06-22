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

export type PublicTestimonialItem = {
  name: string;
  role: string;
  quote: string;
  location: string;
};

const defaultGalleryItems: PublicGalleryItem[] = [
  { title: "Showroom Cardio Floor", image: "/images/gallery/gallery1.jpg", description: "Live equipment display", href: "/gym-fitness/cardio" },
  { title: "Cardio Equipment Display", image: "/images/gallery/gallery2.jpg", description: "Showroom equipment zone", href: "/gym-fitness/cardio" },
  { title: "Customer Guidance", image: "/images/gallery/gallery3.jpg", description: "Expert buying support", href: "/about" },
  { title: "Store Launch Moments", image: "/images/gallery/gallery4.jpg", description: "Span Fitness showroom", href: "/about" },
  { title: "Span Fitness Team", image: "/images/gallery/gallery5.jpg", description: "People and service", href: "/contact" },
  { title: "Showroom Team", image: "/images/gallery/gallery6.jpg", description: "Trusted support team", href: "/contact" },
  { title: "Partner Celebration", image: "/images/gallery/gallery7.jpg", description: "Brand relationships", href: "/about" },
  { title: "Equipment Consultation", image: "/images/gallery/gallery8.jpg", description: "Planning and guidance", href: "/contact" },
  { title: "Gallery Moments", image: "/images/gallery/gallery9.jpg", description: "Showroom highlights", href: "/contact" },
  { title: "Showroom Gallery", image: "/images/gallery/gallery10.jpg", description: "Span Fitness showroom", href: "/about" },
];

const defaultOffers: PublicOfferItem[] = [
  { slug: "complete-gym-setup-consultation", tag: "Project Offer", title: "Complete Gym Setup Consultation", text: "Get a tailored equipment mix and layout guidance for gyms, apartments, hotels and institutions." },
  { slug: "strength-zone-packages", tag: "Bundle Offer", title: "Strength Zone Packages", text: "Enquire about coordinated bench, rack, barbell, plate and dumbbell combinations." },
  { slug: "new-arrival-enquiry-benefits", tag: "New Equipment", title: "New Arrival Enquiry Benefits", text: "Ask about current availability and introductory options on selected new cardio and strength products." },
  { slug: "cardio-floor-upgrade", tag: "Cardio Value", title: "Cardio Floor Upgrade", text: "Shortlist treadmills, bikes, ellipticals and rowers together for a smoother cardio zone upgrade." },
  { slug: "home-gym-starter-plan", tag: "Home Fitness", title: "Home Gym Starter Plan", text: "Build a practical home workout space with compact cardio, bench, dumbbells and essential accessories." },
  { slug: "multi-play-station-support", tag: "Commercial Setup", title: "Multi Play Station Support", text: "Plan multi-user strength stations for busy gym floors with space, usage and durability guidance." },
  { slug: "accessory-add-on-pack", tag: "Add-On Offer", title: "Accessory Add-On Pack", text: "Add mats, belts, bands, plates, gloves and training essentials while finalizing your equipment list." },
  { slug: "service-installation-guidance", tag: "Support", title: "Service & Installation Guidance", text: "Coordinate delivery, placement and after-sales support discussions for selected equipment purchases." },
];

const defaultTestimonials: PublicTestimonialItem[] = [
  { name: "Commercial Gym Owner", role: "Gym Setup Customer", quote: "Span Fitness helped us compare cardio and strength equipment clearly, so our gym floor felt planned instead of crowded.", location: "Visakhapatnam" },
  { name: "Home Fitness Buyer", role: "Home Gym Customer", quote: "The team suggested practical equipment for our room size and budget. The guidance made choosing a treadmill and accessories much easier.", location: "Andhra Pradesh" },
  { name: "Apartment Fitness Committee", role: "Residential Gym Setup", quote: "We received a focused equipment mix for shared use, including strength, cardio and free-weight options that matched our space.", location: "Telangana" },
];

const legacyCategoryImageMap = new Map([
  ["/images/categories/cardio-equipment-premium.png", "/images/new-arrivals/performance-treadmill-x7-new-arrival.png"],
  ["/images/categories/strength-equipment-premium.png", "/images/new-arrivals/heavy-duty-multi-gym-new-arrival.png"],
  ["/images/categories/commercial-gym-setup-premium.png", "/images/gallery/premium-commercial-gym-gallery.png"],
  ["/images/categories/home-gym-equipment-premium.png", "/images/gallery/home-gym-gallery.png"],
  ["/images/categories/functional-training-premium.png", "/images/gallery/functional-training-gallery.png"],
  ["/images/categories/fitness-accessories-premium.png", "/images/gallery/accessories-wall-gallery.png"],
]);

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
  const rawImage = text(row.image_url || row.image, fallback?.image || images.setup);

  return {
    slug,
    name: text(row.name || row.title, fallback?.name || slug),
    tagline: text(row.tagline, fallback?.tagline || "Equipment selected around your space and goals."),
    description: text(row.description, fallback?.description || "Explore reliable fitness equipment options for your setup."),
    image: legacyCategoryImageMap.get(rawImage) || rawImage,
    features: list(row.features, fallback?.features || ["Equipment guidance", "Home and commercial options", "Setup support", "Enquiry assistance"]),
  };
}

function productFromRow(row: AdminRow, categorySlugById = new Map<string, string>(), brandSlugById = new Map<string, string>()): Product {
  const slug = text(row.slug || row.id);
  const fallback = fallbackProducts.find((item) => item.slug === slug);
  const rawCategory = text(row.category_id || row.category, fallback?.category || "");
  const rawBrand = text(row.brand_id || row.brand, fallback?.brand || "span-fitness");
  const category = categorySlugById.get(rawCategory) || rawCategory;
  const brand = brandSlugById.get(rawBrand) || rawBrand;
  const short = text(row.short_description || row.short || row.description, fallback?.short || "Fitness equipment available on enquiry.");
  const description = text(row.full_description || row.description, fallback?.description || short);
  const rawImage = text(row.image_url || row.image, fallback?.image || images.setup);
  const image =
    slug === "resistance-band-kit" ? images.resistanceBand :
    slug === "premium-yoga-mat" ? images.yoga :
    rawImage;

  return {
    slug,
    name: text(row.name || row.title, fallback?.name || slug),
    category,
    brand,
    image,
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

function testimonialFromRow(row: AdminRow): PublicTestimonialItem {
  return {
    name: text(row.name || row.title, "Span Fitness Customer"),
    role: text(row.role || row.designation || row.description, "Fitness Equipment Customer"),
    quote: text(row.quote || row.text || row.description, ""),
    location: text(row.location || row.city, "Span Fitness Service Area"),
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
  const [productRows, categoryRows, brandRows] = await Promise.all([
    rows("products"),
    rows("product_categories"),
    rows("brands"),
  ]);
  const categorySlugById = new Map(categoryRows.map((item) => [text(item.id), text(item.slug || item.id)]));
  const brandSlugById = new Map(brandRows.map((item) => [text(item.id), text(item.slug || item.id)]));
  const items = productRows.filter(isPublished).map((item) => productFromRow(item, categorySlugById, brandSlugById));
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
  if (!items.length) return defaultGalleryItems;
  const hasGalleryTen = items.some((item) => item.image === "/images/gallery/gallery10.jpg");
  return hasGalleryTen ? items.slice(0, 10) : [...items.slice(0, 9), defaultGalleryItems[9]];
}

export async function getPublicOffers() {
  const items = (await rows("offers")).filter(isPublished).map(offerFromRow);
  const savedSlugs = new Set(items.map((item) => item.slug));
  return [...items, ...defaultOffers.filter((item) => !savedSlugs.has(item.slug))].slice(0, 10);
}

export async function getPublicTestimonials() {
  const items = (await rows("testimonials"))
    .filter(isPublished)
    .map(testimonialFromRow)
    .filter((item) => item.quote.length > 8);
  return [...items, ...defaultTestimonials].slice(0, 6);
}

export async function getPublicHomeContent() {
  const [categories, products, brands, galleryItems, testimonials] = await Promise.all([
    getPublicCategories(),
    getPublicProducts(),
    getPublicBrands(),
    getPublicGalleryItems(),
    getPublicTestimonials(),
  ]);

  return { categories, products, brands, galleryItems, testimonials };
}
