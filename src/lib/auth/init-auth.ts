import { useAuthStore } from "@/lib/auth/auth.store.ts";
import { me, refresh } from "@/lib/api/auth.ts";
import { setAccessToken } from "@/lib/api/client.ts";

let initialized = false;

export const initAuth = async () => {
  if (initialized) return;
  initialized = true;
  try {
    const { token } = await refresh();
    setAccessToken(token);
    const user = await me();

    useAuthStore.getState().setAuth({ user, accessToken: token });
  } catch {
    useAuthStore.getState().clearAuth();
  }
};
