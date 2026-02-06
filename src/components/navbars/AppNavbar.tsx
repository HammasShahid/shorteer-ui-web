import { Link } from "@tanstack/react-router";
import Logo from "@/components/Logo.tsx";
import Logout from "@/components/Logout";

export default function AppNavbar() {
  return (
    <header className="bg-background border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Left */}
        <div className="flex items-center gap-6">
          <Link to="/dashboard">
            <Logo />
          </Link>

          <nav className="flex items-center gap-4">
            <Link to="/dashboard" className="text-sm">
              Dashboard
            </Link>
            <Link to="/urls" className="text-sm">
              URLs
            </Link>
            <Link to="/analytics" className="text-sm">
              Analytics
            </Link>
          </nav>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground text-sm">user@email.com</span>

          <Logout>
            <button className="text-sm text-red-500 hover:underline">
              Logout
            </button>
          </Logout>
        </div>
      </div>
    </header>
  );
}
