'use client'

import Link from "next/link"
import { useState } from "react"
import { useTheme } from "@/lib/theme-provider"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
    { name: "Members", href: "/members" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <nav className="fixed w-full top-0 z-50 py-4 bg-transparent">
      <div className="max-w-6xl mx-auto px-4">

        {/* Pill container */}
        <div className="
          flex items-center justify-between
          bg-slate-900 dark:bg-slate-950
          border border-gray-700/60
          rounded-full px-6 py-2 shadow-lg
        ">

          {/* LEFT — LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/android-chrome-512x512.png"
              alt="CSTR Logo"
              className="h-9 w-9 object-contain"
            />
            <span className="text-xl font-bold text-blue-200">
              CSTR
            </span>
          </Link>

          {/* CENTER — LINKS */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm tracking-wide text-gray-300 hover:text-white transition"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* RIGHT — SUPPORT + THEME + MENU */}
          <div className="flex items-center gap-3">

            {/* Support button */}
            <Link
              href="/support"
              className="hidden md:inline-block border border-blue-400 rounded-full px-4 py-1 text-sm text-white hover:bg-blue-500/20 transition"
            >
              Support
            </Link>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-800 text-gray-300"
            >
              {theme === "light" ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="5" />
                </svg>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-300 rounded-full hover:bg-slate-800"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* MOBILE DROPDOWN */}
        {isOpen && (
          <div className="md:hidden mt-3 bg-slate-900 border border-gray-700 rounded-2xl p-4 space-y-3">

            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-gray-300 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/support"
              className="block border border-blue-400 rounded-full px-4 py-2 text-center text-sm text-white"
              onClick={() => setIsOpen(false)}
            >
              Support
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
