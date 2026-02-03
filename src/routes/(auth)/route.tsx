import { createFileRoute, Outlet } from "@tanstack/react-router";
import AuthNavbar from "@/components/navbars/AuthNavbar.tsx";

export const Route = createFileRoute("/(auth)")({
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <>
      <AuthNavbar />
      <main className="bg-muted min-h-[calc(100dvh-4rem)] grid place-items-center">
        <Outlet />
      </main>
    </>
  );
}
