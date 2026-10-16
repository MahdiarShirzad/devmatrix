"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { isUnauthorized, useMe } from "@/hooks/useMe";

/**
 * Client-side auth gate for the dashboard area.
 *
 * Tokens are stored in httpOnly cookies on the API's own domain, so a Next
 * middleware running on the web origin cannot inspect them. We instead rely
 * on the `/auth/me` call (which transparently refreshes an expired access
 * token) and redirect to /login when the session is truly unauthenticated.
 */
export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isPending, isError, error } = useMe();
  const unauthorized = isError && isUnauthorized(error);

  useEffect(() => {
    if (unauthorized) {
      router.replace("/login");
    }
  }, [unauthorized, router]);

  if (isPending || unauthorized) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-3 bg-neutral-bg">
        <Loader2 className="h-7 w-7 animate-spin text-brand-primary" />
        <p className="text-sm text-neutral-text-secondary">
          {unauthorized ? "Redirecting to login…" : "Loading your workspace…"}
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
