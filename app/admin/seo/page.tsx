import { saveSeoSetting } from "@/app/admin/actions";
import { getAdminDataClient } from "@/lib/admin-runtime";
import { listLocalRows } from "@/lib/admin-store";
import { requireAdmin } from "@/lib/auth";

const field = "h-11 rounded-lg border border-white/10 bg-navy px-3 outline-none focus:border-coral";
const area = "min-h-24 rounded-lg border border-white/10 bg-navy p-3 outline-none focus:border-coral";

export default async function AdminSeoPage() {
  await requireAdmin();
  const supabase = await getAdminDataClient();
  const settings = supabase ? (await supabase.from("seo_settings").select("*").order("page_path")).data || [] : await listLocalRows("seo_settings");
  return <main className="p-5 sm:p-8"><p className="text-xs font-black uppercase tracking-widest text-coral">Search Appearance</p><h1 className="mt-2 font-display text-4xl font-black">SEO settings</h1><p className="mt-3 max-w-3xl text-sm leading-6 text-white/55">Overrides entered here are applied to public page metadata by exact route path. Leave canonical or Open Graph fields empty to use the route defaults.</p>
    {!supabase && <p className="mt-6 rounded-xl border border-coral/30 bg-coral/10 p-4">Local admin mode is active. SEO overrides are saved in <code>.data/admin-store.json</code>.</p>}
    <form action={saveSeoSetting} className="mt-8 grid max-w-4xl gap-5 rounded-2xl border border-white/10 bg-[#101a38] p-6">
      <div className="grid gap-5 md:grid-cols-2"><label className="grid gap-2 text-sm font-bold">Page path<input name="pagePath" required placeholder="/about" className={field} /></label><label className="grid gap-2 text-sm font-bold">Canonical URL<input name="canonicalUrl" type="url" placeholder="Use route default when empty" className={field} /></label></div>
      <label className="grid gap-2 text-sm font-bold">SEO title<input name="title" required minLength={10} maxLength={70} className={field} /></label>
      <label className="grid gap-2 text-sm font-bold">Meta description<textarea name="description" required minLength={50} maxLength={170} className={area} /></label>
      <div className="grid gap-5 md:grid-cols-2"><label className="grid gap-2 text-sm font-bold">Open Graph title<input name="ogTitle" maxLength={70} className={field} /></label><label className="grid gap-2 text-sm font-bold">Open Graph image URL<input name="ogImage" className={field} /></label></div>
      <label className="grid gap-2 text-sm font-bold">Open Graph description<textarea name="ogDescription" maxLength={200} className={area} /></label>
      <label className="flex items-center gap-3 text-sm font-bold"><input name="noindex" type="checkbox" className="size-5" /> Exclude this route from search indexes</label>
      <button className="h-12 rounded-lg bg-gradient-to-r from-ember to-coral px-6 font-bold">Save SEO override</button>
    </form>
    <div className="mt-8 overflow-x-auto rounded-xl border border-white/10"><table className="w-full min-w-[720px] text-left text-sm"><thead className="bg-white/5 text-xs uppercase text-white/45"><tr><th className="p-4">Path</th><th className="p-4">Title</th><th className="p-4">Indexing</th></tr></thead><tbody>{settings.map((item) => <tr key={item.id} className="border-t border-white/10"><td className="p-4 font-mono">{item.page_path}</td><td className="p-4">{item.title}</td><td className="p-4">{item.noindex ? "Noindex" : "Index"}</td></tr>)}</tbody></table>{!settings.length && <p className="p-6 text-white/45">No SEO overrides saved. Route defaults remain active.</p>}</div>
  </main>;
}
