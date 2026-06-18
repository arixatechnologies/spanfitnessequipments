"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { saveBlogPostWithState } from "@/app/admin/actions";

const field = "admin-input h-11";
const area = "admin-input min-h-32 py-3";

type BlogOption = {
  id: string;
  name: string;
};

function makeSlug(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, 120);
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className="admin-primary-btn h-12" disabled={pending}>
      {pending ? "Saving..." : "Save blog post"}
    </button>
  );
}

export function BlogPostForm({
  post,
  categories = [],
  tagNames = "",
}: {
  post?: Record<string, unknown>;
  categories?: BlogOption[];
  tagNames?: string;
}) {
  const initialTitle = String(post?.title || "");
  const [state, action] = useActionState(saveBlogPostWithState, {});
  const [title, setTitle] = useState(initialTitle);
  const [slug, setSlug] = useState(String(post?.slug || makeSlug(initialTitle)));
  const [slugEdited, setSlugEdited] = useState(Boolean(post?.slug));
  const [metaTitle, setMetaTitle] = useState(String(post?.meta_title || ""));

  function updateTitle(nextTitle: string) {
    setTitle(nextTitle);
    if (!slugEdited) setSlug(makeSlug(nextTitle));
  }

  return (
    <form action={action} className="admin-panel mt-8 grid max-w-4xl gap-5">
      {Boolean(post?.id) && <input type="hidden" name="id" value={String(post?.id)} />}
      {state.error && (
        <div className="admin-alert border-red-400/30 bg-red-500/10 text-red-100" role="alert">
          {state.error}
        </div>
      )}

      <label className="grid gap-2 text-sm font-bold">
        Title
        <input
          name="title"
          required
          value={title}
          onChange={(event) => updateTitle(event.target.value)}
          className={field}
        />
      </label>

      <label className="grid gap-2 text-sm font-bold">
        Slug
        <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
          <input
            name="slug"
            required
            pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
            value={slug}
            onChange={(event) => {
              setSlug(makeSlug(event.target.value));
              setSlugEdited(true);
            }}
            className={field}
          />
          <button
            type="button"
            onClick={() => {
              setSlug(makeSlug(title));
              setSlugEdited(false);
            }}
            className="admin-secondary-btn h-11"
          >
            Regenerate
          </button>
        </div>
        <span className="text-xs font-semibold text-white/45">Auto-generated from the title. You can edit it if needed.</span>
      </label>

      <label className="grid gap-2 text-sm font-bold">Excerpt<textarea name="excerpt" required defaultValue={String(post?.excerpt || "")} className={area} /></label>
      <label className="grid gap-2 text-sm font-bold">Content<textarea name="content" required defaultValue={String(post?.content || "")} className="admin-input min-h-80 py-3" /></label>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold">
          Blog category
          <select name="categoryId" defaultValue={String(post?.category_id || "")} className={field}>
            <option value="">Unassigned</option>
            {categories.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold">
          Blog tags
          <input name="tagNames" defaultValue={tagNames} placeholder="Buying guide, Gym setup, Maintenance" className={field} />
          <span className="text-xs font-semibold text-white/45">Optional. Separate multiple tags with commas.</span>
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold">Status<select name="status" defaultValue={String(post?.status || "draft")} className={field}><option value="draft">Draft</option><option value="published">Published</option></select></label>
        <label className="grid gap-2 text-sm font-bold">
          SEO title
          <input
            name="metaTitle"
            value={metaTitle}
            maxLength={70}
            onChange={(event) => setMetaTitle(event.target.value)}
            className={field}
          />
          <span className="text-xs font-semibold text-white/45">{metaTitle.length}/70 characters</span>
        </label>
      </div>

      <label className="grid gap-2 text-sm font-bold">
        SEO description
        <textarea name="metaDescription" maxLength={170} defaultValue={String(post?.meta_description || "")} className={area} />
        <span className="text-xs font-semibold text-white/45">Maximum 170 characters.</span>
      </label>

      <SubmitButton />
    </form>
  );
}
