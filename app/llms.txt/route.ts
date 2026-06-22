import { getBlogPosts } from "@/lib/data";
import { getPublicCategories, getPublicProducts } from "@/lib/public-content";
import { siteConfig } from "@/src/config/site";
import { getAllFitnessPaths } from "../fitness-pages";

export const dynamic = "force-dynamic";

export async function GET() {
  const [posts, categories, products] = await Promise.all([
    getBlogPosts(),
    getPublicCategories(),
    getPublicProducts(),
  ]);
  const content = `# ${siteConfig.name}

> ${siteConfig.description}

Span Fitness Equipments is a fitness equipment store and gym equipment dealer based in Seethampeta, Visakhapatnam, Andhra Pradesh, India.

## Contact
- Owner: ${siteConfig.owner}
- Phone: ${siteConfig.phone}
- Customer care: ${siteConfig.customerCare}
- Email: ${siteConfig.email}
- Address: ${siteConfig.address}

## Main pages
- ${siteConfig.url}/about
- ${siteConfig.url}/home-fitness
- ${siteConfig.url}/gym-fitness
- ${siteConfig.url}/categories
- ${siteConfig.url}/blog
- ${siteConfig.url}/contact

## Fitness subsections
${getAllFitnessPaths().map((path) => `- ${siteConfig.url}${path}`).join("\n")}

## Equipment categories
${categories.map((item) => `- ${item.name}: ${siteConfig.url}/categories/${item.slug}`).join("\n")}

## Products
${products.map((item) => `- ${item.name}: ${siteConfig.url}/products/${item.slug}`).join("\n")}

## Guides
${posts.map((item) => `- ${item.title}: ${siteConfig.url}/blog/${item.slug}`).join("\n")}
`;
  return new Response(content, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
