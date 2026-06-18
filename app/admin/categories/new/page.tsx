import { CategoryForm } from "@/components/admin/content-form";
import { requireAdmin } from "@/lib/auth";

export default async function NewCategoryPage() {
  await requireAdmin();

  return (
    <main className="admin-main">
      <p className="admin-kicker">Category CMS</p>
      <h1 className="mt-2 font-display text-4xl font-black">Create category</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">
        Add the exact heading, subheading, image and description used on the website category cards.
      </p>
      <CategoryForm />
    </main>
  );
}
