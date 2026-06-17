import Link from "next/link";
import type { CSSProperties } from "react";
import {
  Activity,
  ArrowUpRight,
  CircleGauge,
  Clock3,
  FileClock,
  FileText,
  ImageIcon,
  Inbox,
  Package,
  PackageCheck,
  PlusCircle,
  SearchCheck,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { getAdminDataClient } from "@/lib/admin-runtime";
import { countLocalRows, listLocalRows } from "@/lib/admin-store";
import { requireAdmin } from "@/lib/auth";

export default async function AdminDashboard() {
  await requireAdmin();
  const supabase = await getAdminDataClient();
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
    [Package, "Total products", counts[0], "/admin/products", "Catalog control"],
    [Inbox, "Total leads", counts[1], "/admin/leads", "Customer enquiries"],
    [FileText, "Blog posts", counts[2], "/admin/blog", "Content library"],
    [ImageIcon, "Gallery images", counts[3], "/admin/gallery", "Visual assets"],
    [FileClock, "Draft blog posts", counts[4], "/admin/blog?status=draft", "Waiting to publish"],
    [PackageCheck, "Published products", counts[5], "/admin/products?status=published", "Live on website"]
  ] as const;
  const quickActions = [
    ["Add product", "/admin/products/new", PlusCircle],
    ["Upload media", "/admin/media/upload", ImageIcon],
    ["SEO settings", "/admin/seo", SearchCheck]
  ] as const;
  const pulse = [
    ["Products", counts[0], Math.max(counts[0], 1)],
    ["Published", counts[5], Math.max(counts[0], 1)],
    ["Leads", counts[1], Math.max(counts[1], 1)],
    ["Drafts", counts[4], Math.max(counts[2], 1)]
  ] as const;
  const recent = supabase
    ? (await supabase.from("contact_leads").select("id,name,phone,requirement,created_at,status").order("created_at", { ascending: false }).limit(5)).data || []
    : await listLocalRows("contact_leads", { limit: 5 });

  return (
    <main className="admin-main">
      <section className="admin-dashboard-hero">
        <div className="admin-dashboard-hero__content">
          <span className="admin-dashboard-hero__eyebrow">
            <Sparkles className="size-4" />
            Span Fitness CMS
          </span>
          <h1 className="mt-4 font-display text-4xl font-black leading-tight sm:text-6xl">
            Your website control room.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/62 sm:text-base">
            Manage products, enquiries, SEO, media and content from one premium admin dashboard.
          </p>
          <div className="admin-dashboard-hero__actions">
            {quickActions.map(([label, href, Icon]) => (
              <Link key={href} href={href} prefetch={false} className="admin-dashboard-action">
                <Icon className="size-4" />
                {label}
                <ArrowUpRight className="size-3.5" />
              </Link>
            ))}
          </div>
        </div>
        <div className="admin-dashboard-hero__visual" aria-hidden="true">
          <div className="admin-dashboard-orbit">
            <span className="admin-dashboard-orbit__ring" />
            <span className="admin-dashboard-orbit__ring admin-dashboard-orbit__ring--two" />
            <span className="admin-dashboard-orbit__core">
              <CircleGauge className="size-9" />
            </span>
            <span className="admin-dashboard-orbit__chip admin-dashboard-orbit__chip--one">
              <ShieldCheck className="size-4" />
              Secure
            </span>
            <span className="admin-dashboard-orbit__chip admin-dashboard-orbit__chip--two">
              <Activity className="size-4" />
              Live
            </span>
          </div>
          <span className="admin-dashboard-mode">{supabase ? "Supabase Mode" : "Local Mode"}</span>
        </div>
      </section>
      {!supabase && <p className="admin-alert mt-6">Local admin mode is active. You can manage content now; data is saved in <code>.data/admin-store.json</code>.</p>}

      <div className="admin-dashboard-stats">
        {cards.map(([Icon, label, value, href, note], index) => (
          <Link key={label} href={href} prefetch={false} className="admin-stat-card admin-stat-card--premium" style={{ "--admin-card-index": index } as CSSProperties}>
            <span className="admin-stat-card__shine" />
            <span className="admin-stat-card__top">
              <span className="admin-stat-card__icon"><Icon className="size-5" /></span>
              <ArrowUpRight className="admin-stat-card__arrow size-4" />
            </span>
            <p className="mt-6 text-xs font-black uppercase tracking-[0.18em] text-white/42">{label}</p>
            <p className="mt-2 font-display text-4xl font-black sm:text-5xl">{value}</p>
            <p className="mt-2 text-sm text-white/48">{note}</p>
          </Link>
        ))}
      </div>

      <div className="admin-dashboard-grid">
        <section className="admin-panel admin-dashboard-panel">
          <div className="admin-panel-heading">
            <div>
              <p className="admin-kicker">Inbox</p>
              <h2 className="mt-1 font-display text-2xl font-black">Recent enquiries</h2>
            </div>
            <Link href="/admin/leads" prefetch={false} className="admin-panel-heading__link">
              View all <ArrowUpRight className="size-4" />
            </Link>
          </div>
          <div className="mt-5 grid gap-3">
            {recent.map((lead) => (
              <div key={lead.id} className="admin-list-item admin-list-item--premium">
                <span className="admin-list-item__avatar">{String(lead.name || "L").slice(0, 1).toUpperCase()}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold">{lead.name || "New enquiry"} <span className="text-white/35">|</span> {lead.phone || "No phone"}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-white/50">{lead.requirement || "No requirement added."}</p>
                </div>
                <span className="admin-list-item__time">
                  <Clock3 className="size-3.5" />
                  {lead.created_at ? new Date(lead.created_at).toLocaleString("en-IN") : "Recently"}
                </span>
              </div>
            ))}
            {!recent.length && <p className="admin-empty-state">No enquiries yet. New customer leads will appear here.</p>}
          </div>
        </section>

        <aside className="admin-panel admin-dashboard-panel admin-dashboard-pulse">
          <div className="admin-panel-heading">
            <div>
              <p className="admin-kicker">Pulse</p>
              <h2 className="mt-1 font-display text-2xl font-black">Content health</h2>
            </div>
          </div>
          <div className="mt-6 grid gap-4">
            {pulse.map(([label, value, total]) => (
              <div key={label} className="admin-pulse-row">
                <div className="flex items-center justify-between gap-4">
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
                <span className="admin-pulse-row__track">
                  <span style={{ width: `${Math.min(100, Math.round((value / total) * 100))}%` }} />
                </span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}
