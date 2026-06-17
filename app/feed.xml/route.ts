import { getBlogPosts } from "@/lib/data";
import { absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/src/config/site";

function escapeXml(value: string) {
  return value.replace(/[<>&'"]/g, (char) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[char] || char);
}

export async function GET() {
  const posts = await getBlogPosts();
  const items = posts.map((post) => `<item><title>${escapeXml(post.title)}</title><link>${absoluteUrl(`/blog/${post.slug}`)}</link><guid>${absoluteUrl(`/blog/${post.slug}`)}</guid><pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate><description>${escapeXml(post.excerpt)}</description></item>`).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${siteConfig.name} Blog</title><link>${siteConfig.url}</link><description>${escapeXml(siteConfig.description)}</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
