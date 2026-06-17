import { CollectionPage } from "@/components/admin/collection-page";
import { requireAdmin } from "@/lib/auth";

export default async function AdminMediaPage({ searchParams }: { searchParams: Promise<{ q?: string; status?: string }> }) {
  await requireAdmin();
  const { q = "", status = "" } = await searchParams;
  return <CollectionPage title="Media Assets" table="media_assets" path="/admin/media" search={q} status={status} createHref="/admin/media/upload" />;
}
