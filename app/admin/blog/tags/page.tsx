import { CollectionPage } from "@/components/admin/collection-page";
import { requireAdmin } from "@/lib/auth";

export default async function BlogTagsPage({ searchParams }: { searchParams: Promise<{ q?: string; status?: string }> }) {
  await requireAdmin();
  const { q = "", status = "" } = await searchParams;
  return <CollectionPage title="Blog Tags" table="blog_tags" path="/admin/blog/tags" search={q} status={status} />;
}
