import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { initAuth } from "@/lib/auth/init-auth.ts";

export const Route = createRootRouteWithContext()({
  beforeLoad: async () => {
    await initAuth();
  },
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
