import { notFound } from "next/navigation";
import { BrandForm } from "@/components/admin/content-form";
import { getAdminDataClient } from "@/lib/admin-runtime";
import { getLocalRow } from "@/lib/admin-store";
import { requireAdmin } from "@/lib/auth";

export default async function EditBrandPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const supabase = await getAdminDataClient();
  const brand = supabase
    ? (await supabase.from("brands").select("*").eq("id", id).maybeSingle()).data
    : await getLocalRow("brands", id);

  if (!brand) notFound();

  return (
    <main className="admin-main">
      <p className="admin-kicker">Brand CMS</p>
      <h1 className="mt-2 font-display text-4xl font-black">Edit brand</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">
        Update the brand name and specialty text shown on the home page brand section.
      </p>
      <BrandForm brand={brand} />
    </main>
  );
}
