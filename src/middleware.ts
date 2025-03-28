import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

const protectedRoutes = ["/chat"];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected) {
    const session = await auth();
  
    if (!session) {
      const redirectUrl = new URL("/signin", request.url);
      redirectUrl.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except for API routes, static files, and images
    "/((?!api|_next/static|_next/image|favicon.ico|images).*)",
    // Explicitly include protected routes
    "/chat",
    "/chat/:path*"
  ],
};