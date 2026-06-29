import { NextResponse } from "next/server";
import toast from "react-hot-toast";

export function middleware(request) {
  const session = request.cookies.get(
    "better-auth.session_token"
  );

  if (!session) {
    return NextResponse.redirect(
     
      new URL("/login", request.url)

    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile",
    "/dashboard/user",
    "/classes/:id",
    "/community/:id",
  ],
};