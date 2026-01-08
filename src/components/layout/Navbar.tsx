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
    <nav className="fixed w-full top-0 z-50 py-4">
      <div className="max-w-6xl mx-auto px-4">

        {/* PILL CONTAINER */}
        <div
          className="
            flex items-center justify-between
            rounded-full px-6 py-2 shadow-lg backdrop-blur
            border
            bg-white/80 border-gray-300
            dark:bg-slate-950/80 dark:border-gray-700
          "
        >

          {/* LEFT — LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/android-chrome-512x512.png"
              alt="CSTR Logo"
              className="h-9 w-9 object-contain"
            />
            <span className="
              text-xl font-bold tracking-wide
              text-gray-900
              dark:text-blue-200
            ">
              CSTR
            </span>
          </Link>

          {/* CENTER — LINKS */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="
                  text-sm font-medium tracking-wide
                  text-gray-700 hover:text-black
                  dark:text-gray-300 dark:hover:text-white
                  transition
                "
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* RIGHT — SUPPORT + THEME + MENU */}
          <div className="flex items-center gap-3">

            {/* SUPPORT BUTTON */}
            <Link
              href="/support"
              className="
                hidden md:inline-block
                rounded-full px-4 py-1 text-sm font-medium
                border
                border-blue-600 text-blue-600
                hover:bg-blue-600 hover:text-white
                dark:border-blue-400 dark:text-blue-400
                dark:hover:bg-blue-500/20
                transition
              "
            >
              Support
            </Link>

            {/* THEME TOGGLE */}
            <button
              onClick={toggleTheme}
              className="
                p-2 rounded-full
                text-gray-700 hover:bg-gray-200
                dark:text-gray-300 dark:hover:bg-slate-800
                transition
              "
            >
              {theme === "light" ? (
                /* Moon */
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                /* Sun */
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="5" />
                </svg>
              )}
            </button>

            {/* MOBILE MENU */}
            <button
              className="
                md:hidden p-2 rounded-full
                text-gray-700 hover:bg-gray-200
                dark:text-gray-300 dark:hover:bg-slate-800
              "
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
          <div
            className="
              md:hidden mt-3 rounded-2xl p-4 space-y-3
              border shadow-lg
              bg-white border-gray-300
              dark:bg-slate-950 dark:border-gray-700
            "
          >
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="
                  block font-medium
                  text-gray-700 hover:text-black
                  dark:text-gray-300 dark:hover:text-white
                "
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/support"
              className="
                block text-center text-sm font-medium
                rounded-full px-4 py-2
                border border-blue-600 text-blue-600
                dark:border-blue-400 dark:text-blue-400
              "
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
