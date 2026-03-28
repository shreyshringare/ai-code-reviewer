import { NextResponse } from "next/server";
import { createSupabaseMiddleware } from "./lib/supabase";

export async function middleware(request) {
  const response = NextResponse.next({ request });
  const supabase = createSupabaseMiddleware(request, response);

  // Refresh session cookie if expired — keeps the user signed in
  const { data: { user } } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Protect all dashboard routes — redirect to login if no session
  if (pathname.startsWith("/dashboard") && !user) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If already logged in, redirect away from auth pages
  if ((pathname.startsWith("/auth/login") || pathname.startsWith("/auth/signup")) && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  // Run middleware on all routes except static files and Next.js internals
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
