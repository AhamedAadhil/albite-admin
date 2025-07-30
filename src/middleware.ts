import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Define public routes here
const PUBLIC_ROUTES = ["/auth/login"];

const verifyToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );
    return payload;
  } catch (err) {
    return null;
  }
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Allow public route(s)
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // 2. Only protect '/' and '/dishes' for now
  const protectedRoutes = ["/", "/dishes"];
  const isProtected = protectedRoutes.includes(pathname);

  if (isProtected) {
    const token = request.cookies.get("token")?.value;

    if (!token || !(await verifyToken(token))) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // 3. Redirect '/' to '/dashboard' if token is valid
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dishes",
    "/dishes/:path*",
    "/dashboard",
    "/users",
    "/users/:path*",
    "/orders",
    "/orders/:path*",
    "/carousels",
    "/carousels/:path*",
    "/add-ons",
    "/add-ons/:path*",
    "/auth/login",
  ],
};
