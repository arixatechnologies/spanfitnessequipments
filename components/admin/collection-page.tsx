import Link from "next/link";
import { Plus, Search, Trash2 } from "lucide-react";
import { createSimpleRecord, deleteRecord, togglePublished, updateLeadStatus, updateSimpleRecord } from "@/app/admin/actions";
import { AdminRow, listLocalRows } from "@/lib/admin-store";
import { createClient } from "@/lib/supabase/server";

type Row = AdminRow & {
  question?: string;
  file_name?: string;
  setting_key?: string;
  page_path?: string;
  requirement?: string;
  public_url?: string;
  answer?: string;
  quote?: string;
  value?: string;
  description?: string;
};

const quickCreateTables = ["product_categories", "brands", "accessories", "offers", "gallery_items", "blog_categories", "blog_tags", "faqs", "testimonials", "site_settings"];
const inlineEditTables = [...quickCreateTables, "site_settings", "seo_settings"];
const publishableTables = ["products", "product_categories", "brands", "accessories", "offers", "gallery_items", "blog_posts", "blog_categories", "faqs", "testimonials"];

function rowTitle(row: Row) {
  return String(row.name || row.title || row.question || row.file_name || row.setting_key || row.page_path || row.id);
}

function rowDetails(row: Row) {
  return String(row.description || row.answer || row.quote || row.value || row.requirement || row.public_url || "");
}

function searchField(table: string) {
  if (["offers", "gallery_items", "blog_posts"].includes(table)) return "title";
  if (table === "faqs") return "question";
  if (table === "media_assets") return "file_name";
  if (table === "site_settings") return "setting_key";
  if (table === "seo_settings") return "page_path";
  return "name";
}

export async function CollectionPage({ title, table, path, search = "", status = "", createHref }: { title: string; table: string; path: string; search?: string; status?: string; createHref?: string }) {
  const supabase = await createClient();
  let rows: Row[] = [];

  if (supabase) {
    let query = supabase.from(table).select("*").order("created_at", { ascending: false }).limit(100);
    if (search) query = query.ilike(searchField(table), `%${search}%`);
    if (status) query = query.eq("status", status);
    const result = await query;
    rows = (result.data || []) as Row[];
  } else {
    rows = await listLocalRows(table, { search, status });
  }

  const canQuickCreate = quickCreateTables.includes(table);
  const canInlineEdit = inlineEditTables.includes(table);
  const publishable = publishableTables.includes(table);

  return (
    <main className="admin-main">
      <div className="admin-hero">
        <div>
          <p className="admin-kicker">Content Management</p>
          <h1 className="mt-2 font-display text-4xl font-black sm:text-5xl">{title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">Create, organize and maintain this section of the Span Fitness website.</p>
        </div>
        {createHref && (
          <Link href={createHref} prefetch={false} className="admin-primary-btn">
            <Plus className="size-4" /> Create
          </Link>
        )}
      </div>

      {!supabase && (
        <div className="admin-alert mt-6">
          Local admin mode is active. Records are saved to <code>.data/admin-store.json</code>. Connect Supabase later for production database storage.
        </div>
      )}

      <form className="admin-toolbar mt-8">
        <label className="relative min-w-64 flex-1">
          <Search className="absolute left-3 top-3 size-5 text-white/35" />
          <input name="q" defaultValue={search} placeholder={`Search ${title.toLowerCase()}`} className="admin-input pl-10" />
        </label>
        {publishable && (
          <select name="status" defaultValue={status} aria-label="Filter by status" className="admin-input">
            <option value="">All statuses</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        )}
        <button className="admin-secondary-btn">Filter</button>
      </form>

      {canQuickCreate && (
        <form action={createSimpleRecord.bind(null, table, path)} className="admin-panel mt-6 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
          <input name="name" required placeholder={table === "faqs" ? "Question" : "Name or title"} className="admin-input" />
          <input name="description" placeholder="Description, answer or quote" className="admin-input" />
          <button className="admin-primary-btn">Quick create draft</button>
        </form>
      )}

      <div className="admin-table-wrap mt-6">
        <table className="w-full min-w-[780px] text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-wider text-white/45">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Details</th>
              <th className="p-4">Status</th>
              <th className="p-4">Created</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-white/10">
                <td className="p-4 font-bold">
                  {canInlineEdit ? (
                    <form id={`edit-${row.id}`} action={updateSimpleRecord.bind(null, table, row.id, path)}>
                      <input name="name" defaultValue={rowTitle(row)} className="admin-input h-10 min-w-44" />
                    </form>
                  ) : rowTitle(row)}
                </td>
                <td className="p-4 text-white/55">
                  {canInlineEdit ? (
                    <input form={`edit-${row.id}`} name="description" defaultValue={rowDetails(row)} className="admin-input h-10 min-w-52" />
                  ) : rowDetails(row)}
                </td>
                <td className="p-4">
                  {table === "contact_leads" ? (
                    <form action={updateLeadStatus.bind(null, row.id, path)} className="flex gap-2">
                      <select name="status" defaultValue={row.status} aria-label="Lead status" className="rounded-lg border border-white/10 bg-navy px-2 py-1 text-xs">
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="closed">Closed</option>
                        <option value="spam">Spam</option>
                      </select>
                      <button className="rounded-lg border border-white/10 px-2 py-1 text-xs font-bold">Save</button>
                    </form>
                  ) : (
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs">{row.status || "active"}</span>
                  )}
                </td>
                <td className="p-4 text-white/45">{row.created_at ? new Date(row.created_at).toLocaleDateString("en-IN") : "-"}</td>
                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    {canInlineEdit && <button form={`edit-${row.id}`} className="rounded-lg border border-white/10 px-3 py-2 text-xs font-bold">Save</button>}
                    {table === "blog_posts" && <Link href={`/admin/blog/${row.id}/edit`} prefetch={false} className="rounded-lg border border-white/10 px-3 py-2 text-xs font-bold">Edit</Link>}
                    {table === "products" && <Link href={`/admin/products/${row.id}/edit`} prefetch={false} className="rounded-lg border border-white/10 px-3 py-2 text-xs font-bold">Edit</Link>}
                    {publishable && row.status && (
                      <form action={togglePublished.bind(null, table, row.id, row.status, path)}>
                        <button className="rounded-lg border border-white/10 px-3 py-2 text-xs font-bold">{row.status === "published" ? "Unpublish" : "Publish"}</button>
                      </form>
                    )}
                    <form action={deleteRecord.bind(null, table, row.id, path)}>
                      <button aria-label="Delete" className="rounded-lg border border-red-400/20 p-2 text-red-300"><Trash2 className="size-4" /></button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!rows.length && <p className="p-8 text-center text-white/45">No records found.</p>}
      </div>
    </main>
  );
}
