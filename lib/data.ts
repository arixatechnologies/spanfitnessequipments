import { fallbackBlogPosts, type BlogPost } from "./blog-data";
import { createClient } from "./supabase/server";

function withFallbackBlogPosts(posts: BlogPost[]) {
  const slugs = new Set(posts.map((post) => post.slug));
  return [...posts, ...fallbackBlogPosts.filter((post) => !slugs.has(post.slug))].sort(
    (first, second) => new Date(second.publishedAt).getTime() - new Date(first.publishedAt).getTime(),
  );
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = await createClient();
  if (!supabase) {
    const { listLocalRows } = await import("./admin-store");
    const [posts, categories] = await Promise.all([
      listLocalRows("blog_posts"),
      listLocalRows("blog_categories")
    ]);
    const categoryNameById = new Map(categories.map((item) => [String(item.id), String(item.name || item.title || "Fitness Guides")]));
    const categoryNameBySlug = new Map(categories.map((item) => [String(item.slug || item.id), String(item.name || item.title || "Fitness Guides")]));
    const localPosts = posts
      .filter((post) => post.status === "published")
      .map((post) => ({
        id: post.id,
        title: String(post.title || ""),
        slug: String(post.slug || ""),
        excerpt: String(post.excerpt || ""),
        content: String(post.content || ""),
        category: categoryNameById.get(String(post.category_id || "")) || categoryNameBySlug.get(String(post.category_id || "")) || "Fitness Guides",
        author: String(post.author || "Span Fitness Equipments"),
        featuredImage: String(post.featured_image || "/images/blog/gym-equipment-guide.png"),
        featuredImageAlt: String(post.featured_image_alt || post.title || "Span Fitness blog"),
        metaTitle: String(post.meta_title || post.title || ""),
        metaDescription: String(post.meta_description || post.excerpt || ""),
        status: "published" as const,
        featured: Boolean(post.featured),
        publishedAt: String(post.published_at || post.created_at),
        updatedAt: String(post.updated_at || post.created_at),
        faqs: []
      }));
    return withFallbackBlogPosts(localPosts);
  }
  const { data, error } = await supabase
    .from("blog_posts")
    .select("id,title,slug,excerpt,content,author,featured_image,featured_image_alt,meta_title,meta_description,status,featured,published_at,updated_at,faqs,blog_categories(name)")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error || !data?.length) return fallbackBlogPosts;
  const posts: BlogPost[] = data.map((post) => {
    const categoryRelation = post.blog_categories as unknown as { name?: string } | null;
    return {
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content,
      category: categoryRelation?.name || "Fitness Guides",
      author: post.author,
      featuredImage: post.featured_image || "/images/blog/gym-equipment-guide.png",
      featuredImageAlt: post.featured_image_alt || post.title,
      metaTitle: post.meta_title || post.title,
      metaDescription: post.meta_description || post.excerpt || "",
      status: "published" as const,
      featured: post.featured,
      publishedAt: post.published_at,
      updatedAt: post.updated_at,
      faqs: Array.isArray(post.faqs) ? post.faqs as BlogPost["faqs"] : []
    };
  });
  return withFallbackBlogPosts(posts);
}

export async function getBlogPost(slug: string) {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug);
}
