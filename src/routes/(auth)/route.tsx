import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)")({
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <main className="min-h-dvh bg-muted grid place-items-center">
      <Outlet />
    </main>
  );
}
