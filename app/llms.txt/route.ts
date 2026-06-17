import { getBlogPosts } from "@/lib/data";
import { categories, products } from "@/app/data";
import { siteConfig } from "@/src/config/site";

export async function GET() {
  const posts = await getBlogPosts();
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
- ${siteConfig.url}/categories
- ${siteConfig.url}/blog
- ${siteConfig.url}/contact

## Equipment categories
${categories.map((item) => `- ${item.name}: ${siteConfig.url}/categories/${item.slug}`).join("\n")}

## Products
${products.map((item) => `- ${item.name}: ${siteConfig.url}/products/${item.slug}`).join("\n")}

## Guides
${posts.map((item) => `- ${item.title}: ${siteConfig.url}/blog/${item.slug}`).join("\n")}
`;
  return new Response(content, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
