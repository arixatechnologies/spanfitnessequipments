import { CollectionPage } from "@/components/admin/collection-page";
import { requireAdmin } from "@/lib/auth";

export default async function BlogCategoriesPage({ searchParams }: { searchParams: Promise<{ q?: string; status?: string }> }) {
  await requireAdmin();
  const { q = "", status = "" } = await searchParams;
  return <CollectionPage title="Blog Categories" table="blog_categories" path="/admin/blog/categories" search={q} status={status} />;
}
