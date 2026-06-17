import { BlogPostForm } from "@/components/admin/content-form";
import { requireAdmin } from "@/lib/auth";

export default async function NewBlogPostPage() {
  await requireAdmin();
  return <main className="p-5 sm:p-8"><p className="text-xs font-black uppercase tracking-widest text-coral">Blog CMS</p><h1 className="mt-2 font-display text-4xl font-black">Create blog post</h1><BlogPostForm /></main>;
}
