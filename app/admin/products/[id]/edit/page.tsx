import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/content-form";
import { getAdminDataClient } from "@/lib/admin-runtime";
import { getLocalRow, listLocalRows } from "@/lib/admin-store";
import { requireAdmin } from "@/lib/auth";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const supabase = await getAdminDataClient();
  if (!supabase) {
    const [product, categories, brands] = await Promise.all([
      getLocalRow("products", id),
      listLocalRows("product_categories"),
      listLocalRows("brands"),
    ]);
    const categoryOptions = categories.map((item) => ({ id: item.id, name: String(item.name || item.title || item.id) }));
    const brandOptions = brands.map((item) => ({ id: item.id, name: String(item.name || item.title || item.id) }));
    if (!product) notFound();
    return (
      <main className="p-5 sm:p-8">
        <p className="text-xs font-black uppercase tracking-widest text-coral">Catalog CMS</p>
        <h1 className="mt-2 font-display text-4xl font-black">Edit product</h1>
        <ProductForm product={product} categories={categoryOptions} brands={brandOptions} />
      </main>
    );
  }

  const [product, categories, brands] = await Promise.all([
    supabase.from("products").select("*").eq("id", id).maybeSingle(),
    supabase.from("product_categories").select("id,name").order("name"),
    supabase.from("brands").select("id,name").order("name")
  ]);
  if (!product.data) notFound();

  return (
    <main className="p-5 sm:p-8">
      <p className="text-xs font-black uppercase tracking-widest text-coral">Catalog CMS</p>
      <h1 className="mt-2 font-display text-4xl font-black">Edit product</h1>
      <ProductForm product={product.data} categories={categories.data || []} brands={brands.data || []} />
    </main>
  );
}
