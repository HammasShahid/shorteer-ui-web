import { Link } from "@tanstack/react-router";
import Logo from '@/components/Logo.tsx'

export default function PublicNavbar() {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link to="/">
          <Logo />
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className="text-muted-foreground hover:text-foreground text-sm"
          >
            Features
          </Link>

          <Link to="/login" className="text-sm">
            Login
          </Link>

          <Link
            to="/register"
            className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}
