import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import AuthNavbar from "@/components/navbars/AuthNavbar.tsx";
import { useAuthStore } from "@/lib/auth/auth.store.ts";

export const Route = createFileRoute("/(auth)")({
  component: AuthLayout,
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (isAuthenticated) {
      throw redirect({ to: "/dashboard" });
    }
  },
});

function AuthLayout() {
  return (
    <>
      <AuthNavbar />
      <main className="bg-muted grid min-h-[calc(100dvh-4rem)] place-items-center">
        <Outlet />
      </main>
    </>
  );
}
