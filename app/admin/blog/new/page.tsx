import { BlogPostForm } from "@/components/admin/blog-post-form";
import { getAdminDataClient } from "@/lib/admin-runtime";
import { listLocalRows } from "@/lib/admin-store";
import { requireAdmin } from "@/lib/auth";

function optionName(item: Record<string, unknown>) {
  return String(item.name || item.title || item.id);
}

export default async function NewBlogPostPage() {
  await requireAdmin();
  const supabase = await getAdminDataClient();
  const categories = supabase
    ? await supabase.from("blog_categories").select("id,name").order("name")
    : { data: (await listLocalRows("blog_categories")).map((item) => ({ id: item.id, name: optionName(item) })) };

  return <main className="p-5 sm:p-8"><p className="text-xs font-black uppercase tracking-widest text-coral">Blog CMS</p><h1 className="mt-2 font-display text-4xl font-black">Create blog post</h1><BlogPostForm categories={categories.data || []} /></main>;
}
