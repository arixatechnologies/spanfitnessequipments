import Link from "next/link";
import { FileClock, FileText, ImageIcon, Inbox, Package, PackageCheck } from "lucide-react";
import { countLocalRows, listLocalRows } from "@/lib/admin-store";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  await requireAdmin();
  const supabase = await createClient();
  const count = async (table: string, status?: string) => {
    if (!supabase) return countLocalRows(table, status);
    let query = supabase.from(table).select("*", { count: "exact", head: true });
    if (status) query = query.eq("status", status);
    return (await query).count || 0;
  };
  const counts = await Promise.all([
    count("products"),
    count("contact_leads"),
    count("blog_posts"),
    count("gallery_items"),
    count("blog_posts", "draft"),
    count("products", "published")
  ]);
  const cards = [
    [Package, "Total products", counts[0], "/admin/products"],
    [Inbox, "Total leads", counts[1], "/admin/leads"],
    [FileText, "Blog posts", counts[2], "/admin/blog"],
    [ImageIcon, "Gallery images", counts[3], "/admin/gallery"],
    [FileClock, "Draft blog posts", counts[4], "/admin/blog?status=draft"],
    [PackageCheck, "Published products", counts[5], "/admin/products?status=published"]
  ] as const;
  const recent = supabase
    ? (await supabase.from("contact_leads").select("id,name,phone,requirement,created_at,status").order("created_at", { ascending: false }).limit(5)).data || []
    : await listLocalRows("contact_leads", { limit: 5 });

  return (
    <main className="admin-main">
      <section className="admin-hero">
        <div>
          <p className="admin-kicker">Span Fitness CMS</p>
          <h1 className="mt-2 font-display text-4xl font-black sm:text-5xl">Dashboard</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">Manage products, leads, SEO, media and content from one clean control room.</p>
        </div>
        <span className="admin-hero__badge">{supabase ? "Supabase Mode" : "Local Mode"}</span>
      </section>
      {!supabase && <p className="admin-alert mt-6">Local admin mode is active. You can manage content now; data is saved in <code>.data/admin-store.json</code>.</p>}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map(([Icon, label, value, href]) => (
          <Link key={label} href={href} prefetch={false} className="admin-stat-card">
            <span className="admin-stat-card__icon"><Icon className="size-5" /></span>
            <p className="mt-6 text-sm text-white/50">{label}</p>
            <p className="mt-1 font-display text-4xl font-black">{value}</p>
          </Link>
        ))}
      </div>
      <section className="admin-panel mt-10">
        <h2 className="font-display text-2xl font-black">Recent enquiries</h2>
        <div className="mt-5 grid gap-3">
          {recent.map((lead) => (
            <div key={lead.id} className="admin-list-item">
              <div>
                <p className="font-bold">{lead.name} | {lead.phone}</p>
                <p className="mt-1 text-sm text-white/50">{lead.requirement}</p>
              </div>
              <span className="text-xs text-coral">{new Date(lead.created_at).toLocaleString("en-IN")}</span>
            </div>
          ))}
          {!recent.length && <p className="text-sm text-white/45">No enquiries yet.</p>}
        </div>
      </section>
    </main>
  );
}
