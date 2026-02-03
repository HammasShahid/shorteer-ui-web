import { Link } from "@tanstack/react-router";
import Logo from '@/components/Logo.tsx'

export default function AppNavbar() {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
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
          <span className="text-sm text-muted-foreground">
            user@email.com
          </span>

          <button className="text-sm text-red-500 hover:underline">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
