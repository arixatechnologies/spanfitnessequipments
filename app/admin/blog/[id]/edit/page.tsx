import { notFound } from "next/navigation";
import { BlogPostForm } from "@/components/admin/blog-post-form";
import { getAdminDataClient } from "@/lib/admin-runtime";
import { getLocalRow, listLocalRows } from "@/lib/admin-store";
import { requireAdmin } from "@/lib/auth";

function optionName(item: Record<string, unknown>) {
  return String(item.name || item.title || item.id);
}

function selectedTagNames(tags: Array<Record<string, unknown>>, selectedIds: string[]) {
  const nameById = new Map(tags.map((item) => [String(item.id), optionName(item)]));
  return selectedIds.map((id) => nameById.get(id)).filter(Boolean).join(", ");
}

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const supabase = await getAdminDataClient();
  if (!supabase) {
    const [post, categories, tags] = await Promise.all([
      getLocalRow("blog_posts", id),
      listLocalRows("blog_categories"),
      listLocalRows("blog_tags")
    ]);
    if (!post) notFound();
    const tagNames = selectedTagNames(tags, Array.isArray(post.tag_ids) ? post.tag_ids.map(String) : []);
    return <main className="p-5 sm:p-8"><p className="text-xs font-black uppercase tracking-widest text-coral">Blog CMS</p><h1 className="mt-2 font-display text-4xl font-black">Edit blog post</h1><BlogPostForm post={post} categories={categories.map((item) => ({ id: item.id, name: optionName(item) }))} tagNames={tagNames} /></main>;
  }
  const [{ data }, categories, tags, postTags] = await Promise.all([
    supabase.from("blog_posts").select("*").eq("id", id).maybeSingle(),
    supabase.from("blog_categories").select("id,name").order("name"),
    supabase.from("blog_tags").select("id,name").order("name"),
    supabase.from("blog_post_tags").select("tag_id").eq("post_id", id)
  ]);
  if (!data) notFound();
  const tagNames = selectedTagNames(tags.data || [], (postTags.data || []).map((item) => String(item.tag_id)));
  return <main className="p-5 sm:p-8"><p className="text-xs font-black uppercase tracking-widest text-coral">Blog CMS</p><h1 className="mt-2 font-display text-4xl font-black">Edit blog post</h1><BlogPostForm post={data} categories={categories.data || []} tagNames={tagNames} /></main>;
}
