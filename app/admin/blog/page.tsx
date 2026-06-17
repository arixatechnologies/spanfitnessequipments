import { CollectionPage } from "@/components/admin/collection-page";
import { requireAdmin } from "@/lib/auth";

export default async function AdminBlogPage({ searchParams }: { searchParams: Promise<{ q?: string; status?: string }> }) {
  await requireAdmin();
  const { q = "", status = "" } = await searchParams;
  return <CollectionPage title="Blog Posts" table="blog_posts" path="/admin/blog" search={q} status={status} createHref="/admin/blog/new" />;
}
