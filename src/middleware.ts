import { NextRequest, NextResponse } from "next/server";
import {
  fetchSession,
  isAdminRoute,
  isAuthRoute,
  isIndexRoute,
  isPrivateRoute,
} from "./lib/conf/middleware.conf";
import { isAdmin } from "./lib/db/_config/main";
import { routes } from "./lib/static-data/routes";

export const middleware = async (request: NextRequest) => {
  const userLoggedIn = await fetchSession(request);
  const pathname = request.nextUrl.pathname;

  // if user not logged in, he's not allowed to visit private routes
  if ((isPrivateRoute(pathname) || isAdminRoute(pathname)) && !userLoggedIn) {
    return NextResponse.redirect(new URL(routes.auth.login, request.url));
  }

  // if user not an admin. his not allowed to visit admin routes
  if (
    isAdminRoute(pathname) &&
    userLoggedIn &&
    !isAdmin(userLoggedIn.user.email)
  ) {
    return NextResponse.redirect(new URL(routes.social.list, request.url));
  }

  // if user is logged in, he's not allowed to visit auth routes & (home / index) route
  if ((isAuthRoute(pathname) || isIndexRoute(pathname)) && userLoggedIn) {
    return NextResponse.redirect(new URL(routes.social.list, request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/settings/:path*",
    "/reviews/:path*",
    "/admin/:path*",
    "/notifications",
  ],
};
