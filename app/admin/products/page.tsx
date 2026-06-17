import { CollectionPage } from "@/components/admin/collection-page";
import { requireAdmin } from "@/lib/auth";

export default async function AdminProductsPage({ searchParams }: { searchParams: Promise<{ q?: string; status?: string }> }) {
  await requireAdmin();
  const { q = "", status = "" } = await searchParams;
  return <CollectionPage title="Products" table="products" path="/admin/products" search={q} status={status} createHref="/admin/products/new" />;
}
