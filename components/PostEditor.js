"use client";

import { useActionState, useState } from "react";
import SubmitButton from "@/components/SubmitButton";

const initialState = {
  error: ""
};

export default function PostEditor({ action, submitLabel, pendingLabel, post = null, categories = [] }) {
  const [state, formAction] = useActionState(action, initialState);
  const [preview, setPreview] = useState(post?.image_url || "");

  function handleFileChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      setPreview(post?.image_url || "");
      return;
    }

    setPreview(URL.createObjectURL(file));
  }

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="existingImageUrl" value={post?.image_url || ""} />
      <input type="hidden" name="existingType" value={post?.type || ""} />

      <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <div className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <input
              id="title"
              name="title"
              defaultValue={post?.title || ""}
              required
              className="h-12 w-full rounded-2xl border border-border bg-transparent px-4 text-sm outline-none transition focus:border-accent"
              placeholder="Enter the title of the work"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium">
                Type
              </label>
              <select
                id="type"
                name="type"
                defaultValue={post?.type || "poem"}
                className="h-12 w-full rounded-2xl border border-border bg-transparent px-4 text-sm outline-none transition focus:border-accent"
              >
                <option value="poem">Poem</option>
                <option value="story">Story</option>
                <option value="gallery">Gallery</option>
              </select>
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label htmlFor="category" className="text-sm font-medium">
                Category
              </label>
              <input
                id="category"
                name="category"
                list="archive-categories"
                defaultValue={post?.category || ""}
                required
                className="h-12 w-full rounded-2xl border border-border bg-transparent px-4 text-sm outline-none transition focus:border-accent"
                placeholder="Poem, Essay, Journal, Reflection"
              />
              <datalist id="archive-categories">
                {categories.map((category) => (
                  <option key={category} value={category} />
                ))}
              </datalist>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              defaultValue={post?.content || ""}
              required
              rows={12}
              className="w-full rounded-[24px] border border-border bg-transparent px-4 py-3 text-sm leading-7 outline-none transition focus:border-accent"
              placeholder="Write the poem, story, or gallery caption here."
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="image" className="text-sm font-medium">
              Cover image or gallery image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              onChange={handleFileChange}
              className="block w-full rounded-2xl border border-dashed border-border px-4 py-4 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
            />
            <p className="text-xs leading-6 text-muted">
              Required for gallery posts. Optional for poems and stories. Leave empty while editing to keep the current image.
            </p>
          </div>

          <label className="flex items-center gap-3 rounded-2xl border border-border px-4 py-3 text-sm text-muted">
            <input type="checkbox" name="published" defaultChecked={post?.published ?? true} className="h-4 w-4 rounded border-border text-accent" />
            Publish this post publicly
          </label>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-medium text-muted">Preview</p>
          <div className="overflow-hidden rounded-[28px] border border-border bg-surface shadow-card">
            {preview ? (
              <img src={preview} alt="Post preview" className="h-full w-full object-cover" />
            ) : (
              <div className="flex min-h-[360px] items-center justify-center px-8 text-center text-sm leading-7 text-muted">
                Add an image if you want a cover or gallery preview.
              </div>
            )}
          </div>
        </div>
      </div>

      {state?.error ? (
        <div className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200 dark:text-red-200">
          {state.error}
        </div>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <SubmitButton label={submitLabel} pendingLabel={pendingLabel} />
      </div>
    </form>
  );
}
