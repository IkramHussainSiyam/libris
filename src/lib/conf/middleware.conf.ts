import { NextRequest } from "next/server";
import { Session } from "../auth";

const privateRoutes = [
  "/settings",
  "/reviews/edit",
  "/reviews/create",
  "/notifications",
];
const authRoutes = ["/login", "/signup"];
const adminRoute = "/admin";

export function isIndexRoute(pathname: string) {
  return pathname === "/";
}

export function isPrivateRoute(pathname: string) {
  return privateRoutes.some((route) => pathname.startsWith(route));
}

export function isAuthRoute(pathname: string) {
  return authRoutes.some((route) => pathname.startsWith(route));
}

export function isAdminRoute(pathname: string) {
  return pathname.startsWith(adminRoute);
}

export async function fetchSession(request: NextRequest): Promise<Session> {
  try {
    const res = await fetch(
      `${process.env.BETTER_AUTH_URL}/api/auth/get-session`,
      {
        method: "GET",
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
      }
    );

    if (!res.ok) throw new Error(res.statusText);

    return res.json();
  } catch (error) {
    throw error;
  }
}
