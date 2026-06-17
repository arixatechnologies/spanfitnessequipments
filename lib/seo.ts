import type { Metadata } from "next";
import { siteConfig } from "@/src/config/site";

type SeoInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noindex?: boolean;
  type?: "website" | "article";
  keywords?: string[];
};

export function createMetadata({
  title,
  description,
  path = "/",
  image = "/images/og/span-fitness-equipment-og-image.png",
  noindex = false,
  type = "website",
  keywords = [...siteConfig.keywords]
}: SeoInput): Metadata {
  const canonical = new URL(path, siteConfig.url).toString();
  const imageUrl = new URL(image, siteConfig.url).toString();
  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: { title, description, url: canonical, siteName: siteConfig.name, images: [{ url: imageUrl, width: 1200, height: 630 }], type },
    twitter: { card: "summary_large_image", title, description, images: [imageUrl] }
  };
}

export async function getPageMetadata(input: SeoInput): Promise<Metadata> {
  const pagePath = input.path || "/";
  const { createClient } = await import("./supabase/server");
  const supabase = await createClient();
  if (!supabase) {
    const { listLocalRows } = await import("./admin-store");
    const localSetting = (await listLocalRows("seo_settings")).find((item) => item.page_path === pagePath);
    if (!localSetting) return createMetadata(input);
    const metadata = createMetadata({
      ...input,
      title: String(localSetting.title || input.title),
      description: String(localSetting.description || input.description),
      image: String(localSetting.og_image || input.image || "/images/og/span-fitness-equipment-og-image.png"),
      noindex: Boolean(localSetting.noindex ?? input.noindex)
    });
    const canonical = String(localSetting.canonical_url || new URL(pagePath, siteConfig.url).toString());
    return {
      ...metadata,
      alternates: { canonical },
      openGraph: {
        ...metadata.openGraph,
        title: String(localSetting.og_title || localSetting.title || input.title),
        description: String(localSetting.og_description || localSetting.description || input.description),
        url: canonical
      }
    };
  }
  const { data } = await supabase
    .from("seo_settings")
    .select("title,description,canonical_url,og_title,og_description,og_image,noindex")
    .eq("page_path", pagePath)
    .maybeSingle();
  if (!data) return createMetadata(input);
  const metadata = createMetadata({
    ...input,
    title: data.title || input.title,
    description: data.description || input.description,
    image: data.og_image || input.image,
    noindex: data.noindex ?? input.noindex
  });
  const canonical = data.canonical_url || new URL(input.path || "/", siteConfig.url).toString();
  return {
    ...metadata,
    alternates: { canonical },
    openGraph: {
      ...metadata.openGraph,
      title: data.og_title || data.title || input.title,
      description: data.og_description || data.description || input.description,
      url: canonical
    }
  };
}

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
