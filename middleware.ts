import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await auth();
  console.log("session", session?.user);
  const { pathname, origin } = req.nextUrl;

  if (
    !session?.user &&
    pathname !== "/login" &&
    pathname !== "/signup" &&
    pathname !== "/"
  ) {
    return NextResponse.redirect(new URL("/login", origin));
  }

  if (session?.user && pathname === "/") {
    return NextResponse.redirect(new URL("/sessions", origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/sessions", "/performances", "/goals", "/login", "/signup"],
};
