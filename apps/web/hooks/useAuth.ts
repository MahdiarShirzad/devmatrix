import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/apiclent";
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
  return useMutation({
    mutationFn: () => api.post<void>("/auth/logout"),
  });
}
