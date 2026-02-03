import { createFileRoute, Outlet } from "@tanstack/react-router";
import PublicNavbar from "@/components/navbars/PublicNavbar.tsx";

export const Route = createFileRoute("/(public)")({
  component: PublicLayout,
});

function PublicLayout() {
  return (
    <>
      <PublicNavbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
