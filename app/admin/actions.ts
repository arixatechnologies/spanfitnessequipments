"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminDataClient } from "@/lib/admin-runtime";
import { signInEnvAdmin, signOutEnvAdmin, validateEnvAdminCredentials } from "@/lib/admin-session";
import { deleteLocalRow, getLocalRow, insertLocalRow, updateLocalRow, upsertLocalRow } from "@/lib/admin-store";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { blogPostSchema, loginSchema } from "@/lib/validators";

const allowedTables = new Set(["products","product_categories","brands","accessories","offers","gallery_items","blog_posts","blog_categories","blog_tags","faqs","testimonials","contact_leads","media_assets","site_settings","seo_settings"]);

function revalidatePublicContent(table: string, values: Record<string, unknown> = {}) {
  const paths = new Set(["/", "/sitemap.xml", "/llms.txt"]);
  const slug = String(values.slug || "");

  if (["products", "product_categories", "brands", "gallery_items"].includes(table)) paths.add("/categories");
  if (["products", "accessories"].includes(table)) paths.add("/accessories");
  if (table === "products") paths.add("/new-arrivals");
  if (table === "offers") paths.add("/offers");
  if (table === "brands") paths.add("/about");
  if (table === "blog_posts") paths.add("/blog");

  if (table === "products" && slug) paths.add(`/products/${slug}`);
  if (table === "product_categories" && slug) paths.add(`/categories/${slug}`);
  if (table === "blog_posts" && slug) paths.add(`/blog/${slug}`);

  for (const path of paths) revalidatePath(path);
}

export async function loginAction(_: { error?: string }, formData: FormData) {
  const parsed = loginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: "Enter a valid email and password of at least 8 characters." };
  if (validateEnvAdminCredentials(parsed.data.email, parsed.data.password)) {
    await signInEnvAdmin(parsed.data.email);
    redirect("/admin");
  }
  const supabase = await createClient();
  if (!supabase) return { error: "Login failed. Use the configured admin email and password." };
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) return { error: "Login failed. Check your credentials and admin profile." };
  redirect("/admin");
}

