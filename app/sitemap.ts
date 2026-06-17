import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/data";
import { getPublicCategories, getPublicProducts } from "@/lib/public-content";
import { siteConfig } from "@/src/config/site";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, categories, products] = await Promise.all([
    getBlogPosts(),
    getPublicCategories(),
    getPublicProducts(),
  ]);
  const supabase = await createClient();
  const noindexRows = supabase ? (await supabase.from("seo_settings").select("page_path").eq("noindex", true)).data || [] : [];
  const excluded = new Set(noindexRows.map((row) => row.page_path));
  const now = new Date();
  const staticPaths = ["/", "/about", "/categories", "/new-arrivals", "/accessories", "/offers", "/blog", "/contact"];
  return [
    ...staticPaths.map((path) => ({ url: `${siteConfig.url}${path}`, lastModified: now, changeFrequency: path === "/" ? "weekly" as const : "monthly" as const, priority: path === "/" ? 1 : 0.8, images: path === "/" ? [`${siteConfig.url}/hero-storefront-new.png`] : undefined })),
    ...categories.map(({ slug, image }) => ({ url: `${siteConfig.url}/categories/${slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.75, images: [`${siteConfig.url}${image}`] })),
    ...products.map(({ slug, image }) => ({ url: `${siteConfig.url}/products/${slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.75, images: [`${siteConfig.url}${image}`] })),
    ...posts.map(({ slug, updatedAt, featuredImage }) => ({ url: `${siteConfig.url}/blog/${slug}`, lastModified: new Date(updatedAt), changeFrequency: "monthly" as const, priority: 0.7, images: [`${siteConfig.url}${featuredImage}`] }))
  ].filter((entry) => !excluded.has(new URL(entry.url).pathname));
}
