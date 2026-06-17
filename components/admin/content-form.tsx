import { saveBlogPost, saveProduct } from "@/app/admin/actions";

const field = "admin-input h-11";
const area = "admin-input min-h-32 py-3";

export function BlogPostForm({ post }: { post?: Record<string, unknown> }) {
  return (
    <form action={saveBlogPost} className="admin-panel mt-8 grid max-w-4xl gap-5">
      {Boolean(post?.id) && <input type="hidden" name="id" value={String(post?.id)} />}
      <label className="grid gap-2 text-sm font-bold">Title<input name="title" required defaultValue={String(post?.title || "")} className={field} /></label>
      <label className="grid gap-2 text-sm font-bold">Slug<input name="slug" required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" defaultValue={String(post?.slug || "")} className={field} /></label>
      <label className="grid gap-2 text-sm font-bold">Excerpt<textarea name="excerpt" required defaultValue={String(post?.excerpt || "")} className={area} /></label>
      <label className="grid gap-2 text-sm font-bold">Content<textarea name="content" required defaultValue={String(post?.content || "")} className="admin-input min-h-80 py-3" /></label>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold">Status<select name="status" defaultValue={String(post?.status || "draft")} className={field}><option value="draft">Draft</option><option value="published">Published</option></select></label>
        <label className="grid gap-2 text-sm font-bold">SEO title<input name="metaTitle" defaultValue={String(post?.meta_title || "")} className={field} /></label>
      </div>
      <label className="grid gap-2 text-sm font-bold">SEO description<textarea name="metaDescription" defaultValue={String(post?.meta_description || "")} className={area} /></label>
      <button className="admin-primary-btn h-12">Save blog post</button>
    </form>
  );
}

type Option = { id: string; name: string };

export function ProductForm({ product, categories = [], brands = [] }: { product?: Record<string, unknown>; categories?: Option[]; brands?: Option[] }) {
  return (
    <form action={saveProduct} className="admin-panel mt-8 grid max-w-4xl gap-5">
      {Boolean(product?.id) && <input type="hidden" name="id" value={String(product?.id)} />}
      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold">Product name<input name="name" required defaultValue={String(product?.name || "")} className={field} /></label>
        <label className="grid gap-2 text-sm font-bold">Slug<input name="slug" required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" defaultValue={String(product?.slug || "")} className={field} /></label>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold">Category<select name="categoryId" defaultValue={String(product?.category_id || "")} className={field}><option value="">Unassigned</option>{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
        <label className="grid gap-2 text-sm font-bold">Brand<select name="brandId" defaultValue={String(product?.brand_id || "")} className={field}><option value="">Unassigned</option>{brands.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
      </div>
      <label className="grid gap-2 text-sm font-bold">Short description<textarea name="shortDescription" defaultValue={String(product?.short_description || "")} className={area} /></label>
      <label className="grid gap-2 text-sm font-bold">Full description<textarea name="fullDescription" defaultValue={String(product?.full_description || "")} className={area} /></label>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold">Image URL<input name="imageUrl" defaultValue={String(product?.image_url || "")} className={field} /></label>
        <label className="grid gap-2 text-sm font-bold">Image alt text<input name="imageAlt" defaultValue={String(product?.image_alt || "")} className={field} /></label>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold">Status<select name="status" defaultValue={String(product?.status || "draft")} className={field}><option value="draft">Draft</option><option value="published">Published</option></select></label>
        <label className="grid gap-2 text-sm font-bold">SEO title<input name="seoTitle" defaultValue={String(product?.seo_title || "")} className={field} /></label>
      </div>
      <div className="flex flex-wrap gap-5">
        <label className="flex items-center gap-2 text-sm font-bold"><input name="isNewArrival" type="checkbox" defaultChecked={Boolean(product?.is_new_arrival)} className="size-5" /> New arrival</label>
        <label className="flex items-center gap-2 text-sm font-bold"><input name="isFeatured" type="checkbox" defaultChecked={Boolean(product?.is_featured)} className="size-5" /> Featured</label>
        <label className="flex items-center gap-2 text-sm font-bold"><input name="isAccessory" type="checkbox" defaultChecked={Boolean(product?.is_accessory)} className="size-5" /> Accessory</label>
      </div>
      <label className="grid gap-2 text-sm font-bold">SEO description<textarea name="seoDescription" defaultValue={String(product?.seo_description || "")} className={area} /></label>
      <button className="admin-primary-btn h-12">{product ? "Update product" : "Create product"}</button>
    </form>
  );
}
