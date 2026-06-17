import { notFound } from "next/navigation";
import { CollectionPage } from "@/components/admin/collection-page";
import { requireAdmin } from "@/lib/auth";

const sections: Record<string, { title: string; table: string; createHref?: string }> = {
  products: { title: "Products", table: "products", createHref: "/admin/products/new" },
  categories: { title: "Product Categories", table: "product_categories" },
  brands: { title: "Brands", table: "brands" },
  accessories: { title: "Accessories", table: "accessories" },
  offers: { title: "Offers", table: "offers" },
  gallery: { title: "Gallery", table: "gallery_items" },
  faqs: { title: "FAQs", table: "faqs" },
  testimonials: { title: "Testimonials", table: "testimonials" },
  leads: { title: "Contact Leads", table: "contact_leads" },
  media: { title: "Media Assets", table: "media_assets", createHref: "/admin/media/upload" },
  settings: { title: "Site Settings", table: "site_settings" },
  seo: { title: "SEO Settings", table: "seo_settings" }
};

export default async function AdminSectionPage({ params, searchParams }: { params: Promise<{ section: string }>; searchParams: Promise<{ q?: string; status?: string }> }) {
  await requireAdmin();
  const { section } = await params;
  const config = sections[section];
  if (!config) notFound();
  const { q = "", status = "" } = await searchParams;
  return <CollectionPage {...config} path={`/admin/${section}`} search={q} status={status} />;
}
