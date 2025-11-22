import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwt } from "@/lib/jwt";
const protectedPaths = ["/dashboard", "/products"];
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!protectedPaths.some((p) => pathname.startsWith(p)))
    return NextResponse.next();
  const cookie = req.cookies.get("token")?.value;
  if (!cookie) return redirectLogin(req);
  const payload = await verifyJwt(cookie);
  if (!payload) return redirectLogin(req);
  // attach user to headers for RSC
  const headers = new Headers(req.headers);
  headers.set("x-user", JSON.stringify(payload));
  return NextResponse.next({ request: { headers } });
}
function redirectLogin(req: NextRequest) {
  return NextResponse.redirect(new URL("/login", req.url));
}
export const config = { matcher: ["/dashboard/:path*", "/products/:path*"] };
