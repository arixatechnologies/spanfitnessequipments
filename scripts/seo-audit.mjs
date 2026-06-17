import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const port = 3210;
const origin = `http://127.0.0.1:${port}`;
const nextBin = fileURLToPath(new URL("../node_modules/next/dist/bin/next", import.meta.url));
const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const server = spawn(process.execPath, [nextBin, "start", "-p", String(port)], { cwd: projectRoot, stdio: "ignore" });

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const text = (html, pattern) => html.match(pattern)?.[1]?.replace(/\s+/g, " ").trim() || "";
const errors = [];
const warnings = [];

try {
  let ready = false;
  for (let attempt = 0; attempt < 40; attempt++) {
    try {
      if ((await fetch(origin)).ok) {
        ready = true;
        break;
      }
    } catch {}
    await sleep(500);
  }
  if (!ready) throw new Error("The production server did not start for the SEO audit.");

  const sitemapResponse = await fetch(`${origin}/sitemap.xml`);
  if (!sitemapResponse.ok) throw new Error(`Sitemap returned ${sitemapResponse.status}`);
  const sitemap = await sitemapResponse.text();
  const paths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
  const pages = new Map();

  for (const path of paths) {
    const response = await fetch(`${origin}${path}`);
    const html = await response.text();
    if (!response.ok) errors.push(`${path}: HTTP ${response.status}`);
    const title = text(html, /<title>(.*?)<\/title>/is);
    const description = text(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i) || text(html, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);
    const canonical = text(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i) || text(html, /<link[^>]+href=["']([^"']*)["'][^>]+rel=["']canonical["']/i);
    const h1Count = (html.match(/<h1\b/gi) || []).length;
    if (!title || title.length < 15 || title.length > 85) errors.push(`${path}: title length ${title.length}`);
    if (!description || description.length < 50 || description.length > 180) errors.push(`${path}: description length ${description.length}`);
    if (!canonical) errors.push(`${path}: missing canonical`);
    if (h1Count !== 1) errors.push(`${path}: expected one H1, found ${h1Count}`);
    for (const match of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/gis)) {
      try { JSON.parse(match[1].replaceAll("&quot;", '"')); } catch { errors.push(`${path}: invalid JSON-LD`); }
    }
    pages.set(path, { title, description, html });
  }

  const titleOwners = new Map();
  const descriptionOwners = new Map();
  for (const [path, page] of pages) {
    if (titleOwners.has(page.title)) errors.push(`${path}: duplicate title with ${titleOwners.get(page.title)}`);
    else titleOwners.set(page.title, path);
    if (descriptionOwners.has(page.description)) warnings.push(`${path}: duplicate description with ${descriptionOwners.get(page.description)}`);
    else descriptionOwners.set(page.description, path);
    for (const match of page.html.matchAll(/href=["'](\/[^"'#?]*)/gi)) {
      const linkedPath = match[1].replace(/\/$/, "") || "/";
      if (linkedPath.startsWith("/admin") || linkedPath.startsWith("/api")) continue;
      const linked = await fetch(`${origin}${linkedPath}`, { redirect: "manual" });
      if (linked.status >= 400) errors.push(`${path}: broken internal link ${linkedPath} (${linked.status})`);
    }
  }

  console.log(`SEO audit crawled ${pages.size} sitemap URLs.`);
  warnings.forEach((warning) => console.warn(`WARN ${warning}`));
  if (errors.length) {
    errors.forEach((error) => console.error(`ERROR ${error}`));
    process.exitCode = 1;
  } else {
    console.log("SEO audit passed.");
  }
} finally {
  server.kill();
}
