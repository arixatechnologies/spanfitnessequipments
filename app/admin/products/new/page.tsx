import { ProductForm } from "@/components/admin/content-form";
import { listLocalRows } from "@/lib/admin-store";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export default async function NewProductPage() {
  await requireAdmin();
  const supabase = await createClient();
  const [categories, brands] = supabase ? await Promise.all([
    supabase.from("product_categories").select("id,name").order("name"),
    supabase.from("brands").select("id,name").order("name")
  ]) : [
    { data: (await listLocalRows("product_categories")).map((item) => ({ id: item.id, name: String(item.name || item.title || item.id) })) },
    { data: (await listLocalRows("brands")).map((item) => ({ id: item.id, name: String(item.name || item.title || item.id) })) }
  ];
  return <main className="p-5 sm:p-8"><p className="text-xs font-black uppercase tracking-widest text-coral">Catalog</p><h1 className="mt-2 font-display text-4xl font-black">Create product</h1><ProductForm categories={categories.data || []} brands={brands.data || []} /></main>;
}
