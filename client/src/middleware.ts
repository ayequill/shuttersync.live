import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

const publicRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/welcome",
  "/verify-email",
  "email-verified",
  "/",
];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret });
  const isPublic = publicRoutes.some((route) =>
    route.startsWith(req.nextUrl.pathname),
  );
  if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/signin", req.nextUrl).toString());
  }
  if (token && isPublic) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl).toString());
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|.*\\.webp$).*)'],
};
