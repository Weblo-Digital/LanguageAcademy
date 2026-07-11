import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Skip static assets, specific files, and authentication API routes
  if (
    path.startsWith("/_next") ||
    path.startsWith("/api/auth") ||
    path.includes(".")
  ) {
    return NextResponse.next();
  }

  // ── Maintenance Mode Check ──
  const maintenanceMode = request.cookies.get("__maintenance")?.value;
  if (
    maintenanceMode === "true" &&
    !path.startsWith("/admin") &&
    !path.startsWith("/maintenance")
  ) {
    // Check if the user has an active admin session cookie to bypass maintenance
    const sessionToken =
      request.cookies.get("next-auth.session-token")?.value ??
      request.cookies.get("__Secure-next-auth.session-token")?.value;

    if (!sessionToken) {
      return NextResponse.rewrite(new URL("/maintenance", request.url));
    }
  }

  // ── Coming Soon Mode Check ──
  const comingSoon = request.cookies.get("__coming_soon_routes")?.value;
  if (comingSoon && !path.startsWith("/admin") && !path.startsWith("/coming-soon")) {
    try {
      const routes = JSON.parse(comingSoon) as string[];
      if (routes.some((r) => path === r || path.startsWith(r + "/"))) {
        return NextResponse.rewrite(new URL("/coming-soon", request.url));
      }
    } catch {
      // Ignored
    }
  }

  // ── Admin Panel Route Protection ──
  if (path.startsWith("/admin") && !path.startsWith("/admin/login")) {
    const sessionToken =
      request.cookies.get("next-auth.session-token")?.value ??
      request.cookies.get("__Secure-next-auth.session-token")?.value;

    if (!sessionToken) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|icon.png|robots.txt|sitemap.xml|images/|fonts/).*)",
  ],
};
