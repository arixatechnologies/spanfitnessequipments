import { redirect } from "next/navigation";
import { getEnvAdminUser } from "./admin-session";
import { createClient } from "./supabase/server";

export async function getAdminUser() {
  const envAdmin = await getEnvAdminUser();
  if (envAdmin) return envAdmin;

  const supabase = await createClient();
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  if (!data.user) return null;
  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", data.user.id)
    .maybeSingle();
  return profile?.role === "admin" ? { ...data.user, profile } : null;
}

export async function requireAdmin() {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");
  return user;
}
