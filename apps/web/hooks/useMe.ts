import { useQuery } from "@tanstack/react-query";
import { api, ApiError } from "@/lib/apiclent";
import type { AuthUser } from "@/types/auth.types";

export function useMe() {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => api.get<{ status: string; user: AuthUser }>("/auth/me"),
    select: (res) => res.user,
    retry: false, // a 401 here just means "not logged in" — retrying wastes time
    staleTime: 5 * 60 * 1000, // 5 min — user identity rarely changes mid-session
  });
}

export function isUnauthorized(error: unknown) {
  return error instanceof ApiError && error.status === 401;
}
