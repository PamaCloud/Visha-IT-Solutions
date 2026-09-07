import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Protected Admin Routes - enforce session cookie check before even serving HTML
  const isProtectedAdminRoute =
    pathname.startsWith("/admin/dashboard") ||
    pathname.startsWith("/admin/services") ||
    pathname.startsWith("/admin/projects") ||
    pathname.startsWith("/admin/training") ||
    pathname.startsWith("/admin/jobs") ||
    pathname.startsWith("/admin/applications") ||
    pathname.startsWith("/admin/enquiries") ||
    pathname.startsWith("/admin/stock") ||
    pathname.startsWith("/admin/categories") ||
    pathname.startsWith("/admin/reviews");

  if (isProtectedAdminRoute) {
    const sessionToken =
      request.cookies.get("next-auth.session-token")?.value ||
      request.cookies.get("__Secure-next-auth.session-token")?.value;

    if (!sessionToken) {
      // Force redirect to login and prevent any caching of protected admin content
      const loginUrl = new URL("/admin/login", request.url);
      const redirectRes = NextResponse.redirect(loginUrl);
      redirectRes.headers.set(
        "Cache-Control",
        "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0"
      );
      redirectRes.headers.set("Pragma", "no-cache");
      redirectRes.headers.set("Expires", "0");
      redirectRes.headers.set("Surrogate-Control", "no-store");
      return redirectRes;
    }
  }

  // 2. Strict Anti-Caching & Security Headers for ALL admin routes and APIs
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const response = NextResponse.next();
    // Aggressive anti-caching headers preventing browser bfcache and proxy caching
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    response.headers.set("Surrogate-Control", "no-store");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};
