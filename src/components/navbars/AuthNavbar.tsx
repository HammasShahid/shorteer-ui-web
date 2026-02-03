import { Link } from '@tanstack/react-router'
import Logo from '@/components/Logo.tsx'

export default function AuthNavbar() {
  return (
    <header className="h-16 flex items-center px-6">
      <Link to="/">
        <Logo />
      </Link>
    </header>
  )
}