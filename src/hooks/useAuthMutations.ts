import { useMutation } from "@tanstack/react-query";
import {
  type JWTResponse,
  login,
  me,
  register,
  type RegisterUserResponse,
} from "@/lib/api/auth.ts";
import { setAccessToken } from "@/lib/api/client.ts";
import { useAuthStore } from "@/lib/api/auth.store.ts";
import type { AxiosError } from "axios";
import { LoginSchema, RegisterUserSchema } from "@/schemas";
import z from "zod";
import { useNavigate } from "@tanstack/react-router";

export function useAuthMutations() {
  const { setAuth, clearAuth } = useAuthStore();
  const navigate = useNavigate();

  const loginMutation = useMutation<
    JWTResponse,
    AxiosError<{ message?: string }>,
    z.infer<typeof LoginSchema>
  >({
    mutationFn: login,
    onSuccess: async (data) => {
      try {
        setAccessToken(data.token);
        const { id, email, username } = await me();
        setAuth({
          accessToken: data.token,
          user: { id, email, username },
        });
        await navigate({ to: "/dashboard", replace: true });
      } catch {
        setAccessToken(null);
        clearAuth();
      }
    },
  });

  const registerMutation = useMutation<
    RegisterUserResponse,
    AxiosError<{ message?: string }>,
    z.infer<typeof RegisterUserSchema>
  >({
    mutationFn: register,
  });

  return { registerMutation, loginMutation };
}
