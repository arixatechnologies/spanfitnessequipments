import { saveBrand, saveCategory, saveProduct } from "@/app/admin/actions";

const field = "admin-input h-11";
const area = "admin-input min-h-32 py-3";

type Option = { id: string; name: string };

function featuresValue(value: unknown) {
  if (Array.isArray(value)) return value.map(String).join("\n");
  return String(value || "");
}

export function CategoryForm({ category }: { category?: Record<string, unknown> }) {
  const imageUrl = String(category?.image_url || "");

  return (
    <form action={saveCategory} className="admin-panel mt-8 grid max-w-4xl gap-5">
      {Boolean(category?.id) && <input type="hidden" name="id" value={String(category?.id)} />}
      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold">Heading / category name<input name="name" required defaultValue={String(category?.name || "")} className={field} /></label>
        <label className="grid gap-2 text-sm font-bold">Slug<input name="slug" required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" defaultValue={String(category?.slug || "")} className={field} /></label>
      </div>
      <label className="grid gap-2 text-sm font-bold">Subheading / top line<input name="tagline" placeholder="Build endurance with every session." defaultValue={String(category?.tagline || "")} className={field} /></label>
      <label className="grid gap-2 text-sm font-bold">Description<textarea name="description" required defaultValue={String(category?.description || "")} className={area} /></label>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold">Image URL<input name="imageUrl" placeholder="/images/categories/cardio-equipment-premium.png" defaultValue={imageUrl} className={field} /></label>
        <label className="grid gap-2 text-sm font-bold">Upload new image<input name="imageFile" type="file" accept="image/jpeg,image/png,image/webp,image/svg+xml" className="admin-input h-11 py-2" /></label>
      </div>
      {imageUrl && <a href={imageUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-coral">Open current image</a>}
      <label className="grid gap-2 text-sm font-bold">Image alt text<input name="imageAlt" defaultValue={String(category?.image_alt || category?.name || "")} className={field} /></label>
      <label className="grid gap-2 text-sm font-bold">Highlights / features<textarea name="features" placeholder="Commercial and home-use options&#10;Modern consoles&#10;Multiple motor capacities" defaultValue={featuresValue(category?.features)} className={area} /></label>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold">Status<select name="status" defaultValue={String(category?.status || "draft")} className={field}><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></label>
        <label className="grid gap-2 text-sm font-bold">Sort order<input name="sortOrder" type="number" defaultValue={String(category?.sort_order || 0)} className={field} /></label>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="flex items-center gap-2 text-sm font-bold"><input name="featured" type="checkbox" defaultChecked={Boolean(category?.featured)} className="size-5" /> Featured category</label>
        <label className="grid gap-2 text-sm font-bold">SEO title<input name="seoTitle" defaultValue={String(category?.seo_title || category?.name || "")} className={field} /></label>
      </div>
      <label className="grid gap-2 text-sm font-bold">SEO description<textarea name="seoDescription" defaultValue={String(category?.seo_description || category?.description || "")} className={area} /></label>
      <button className="admin-primary-btn h-12">{category ? "Update category" : "Create category"}</button>
    </form>
  );
}

export function BrandForm({ brand }: { brand?: Record<string, unknown> }) {
  return (
    <form action={saveBrand} className="admin-panel mt-8 grid max-w-4xl gap-5">
      {Boolean(brand?.id) && <input type="hidden" name="id" value={String(brand?.id)} />}
      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold">Brand name<input name="name" required defaultValue={String(brand?.name || "")} className={field} /></label>
        <label className="grid gap-2 text-sm font-bold">Slug<input name="slug" required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" defaultValue={String(brand?.slug || "")} className={field} /></label>
      </div>
      <label className="grid gap-2 text-sm font-bold">
        Home subtitle / specialties
        <textarea
          name="specialties"
          placeholder="Treadmills&#10;Home fitness&#10;Cardio equipment"
          defaultValue={featuresValue(brand?.specialties)}
          className={area}
        />
        <span className="text-xs font-semibold text-white/45">The first line appears below the brand name on the home page.</span>
      </label>
      <label className="grid gap-2 text-sm font-bold">Description<textarea name="description" required defaultValue={String(brand?.description || "")} className={area} /></label>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold">Logo URL<input name="logoUrl" placeholder="/images/brands/welcare.png" defaultValue={String(brand?.logo_url || "")} className={field} /></label>
        <label className="grid gap-2 text-sm font-bold">Logo alt text<input name="imageAlt" defaultValue={String(brand?.image_alt || brand?.name || "")} className={field} /></label>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold">Status<select name="status" defaultValue={String(brand?.status || "draft")} className={field}><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></label>
        <label className="grid gap-2 text-sm font-bold">Sort order<input name="sortOrder" type="number" defaultValue={String(brand?.sort_order || 0)} className={field} /></label>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="flex items-center gap-2 text-sm font-bold"><input name="featured" type="checkbox" defaultChecked={Boolean(brand?.featured)} className="size-5" /> Featured brand</label>
        <label className="grid gap-2 text-sm font-bold">SEO title<input name="seoTitle" defaultValue={String(brand?.seo_title || brand?.name || "")} className={field} /></label>
      </div>
      <label className="grid gap-2 text-sm font-bold">SEO description<textarea name="seoDescription" defaultValue={String(brand?.seo_description || brand?.description || "")} className={area} /></label>
      <button className="admin-primary-btn h-12">{brand ? "Update brand" : "Create brand"}</button>
    </form>
  );
}

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
