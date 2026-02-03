import { createFileRoute, Outlet } from '@tanstack/react-router'
import AppNavbar from '@/components/navbars/AppNavbar.tsx'

export const Route = createFileRoute('/(app)')({
  component: RouteComponent,
})

function RouteComponent() {
  return <>
    <AppNavbar />
    <Outlet />
  </>
}
