import { hasEnvAdminSessionCookie } from "./admin-session";
import { createAdminClient } from "./supabase/admin";
import { createClient } from "./supabase/server";

export async function getAdminDataClient() {
  if (await hasEnvAdminSessionCookie()) {
    const adminClient = createAdminClient();
    if (adminClient) return adminClient;
  }
  return createClient();
}
