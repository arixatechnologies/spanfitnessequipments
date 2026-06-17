import { hasEnvAdminSessionCookie } from "./admin-session";
import { createClient } from "./supabase/server";

export async function getAdminDataClient() {
  if (await hasEnvAdminSessionCookie()) return null;
  return createClient();
}
