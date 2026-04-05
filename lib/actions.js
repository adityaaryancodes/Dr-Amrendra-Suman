"use server";

import crypto from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clearAdminSession, requireAdminSession, setAdminSession, verifyPassword } from "@/lib/auth";
import { createAdminClient, hasAdminSupabaseEnv, storageBucketName } from "@/lib/supabaseClient";
import { normalizeCategory, parseStoragePathFromUrl } from "@/lib/utils";

const defaultFormState = {
  error: "",
  success: ""
};

function safeFileName(name) {
  return String(name || "archive-image")
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, "-")
    .replace(/-+/g, "-");
}

function getFormValue(formData, field) {
  return String(formData.get(field) || "").trim();
}

function getCheckboxValue(formData, field) {
  const value = formData.get(field);
  return value === "on" || value === "true";
}

function buildPostPayload(formData) {
  return {
    title: getFormValue(formData, "title"),
    content: getFormValue(formData, "content"),
    category: normalizeCategory(formData.get("category")),
    type: getFormValue(formData, "type") || "poem",
    published: getCheckboxValue(formData, "published")
  };
}

function getImageFile(formData) {
  const file = formData.get("image");

  if (!file || typeof file.arrayBuffer !== "function" || !file.size) {
    return null;
  }

  return file;
}

function validatePostPayload(payload, { existingImageUrl = "" } = {}) {
  if (!payload.title || !payload.content || !payload.category || !payload.type) {
    return "Title, content, category, and post type are required.";
  }

  if (payload.type === "gallery" && !payload.imageFile && !existingImageUrl) {
    return "Gallery posts require an uploaded image.";
  }

  return "";
}

