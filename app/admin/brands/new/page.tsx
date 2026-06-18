import { BrandForm } from "@/components/admin/content-form";
import { requireAdmin } from "@/lib/auth";

export default async function NewBrandPage() {
  await requireAdmin();

  return (
    <main className="admin-main">
      <p className="admin-kicker">Brand CMS</p>
      <h1 className="mt-2 font-display text-4xl font-black">Create brand</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">
        Add a brand name, home page subtitle and description. Published brands appear automatically in the home brand section.
      </p>
      <BrandForm />
    </main>
  );
}
