import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import AppNavbar from "@/components/navbars/AppNavbar.tsx";
import { useAuthStore } from "@/lib/auth/auth.store.ts";

export const Route = createFileRoute("/(app)")({
  beforeLoad: () => {
    if (!useAuthStore.getState().isAuthenticated) {
      throw redirect({ to: "/login" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <AppNavbar />
      <Outlet />
    </>
  );
}
