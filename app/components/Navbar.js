"use client"
import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from "next-auth/react"

export default function Navbar() {
  const { data: session, status } = useSession()

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#e8dcc8] bg-[rgba(253,246,236,0.92)] backdrop-blur-md">
      <div className="mx-auto flex min-h-16 max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0 font-serif text-xl font-bold text-[#271E14] sm:text-[1.4rem]">
          Brew<span className="text-[#C8761A]">Support</span>
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-2 text-sm text-[#7A6A55] sm:gap-4">
          {status !== "loading" && !session && (
            <Link
              href="/login"
              className="rounded-full bg-[#2c1a0e] px-5 py-2.5 font-semibold text-[#FDF6EC] shadow-sm transition hover:bg-[#4a2e1a] active:scale-95"
            >
              Log in
            </Link>
          )}

          {session && (
            <>
              <Link href="/Dashboard" className="rounded-full px-2 py-2 font-medium transition hover:text-[#2c1a0e]">
                Dashboard
              </Link>
              <Link href={`/${session.user.name}`} className="rounded-full px-2 py-2 font-medium transition hover:text-[#2c1a0e]">
                My Page
              </Link>
              <span className="hidden max-w-52 truncate text-xs text-[#9a8065] lg:block">
                {session.user.email}
              </span>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="inline-flex items-center gap-2 rounded-full border border-[#b07d3a] bg-[#b07d3a] px-4 py-2.5 font-semibold text-white shadow-sm transition hover:border-[#8f6228] hover:bg-[#8f6228] active:scale-95"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="2">
                  <path d="M10 17l5-5-5-5M15 12H3M15 4h4a2 2 0 012 2v12a2 2 0 01-2 2h-4" />
                </svg>
                <span className="hidden sm:inline">Sign out</span>
                <span className="sm:hidden">Exit</span>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
