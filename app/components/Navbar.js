"use client"
import React from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className='  top-0 left-0 right-0  bg-[rgba(253,246,236,0.85)] border-b black flex justify-between content-center p-4 px-15 pr-28' >
      <Link href={"/"}>
      <div
      className="font-serif text-[#271E14] font-bold text-[1.4rem]">Brew<span className='text-[#C8761A]'>
      Support</span></div>
      </Link>
      <ul className="flex content-center justify-center gap-4 text-[#7A6A55] text-[0.9rem]">
        {!session && <>

          <li><Link href={"/login"}>login</Link></li>
        </>}
        {session &&
        <li className='pt-1.5'>
          <Link href={"/Dashboard"}>
          Dashboard
        </Link>
        </li>
        }
  {session &&
        <li className='pt-1.5'>
          <Link href={`/${session.user.name}`}>
          My Page
        </Link>
        </li>
        }
      {session && <li className='pt-1.5  '>{session.user.email}</li>}
      {session && <button  onClick={() => signOut()}  className='inline-block bg-[#b07d3a] text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-[#8f6228] active:scale-95 transition-all'>Sign out</button>}
      </ul>
    </nav>
  )
}