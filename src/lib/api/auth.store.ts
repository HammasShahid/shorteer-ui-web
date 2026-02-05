import { create } from "zustand";
import { setAccessToken } from "@/lib/api/client.ts";

type AuthState = {
  user: null | { id: string; email: string; username: string };
  isAuthenticated: boolean;
  setAuth: (data: { accessToken: string; user: AuthState["user"] }) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => {
  return {
    user: null,
    isAuthenticated: false,
    setAuth: ({ accessToken, user }) => {
      setAccessToken(accessToken);
      set({
        user,
        isAuthenticated: true,
      });
    },
    clearAuth: () => {
      setAccessToken(null);
      set({
        user: null,
        isAuthenticated: false,
      });
    },
  };
});
