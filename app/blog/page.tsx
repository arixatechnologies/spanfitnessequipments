import Link from "next/link";
import { ArrowRight, CalendarDays, Search } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { getBlogPosts } from "@/lib/data";
import { getPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, itemListSchema, JsonLd, webPageSchema } from "@/lib/schema";
import { PageHero } from "../components/site";

const title = "Fitness Equipment and Gym Setup Blog";
const description = "Read gym equipment buying guides, commercial gym setup advice, maintenance tips and local fitness equipment insights from Span Fitness Equipments.";
export function generateMetadata() { return getPageMetadata({ title, description, path: "/blog" }); }

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ q?: string; category?: string }> }) {
  const { q = "", category = "" } = await searchParams;
  const posts = await getBlogPosts();
  const categories = [...new Set(posts.map((post) => post.category))];
  const filtered = posts.filter((post) => {
    const matchesSearch = !q || `${post.title} ${post.excerpt}`.toLowerCase().includes(q.toLowerCase());
    return matchesSearch && (!category || post.category === category);
  });
  const featured = posts.filter((post) => post.featured).slice(0, 3);
  const crumbs = [{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }];

  return <><JsonLd data={[webPageSchema({ name: title, description, path: "/blog", type: "Blog" }), breadcrumbSchema(crumbs), itemListSchema(title, "/blog", posts.map((post) => ({ name: post.title, path: `/blog/${post.slug}` })))]} /><Breadcrumbs items={crumbs} /><PageHero eyebrow="Fitness Knowledge Hub" title="Practical gym equipment guides." description="Clear advice for commercial gym owners, studios, institutions and home fitness buyers." />
    <section className="py-20"><div className="section-shell">
      <div className="grid gap-5 lg:grid-cols-3">{featured.map((post) => <article key={post.slug} className="rounded-2xl border border-coral/25 bg-gradient-to-br from-wine/50 to-[#101a38] p-7"><p className="text-xs font-black uppercase tracking-widest text-coral">Featured · {post.category}</p><h2 className="mt-4 font-display text-3xl font-black"><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2><p className="mt-4 leading-7 text-white/60">{post.excerpt}</p><Link href={`/blog/${post.slug}`} className="mt-6 inline-flex items-center gap-2 font-bold text-coral">Read guide <ArrowRight className="size-4" /></Link></article>)}</div>
      <form className="mt-14 grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 sm:grid-cols-[1fr_240px_auto]">
        <label className="relative"><Search className="absolute left-4 top-3.5 size-5 text-white/35" /><input name="q" defaultValue={q} placeholder="Search articles" className="h-12 w-full rounded-xl border border-white/10 bg-navy/70 pl-12 pr-4 outline-none focus:border-coral" /></label>
        <select name="category" defaultValue={category} className="h-12 rounded-xl border border-white/10 bg-navy px-4"><option value="">All categories</option>{categories.map((item) => <option key={item}>{item}</option>)}</select>
        <button className="rounded-xl bg-gradient-to-r from-ember to-coral px-7 font-bold">Filter</button>
      </form>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{filtered.map((post) => <article key={post.slug} className="flex flex-col rounded-2xl border border-white/10 bg-[#101a38] p-7 transition hover:-translate-y-1 hover:border-coral/50"><p className="text-xs font-black uppercase tracking-widest text-coral">{post.category}</p><h2 className="mt-3 font-display text-2xl font-black leading-tight"><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2><p className="mt-4 flex-1 text-sm leading-7 text-white/60">{post.excerpt}</p><div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5 text-xs text-white/45"><span className="flex items-center gap-2"><CalendarDays className="size-4" />{new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span><Link href={`/blog/${post.slug}`} className="font-bold text-coral">Read more</Link></div></article>)}</div>
      {!filtered.length && <p className="py-16 text-center text-white/60">No articles match those filters.</p>}
    </div></section></>;
}
