import { cache } from "react";
import { getFallbackAuthor, getLocalArchiveCategories, getLocalArchivePostById, getLocalArchivePosts } from "@/lib/localContent";
import { createAdminClient, createPublicClient, hasAdminSupabaseEnv, hasPublicSupabaseEnv } from "@/lib/supabaseClient";

function normalizePost(post) {
  return {
    ...post,
    content: post.content || post.description || "",
    image_url: post.image_url || "",
    type: post.type || "poem",
    published: post.published !== false
  };
}

function isMissingTableError(error, tableName) {
  return error?.code === "PGRST205" && String(error?.message || "").includes(tableName);
}

export async function getPosts({ type = "", query = "", category = "", limit, includeUnpublished = false } = {}) {
  if (!hasPublicSupabaseEnv()) {
    return getLocalArchivePosts({ type, query, category, limit, includeUnpublished });
  }

  const supabase = createPublicClient();
  let request = supabase.from("posts").select("*").order("created_at", { ascending: false });

  if (!includeUnpublished) {
    request = request.eq("published", true);
  }

  if (type) {
    request = request.eq("type", type);
  }

  if (query) {
    request = request.ilike("title", `%${query}%`);
  }

  if (category) {
    request = request.eq("category", category);
  }

  if (limit) {
    request = request.limit(limit);
  }

  const { data, error } = await request;

  if (error) {
    if (isMissingTableError(error, "public.posts")) {
      return getLocalArchivePosts({ type, query, category, limit, includeUnpublished });
    }

    console.error("Failed to fetch posts", error);
    return getLocalArchivePosts({ type, query, category, limit, includeUnpublished });
  }

  const normalized = (data || []).map(normalizePost);
  return normalized.length ? normalized : getLocalArchivePosts({ type, query, category, limit, includeUnpublished });
}

export async function getPoems(options = {}) {
  return getPosts({ ...options, type: "poem" });
}

export async function getStories(options = {}) {
  return getPosts({ ...options, type: "story" });
}

export async function getGalleryPosts(options = {}) {
  return getPosts({ ...options, type: "gallery" });
}

export const getCategories = cache(async ({ type = "" } = {}) => {
  if (!hasPublicSupabaseEnv()) {
    return getLocalArchiveCategories({ type });
  }

  const supabase = createPublicClient();
  let request = supabase.from("posts").select("category").eq("published", true).not("category", "is", null);

  if (type) {
    request = request.eq("type", type);
  }

  const { data, error } = await request;

  if (error) {
    if (isMissingTableError(error, "public.posts")) {
      return getLocalArchiveCategories({ type });
    }

    console.error("Failed to fetch categories", error);
    return getLocalArchiveCategories({ type });
  }

  const categories = Array.from(new Set((data || []).map((item) => item.category).filter(Boolean))).sort((left, right) =>
    left.localeCompare(right)
  );

  return categories.length ? categories : getLocalArchiveCategories({ type });
});

export const getPostById = cache(async (id) => {
  if (!hasPublicSupabaseEnv()) {
    return getLocalArchivePostById(id);
  }

  const supabase = createPublicClient();
  const { data, error } = await supabase.from("posts").select("*").eq("id", id).eq("published", true).maybeSingle();

  if (error) {
    if (isMissingTableError(error, "public.posts")) {
      return getLocalArchivePostById(id);
    }

    console.error("Failed to fetch post", error);
    return getLocalArchivePostById(id);
  }

  return data ? normalizePost(data) : getLocalArchivePostById(id);
});

export const getAuthorProfile = cache(async () => {
  if (!hasPublicSupabaseEnv()) {
    return getFallbackAuthor();
  }

  const supabase = createPublicClient();
  const { data, error } = await supabase.from("author").select("*").limit(1).maybeSingle();

  if (error) {
    if (isMissingTableError(error, "public.author")) {
      return getFallbackAuthor();
    }

    console.error("Failed to fetch author profile", error);
    return getFallbackAuthor();
  }

  if (!data) {
    return getFallbackAuthor();
  }

  return {
    ...getFallbackAuthor(),
    ...data
  };
});

export const getAdminDashboardData = cache(async () => {
  if (!hasAdminSupabaseEnv()) {
    return {
      totalPosts: 0,
      publishedPosts: 0,
      poemCount: 0,
      storyCount: 0,
      galleryCount: 0,
      latestPosts: [],
      categories: []
    };
  }

  const supabase = createAdminClient();
  const [totalResult, publishedResult, poemResult, storyResult, galleryResult, latestResult, categoryResult] = await Promise.all([
    supabase.from("posts").select("*", { count: "exact", head: true }),
    supabase.from("posts").select("*", { count: "exact", head: true }).eq("published", true),
    supabase.from("posts").select("*", { count: "exact", head: true }).eq("type", "poem"),
    supabase.from("posts").select("*", { count: "exact", head: true }).eq("type", "story"),
    supabase.from("posts").select("*", { count: "exact", head: true }).eq("type", "gallery"),
    supabase.from("posts").select("*").order("created_at", { ascending: false }).limit(8),
    supabase.from("posts").select("category").not("category", "is", null)
  ]);

  const errors = [
    totalResult.error,
    publishedResult.error,
    poemResult.error,
    storyResult.error,
    galleryResult.error,
    latestResult.error,
    categoryResult.error
  ].filter(Boolean);

  for (const error of errors) {
    if (!isMissingTableError(error, "public.posts")) {
      console.error("Failed to fetch dashboard data", error);
    }
  }

  return {
    totalPosts: totalResult.count || 0,
    publishedPosts: publishedResult.count || 0,
    poemCount: poemResult.count || 0,
    storyCount: storyResult.count || 0,
    galleryCount: galleryResult.count || 0,
    latestPosts: (latestResult.data || []).map(normalizePost),
    categories: Array.from(new Set((categoryResult.data || []).map((item) => item.category).filter(Boolean))).sort((left, right) =>
      left.localeCompare(right)
    )
  };
});

export async function getAdminPosts({ type = "" } = {}) {
  if (!hasAdminSupabaseEnv()) {
    return [];
  }

  const supabase = createAdminClient();
  let request = supabase.from("posts").select("*").order("created_at", { ascending: false });

  if (type) {
    request = request.eq("type", type);
  }

  const { data, error } = await request;

  if (error) {
    if (!isMissingTableError(error, "public.posts")) {
      console.error("Failed to fetch admin posts", error);
    }

    return [];
  }

  return (data || []).map(normalizePost);
}

export async function getAdminPostById(id) {
  if (!hasAdminSupabaseEnv()) {
    return null;
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();

  if (error) {
    if (!isMissingTableError(error, "public.posts")) {
      console.error("Failed to fetch admin post", error);
    }

    return null;
  }

  return data ? normalizePost(data) : null;
}

export const getAdminCategories = cache(async () => {
  const posts = await getAdminPosts();
  return Array.from(new Set(posts.map((post) => post.category).filter(Boolean))).sort((left, right) =>
    left.localeCompare(right)
  );
});
