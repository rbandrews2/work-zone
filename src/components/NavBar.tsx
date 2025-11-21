"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/training", label: "Training" },
  { href: "/jobs", label: "Jobs" },
  { href: "/messages", label: "Messages" },
  { href: "/dashboard/ai-vision", label: "AI Vision" },

]

export function NavBar() {
  const pathname = usePathname()

  return (
    <nav className="w-full bg-wz_black/80 backdrop-blur-md border-b border-wz_border shadow-inset_glow">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-wider">
          Work Zone OS
        </Link>

        {/* Navigation links */}
        <div className="flex items-center gap-6">
          {links.map((link) => {
            const active = pathname.startsWith(link.href)

            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  active
                    ? "text-wz_yellow font-semibold"
                    : "text-gray-300 hover:text-wz_yellow_glow transition"
                }
              >
                {link.label}
              </Link>
            )
          })}

          {/* Login button */}
          <Link
            href="/login"
            className="px-3 py-1 border border-wz_yellow rounded hover:bg-wz_yellow hover:text-black transition"
          >
            Login
          </Link>

          {/* App version (from env) */}
          <span className="ml-4 text-xs text-slate-400 hidden sm:inline">
            {process.env.NEXT_PUBLIC_APP_VERSION ?? "V0.04"}
          </span>
        </div>

      </div>
    </nav>
  )
}
