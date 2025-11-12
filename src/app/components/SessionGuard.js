"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Loader from "./Loader";

export default function SessionGuard({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  // 🚨 Pages that require authentication
  const protectedRoutes = ["/dashboard", "/account"];

  // 🚨 Any route starting with "/auth" is considered an auth page
  const isAuthPage = pathname.startsWith("/auth");
  const isProtectedPage = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  useEffect(() => {
    if (status === "authenticated" && isAuthPage) {
      // 🚨 Already logged in → redirect away from auth pages
      router.replace("/dashboard");
    } else if (status === "unauthenticated" && isProtectedPage) {
      // 🚨 Not logged in → block protected pages
      router.replace("/auth/login");
    }
  }, [status, isAuthPage, isProtectedPage, router]);

  // 🚨 Always block rendering until session is resolved
  if (status === "loading") return <Loader />;

  // 🚨 Auth pages → allow if not logged in
  if (isAuthPage && status === "unauthenticated") return <>{children}</>;

  // 🚨 Protected pages → allow only if logged in
  if (isProtectedPage && status === "authenticated" && session)
    return <>{children}</>;

  // 🚨 Public pages → allow always
  if (!isProtectedPage && !isAuthPage) return <>{children}</>;

  // 🚨 Block everything else (safety fallback)
  return <Loader />;
}
