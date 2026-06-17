import { uploadMedia } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/auth";

export default async function MediaUploadPage() {
  await requireAdmin();
  return <main className="p-5 sm:p-8"><p className="text-xs font-black uppercase tracking-widest text-coral">Media Library</p><h1 className="mt-2 font-display text-4xl font-black">Upload image</h1><form action={uploadMedia} className="mt-8 grid max-w-2xl gap-5 rounded-2xl border border-white/10 bg-[#101a38] p-6"><label className="grid gap-2 text-sm font-bold">Image<input name="file" type="file" required accept="image/jpeg,image/png,image/webp,image/svg+xml" className="rounded-lg border border-white/10 bg-navy p-3" /></label><label className="grid gap-2 text-sm font-bold">Alt text<input name="altText" required className="h-11 rounded-lg border border-white/10 bg-navy px-3 outline-none focus:border-coral" /></label><p className="text-xs text-white/45">Accepted: JPG, PNG, WebP and SVG. Maximum 5 MB. In local admin mode files are saved to <code>public/uploads/admin</code>.</p><button className="h-12 rounded-lg bg-gradient-to-r from-ember to-coral px-6 font-bold">Upload image</button></form></main>;
}
