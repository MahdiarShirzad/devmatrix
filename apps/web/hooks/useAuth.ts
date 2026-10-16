import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/apiClient";
import type { AuthResponse } from "@/types/auth.types";
import type { LoginFormValues, RegisterFormValues } from "@/lib/auth.schemas";

export function useLogin() {
  return useMutation({
    mutationFn: (values: LoginFormValues) =>
      api.post<AuthResponse>("/auth/login", values),
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (values: RegisterFormValues) =>
      api.post<AuthResponse>("/auth/register", values),
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.post<void>("/auth/logout"),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["auth", "me"] });
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: { name: string }) =>
      api.patch<AuthResponse>("/auth/me", values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    },
  });
}
