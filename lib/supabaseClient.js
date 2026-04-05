import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function hasPublicSupabaseEnv() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export function hasAdminSupabaseEnv() {
  return Boolean(supabaseUrl && supabaseServiceRoleKey);
}

export function createPublicClient() {
  if (!hasPublicSupabaseEnv()) {
    return null;
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}

export function createAdminClient() {
  if (!hasAdminSupabaseEnv()) {
    throw new Error("Missing Supabase service role configuration.");
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}

export const storageBucketName = "poetry-images";
