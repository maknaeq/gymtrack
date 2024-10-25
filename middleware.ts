import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await auth();
  const { pathname, origin } = req.nextUrl;

  if (
    !session &&
    pathname !== "/login" &&
    pathname !== "/signup" &&
    pathname !== "/"
  ) {
    return NextResponse.redirect(new URL("/login", origin));
  }

  if (session && pathname === "/") {
    return NextResponse.redirect(new URL("/sessions", origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/sessions", "/performances", "/goals", "/login", "/signup"],
};