export async function logoutAction() {
  await signOutEnvAdmin();
  const supabase = await createClient();
  if (supabase) await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function deleteRecord(table: string, id: string, path: string) {
  await requireAdmin();
  if (!allowedTables.has(table)) throw new Error("Unsupported table.");
  const supabase = await getAdminDataClient();
  if (!supabase) {
    const existing = await getLocalRow(table, id);
    await deleteLocalRow(table, id);
    revalidatePublicContent(table, existing || { id });
    revalidatePath(path);
    redirect(path);
  }
  const existing = await supabase.from(table).select("id,slug").eq("id", id).maybeSingle();
  await supabase.from(table).delete().eq("id", id);
  revalidatePublicContent(table, existing.data || { id });
  revalidatePath(path);
  redirect(path);
}

export async function togglePublished(table: string, id: string, currentStatus: string, path: string) {
  await requireAdmin();
  const publishableTables = new Set(["products","product_categories","brands","accessories","offers","gallery_items","blog_posts","blog_categories","faqs","testimonials"]);
  if (!publishableTables.has(table)) throw new Error("This record does not support publishing.");
  const supabase = await getAdminDataClient();
  if (!supabase) {
    const existing = await getLocalRow(table, id);
    await updateLocalRow(table, id, { status: currentStatus === "published" ? "draft" : "published" });
    revalidatePublicContent(table, existing || { id });
    revalidatePath(path);
    redirect(path);
  }
  const existing = await supabase.from(table).select("id,slug").eq("id", id).maybeSingle();
  const { error } = await supabase.from(table).update({ status: currentStatus === "published" ? "draft" : "published" }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePublicContent(table, existing.data || { id });
  revalidatePath(path);
  redirect(path);
}

export async function updateLeadStatus(id: string, path: string, formData: FormData) {
  await requireAdmin();
  const status = String(formData.get("status") || "");
  if (!["new", "contacted", "qualified", "closed", "spam"].includes(status)) throw new Error("Invalid lead status.");
  const supabase = await getAdminDataClient();
  if (!supabase) {
    await updateLocalRow("contact_leads", id, { status });
    revalidatePath(path);
    redirect(path);
  }
  const { error } = await supabase.from("contact_leads").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(path);
  redirect(path);
}

export async function saveBlogPost(formData: FormData) {
  await requireAdmin();
  const parsed = blogPostSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message || "Invalid blog post.");
  const id = String(formData.get("id") || "");
  const values = {
    title: parsed.data.title, slug: parsed.data.slug, excerpt: parsed.data.excerpt, content: parsed.data.content, status: parsed.data.status,
    meta_title: parsed.data.metaTitle || parsed.data.title, meta_description: parsed.data.metaDescription || parsed.data.excerpt,
    author: "Span Fitness Equipments", published_at: parsed.data.status === "published" ? new Date().toISOString() : null
  };
  const supabase = await getAdminDataClient();
  if (!supabase) {
    if (id) await updateLocalRow("blog_posts", id, values);
    else await insertLocalRow("blog_posts", values);
    revalidatePublicContent("blog_posts", values);
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    redirect("/admin/blog");
  }
  const result = id ? await supabase.from("blog_posts").update(values).eq("id", id) : await supabase.from("blog_posts").insert(values);
  if (result.error) throw new Error(result.error.message);
  revalidatePublicContent("blog_posts", values);
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function saveProduct(formData: FormData) {
  await requireAdmin();
  const name = String(formData.get("name") || "").trim();
  const slug = String(formData.get("slug") || "").trim();
  if (name.length < 3 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error("A valid product name and slug are required.");
  const id = String(formData.get("id") || "");
  const values = {
    name, slug, short_description: String(formData.get("shortDescription") || ""), full_description: String(formData.get("fullDescription") || ""),
    image_url: String(formData.get("imageUrl") || ""), image_alt: String(formData.get("imageAlt") || name), status: String(formData.get("status") || "draft"),
    seo_title: String(formData.get("seoTitle") || name), seo_description: String(formData.get("seoDescription") || ""),
    category_id: String(formData.get("categoryId") || "") || null,
    brand_id: String(formData.get("brandId") || "") || null,
    is_new_arrival: formData.get("isNewArrival") === "on",
    is_featured: formData.get("isFeatured") === "on",
    is_accessory: formData.get("isAccessory") === "on"
  };
  const supabase = await getAdminDataClient();
  if (!supabase) {
    if (id) await updateLocalRow("products", id, values);
    else await insertLocalRow("products", values);
    revalidatePublicContent("products", values);
    revalidatePath("/admin/products");
    revalidatePath(`/products/${slug}`);
    redirect("/admin/products");
  }
  const { error } = id
    ? await supabase.from("products").update(values).eq("id", id)
    : await supabase.from("products").insert(values);
  if (error) throw new Error(error.message);
  revalidatePublicContent("products", values);
  revalidatePath("/admin/products");
  revalidatePath(`/products/${slug}`);
  redirect("/admin/products");
}

export async function createSimpleRecord(table: string, path: string, formData: FormData) {
  await requireAdmin();
  if (!allowedTables.has(table)) throw new Error("Unsupported table.");
  const name = String(formData.get("name") || formData.get("title") || "").trim();
  if (name.length < 2) throw new Error("Enter a name or title.");
  const slug = String(formData.get("slug") || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
  const payload: Record<string, unknown> = { slug };
  if (["offers","gallery_items"].includes(table)) payload.title = name;
  else if (table === "faqs") {
    delete payload.slug;
    payload.question = name;
    payload.answer = String(formData.get("description") || "Update this answer.");
  } else if (table === "testimonials") {
    delete payload.slug;
    payload.name = name;
    payload.quote = String(formData.get("description") || "Update this testimonial.");
  } else if (table === "site_settings") {
    delete payload.slug;
    payload.setting_key = name;
    payload.value = String(formData.get("description") || "");
  } else {
    payload.name = name;
  }
  if (!["blog_tags","faqs","testimonials","site_settings"].includes(table)) payload.status = "draft";
  if (formData.get("description") && !["faqs","testimonials","site_settings"].includes(table)) payload.description = String(formData.get("description"));
  const supabase = await getAdminDataClient();
  if (!supabase) {
    await insertLocalRow(table, payload);
    revalidatePublicContent(table, payload);
    revalidatePath(path);
    redirect(path);
  }
  const { error } = await supabase.from(table).insert(payload);
  if (error) throw new Error(error.message);
  revalidatePublicContent(table, payload);
  revalidatePath(path);
  redirect(path);
}

export async function updateSimpleRecord(table: string, id: string, path: string, formData: FormData) {
  await requireAdmin();
  if (!allowedTables.has(table)) throw new Error("Unsupported table.");
  const name = String(formData.get("name") || "").trim();
  const description = String(formData.get("description") || "").trim();
  if (name.length < 2) throw new Error("Enter a valid value.");

  const payload: Record<string, unknown> = {};
  if (["offers", "gallery_items", "blog_posts"].includes(table)) payload.title = name;
  else if (table === "faqs") {
    payload.question = name;
    payload.answer = description || "Update this answer.";
  } else if (table === "testimonials") {
    payload.name = name;
    payload.quote = description || "Update this testimonial.";
  } else if (table === "site_settings") {
    payload.setting_key = name;
    payload.value = description;
  } else if (table === "seo_settings") {
    payload.page_path = name;
    payload.title = description || name;
  } else {
    payload.name = name;
  }

  if (description && !["faqs", "testimonials", "site_settings", "seo_settings"].includes(table)) payload.description = description;

  const supabase = await getAdminDataClient();
  if (!supabase) {
    await updateLocalRow(table, id, payload);
    revalidatePublicContent(table, payload);
    revalidatePath(path);
    redirect(path);
  }
  const { error } = await supabase.from(table).update(payload).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePublicContent(table, payload);
  revalidatePath(path);
  redirect(path);
}

export async function uploadMedia(formData: FormData) {
  await requireAdmin();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) throw new Error("Choose an image.");
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];
  if (!allowed.includes(file.type) || file.size > 5 * 1024 * 1024) throw new Error("Upload a JPG, PNG, WebP or SVG image up to 5 MB.");
  const supabase = await getAdminDataClient();
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-");
  const storagePath = `${new Date().getFullYear()}/${crypto.randomUUID()}-${safeName}`;
  if (!supabase) {
    const publicPath = `/uploads/admin/${storagePath}`;
    const { mkdir, writeFile } = await import("fs/promises");
    const path = await import("path");
    const target = path.join(process.cwd(), "public", "uploads", "admin", storagePath);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, Buffer.from(await file.arrayBuffer()));
    await insertLocalRow("media_assets", { file_name: file.name, storage_path: storagePath, public_url: publicPath, mime_type: file.type, size_bytes: file.size, alt_text: String(formData.get("altText") || "") });
    revalidatePath("/admin/media");
    redirect("/admin/media");
  }
  const upload = await supabase.storage.from("media").upload(storagePath, file, { contentType: file.type, upsert: false });
  if (upload.error) throw new Error(upload.error.message);
  const { data } = supabase.storage.from("media").getPublicUrl(storagePath);
  await supabase.from("media_assets").insert({ file_name: file.name, storage_path: storagePath, public_url: data.publicUrl, mime_type: file.type, size_bytes: file.size, alt_text: String(formData.get("altText") || "") });
  revalidatePath("/admin/media");
  redirect("/admin/media");
}

export async function saveSeoSetting(formData: FormData) {
  await requireAdmin();
  const pagePath = String(formData.get("pagePath") || "").trim();
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  if (!pagePath.startsWith("/") || title.length < 10 || description.length < 50) throw new Error("Enter a valid page path, title and description.");
  const supabase = await getAdminDataClient();
  const values = {
    page_path: pagePath,
    title,
    description,
    canonical_url: String(formData.get("canonicalUrl") || "") || null,
    og_title: String(formData.get("ogTitle") || "") || null,
    og_description: String(formData.get("ogDescription") || "") || null,
    og_image: String(formData.get("ogImage") || "") || null,
    noindex: formData.get("noindex") === "on"
  };
  if (!supabase) {
    await upsertLocalRow("seo_settings", "page_path", values);
    revalidatePath(pagePath);
    revalidatePath("/admin/seo");
    redirect("/admin/seo");
  }
  const { error } = await supabase.from("seo_settings").upsert(values, { onConflict: "page_path" });
  if (error) throw new Error(error.message);
  revalidatePath(pagePath);
  revalidatePath("/admin/seo");
  redirect("/admin/seo");
}
