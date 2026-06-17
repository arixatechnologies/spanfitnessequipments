import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const adminCookieName = "span_admin_session";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  if (isAdminRoute && request.nextUrl.pathname !== "/admin/login" && request.cookies.has(adminCookieName)) return response;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return response;
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      }
    }
  });
  const { data } = await supabase.auth.getUser();
  if (isAdminRoute && request.nextUrl.pathname !== "/admin/login" && !data.user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  return response;
}

export const config = { matcher: ["/admin/:path*", "/((?!_next/static|_next/image|favicon.ico).*)"] };
