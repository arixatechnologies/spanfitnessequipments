import { notFound } from "next/navigation";
import { BlogPostForm } from "@/components/admin/content-form";
import { getAdminDataClient } from "@/lib/admin-runtime";
import { getLocalRow } from "@/lib/admin-store";
import { requireAdmin } from "@/lib/auth";

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const supabase = await getAdminDataClient();
  if (!supabase) {
    const post = await getLocalRow("blog_posts", id);
    if (!post) notFound();
    return <main className="p-5 sm:p-8"><p className="text-xs font-black uppercase tracking-widest text-coral">Blog CMS</p><h1 className="mt-2 font-display text-4xl font-black">Edit blog post</h1><BlogPostForm post={post} /></main>;
  }
  const { data } = await supabase.from("blog_posts").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  return <main className="p-5 sm:p-8"><p className="text-xs font-black uppercase tracking-widest text-coral">Blog CMS</p><h1 className="mt-2 font-display text-4xl font-black">Edit blog post</h1><BlogPostForm post={data} /></main>;
}