async function uploadImageToStorage(file) {
  const supabase = createAdminClient();
  const extension = file.name.includes(".") ? file.name.split(".").pop() : "jpg";
  const filePath = `${new Date().getUTCFullYear()}/${crypto.randomUUID()}-${safeFileName(file.name || `archive.${extension}`)}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage.from(storageBucketName).upload(filePath, buffer, {
    contentType: file.type || "image/jpeg",
    upsert: false
  });

  if (error) {
    throw new Error(error.message || "Failed to upload image.");
  }

  const {
    data: { publicUrl }
  } = supabase.storage.from(storageBucketName).getPublicUrl(filePath);

  return publicUrl;
}

async function removeImageFromStorage(imageUrl) {
  const imagePath = parseStoragePathFromUrl(imageUrl);

  if (!imagePath) {
    return;
  }

  const supabase = createAdminClient();
  const { error } = await supabase.storage.from(storageBucketName).remove([imagePath]);

  if (error) {
    console.error("Failed to remove storage image", error);
  }
}

function revalidateArchiveRoutes(post) {
  revalidatePath("/");
  revalidatePath("/poems");
  revalidatePath("/stories");
  revalidatePath("/gallery");
  revalidatePath("/about");
  revalidatePath("/contact");
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/posts");
  revalidatePath("/admin/upload");

  if (post?.id) {
    revalidatePath(`/post/${post.id}`);
  }

  if (post?.type) {
    revalidatePath(`/${post.type === "poem" ? "poems" : post.type === "story" ? "stories" : "gallery"}`);
  }
}

export async function loginAdminAction(previousState = defaultFormState, formData) {
  if (!hasAdminSupabaseEnv()) {
    return {
      error: "Supabase admin environment variables are missing."
    };
  }

  const email = getFormValue(formData, "email").toLowerCase();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return {
      error: "Email and password are required."
    };
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase.from("admin_users").select("*").eq("email", email).maybeSingle();

  if (error || !data) {
    return {
      error: "Invalid email or password."
    };
  }

  const passwordMatches = await verifyPassword(password, data.password);

  if (!passwordMatches) {
    return {
      error: "Invalid email or password."
    };
  }

  await setAdminSession({
    id: data.id,
    email: data.email
  });

  redirect("/admin/dashboard");
}

export async function logoutAdminAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function createPostAction(previousState = defaultFormState, formData) {
  await requireAdminSession();

  if (!hasAdminSupabaseEnv()) {
    return {
      error: "Supabase admin environment variables are missing."
    };
  }

  const payload = buildPostPayload(formData);
  payload.imageFile = getImageFile(formData);

  const validationError = validatePostPayload(payload);

  if (validationError) {
    return {
      error: validationError
    };
  }

  let uploadedImageUrl = "";
  let createdPost = null;

  try {
    if (payload.imageFile) {
      uploadedImageUrl = await uploadImageToStorage(payload.imageFile);
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("posts")
      .insert({
        title: payload.title,
        content: payload.content,
        image_url: uploadedImageUrl || null,
        category: payload.category,
        type: payload.type,
        published: payload.published
      })
      .select("*")
      .single();

    if (error) {
      throw new Error(error.message || "Failed to create post.");
    }

    createdPost = data;
  } catch (error) {
    if (uploadedImageUrl) {
      await removeImageFromStorage(uploadedImageUrl);
    }

    return {
      error: error.message || "Failed to create post."
    };
  }

  revalidateArchiveRoutes(createdPost);
  redirect("/admin/posts?status=created");
}

export async function updatePostAction(postId, previousState = defaultFormState, formData) {
  await requireAdminSession();

  if (!hasAdminSupabaseEnv()) {
    return {
      error: "Supabase admin environment variables are missing."
    };
  }

  const payload = buildPostPayload(formData);
  payload.imageFile = getImageFile(formData);
  const existingImageUrl = getFormValue(formData, "existingImageUrl");
  const previousType = getFormValue(formData, "existingType");

  const validationError = validatePostPayload(payload, { existingImageUrl });

  if (validationError) {
    return {
      error: validationError
    };
  }

  let nextImageUrl = existingImageUrl;
  let uploadedImageUrl = "";
  let updatedPost = null;

  try {
    if (payload.imageFile) {
      uploadedImageUrl = await uploadImageToStorage(payload.imageFile);
      nextImageUrl = uploadedImageUrl;
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("posts")
      .update({
        title: payload.title,
        content: payload.content,
        image_url: nextImageUrl || null,
        category: payload.category,
        type: payload.type,
        published: payload.published
      })
      .eq("id", postId)
      .select("*")
      .single();

    if (error) {
      throw new Error(error.message || "Failed to update post.");
    }

    updatedPost = data;
  } catch (error) {
    if (uploadedImageUrl) {
      await removeImageFromStorage(uploadedImageUrl);
    }

    return {
      error: error.message || "Failed to update post."
    };
  }

  if (uploadedImageUrl && existingImageUrl && existingImageUrl !== uploadedImageUrl) {
    await removeImageFromStorage(existingImageUrl);
  }

  revalidateArchiveRoutes(updatedPost);

  if (previousType && previousType !== updatedPost.type) {
    revalidatePath(`/${previousType === "poem" ? "poems" : previousType === "story" ? "stories" : "gallery"}`);
  }

  redirect("/admin/posts?status=updated");
}

export async function deletePostAction(postId, imageUrl, type) {
  await requireAdminSession();

  if (!hasAdminSupabaseEnv()) {
    redirect("/admin/posts?status=error");
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("posts").delete().eq("id", postId);

  if (error) {
    console.error("Failed to delete post", error);
    redirect("/admin/posts?status=error");
  }

  if (imageUrl) {
    await removeImageFromStorage(imageUrl);
  }

  revalidateArchiveRoutes({
    id: postId,
    type
  });

  redirect("/admin/posts?status=deleted");
}

export async function submitContactAction(previousState = defaultFormState, formData) {
  const name = getFormValue(formData, "name");
  const email = getFormValue(formData, "email");
  const subject = getFormValue(formData, "subject");
  const message = getFormValue(formData, "message");

  if (!name || !email || !message) {
    return {
      error: "Name, email, and message are required.",
      success: ""
    };
  }

  if (!hasAdminSupabaseEnv()) {
    return {
      error: "Contact storage is not configured yet.",
      success: ""
    };
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("contact_messages").insert({
    name,
    email,
    subject,
    message
  });

  if (error) {
    return {
      error: error.message || "Failed to send message.",
      success: ""
    };
  }

  revalidatePath("/contact");

  return {
    error: "",
    success: "Message sent successfully. Thank you for reaching out."
  };
}
