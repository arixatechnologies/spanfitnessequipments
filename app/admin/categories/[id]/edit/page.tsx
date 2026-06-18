import { notFound } from "next/navigation";
import { CategoryForm } from "@/components/admin/content-form";
import { getAdminDataClient } from "@/lib/admin-runtime";
import { getLocalRow } from "@/lib/admin-store";
import { requireAdmin } from "@/lib/auth";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const supabase = await getAdminDataClient();
  const category = supabase
    ? (await supabase.from("product_categories").select("*").eq("id", id).maybeSingle()).data
    : await getLocalRow("product_categories", id);

  if (!category) notFound();

  return (
    <main className="admin-main">
      <p className="admin-kicker">Category CMS</p>
      <h1 className="mt-2 font-display text-4xl font-black">Edit category</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">
        Update the category card heading, subheading, image and description shown on the main website.
      </p>
      <CategoryForm category={category} />
    </main>
  );
}
