"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import Navbar from "../components/Navbar"
import  Dashboard  from "../Dashboard/page"
import Username from "../[username]/page"

export default function Page() {
  const { data: session } = useSession()
    if (session) {
    return (
      <>
       <Dashboard/>
      </>
    )
  }


  return (
    <div className="min-h-screen bg-[#F5ECD7] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#FAF3E8] rounded-3xl p-8 border border-[#E8D8BC]">


        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-[#1e1a14] mb-3">
            Welcome to our site
          </h1>
          <p className="text-[#8a7260] text-sm leading-relaxed">
            Login or create an account to receive support from your fans.
          </p>
        </div>

        <button className="w-full flex items-center gap-4 px-5 py-4 mb-3 rounded-2xl border border-[#E2D0B8] bg-white hover:bg-[#fdf7ef] transition-all">
          <svg width="22" height="22" viewBox="0 0 18 18" fill="none">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908C16.658 14.253 17.64 11.945 17.64 9.2z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
            <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
          </svg>
          <span className="font-medium text-[#1e1a14]">Continue with Google</span>
        </button>
        <button onClick={() => signIn("github")} className="w-full flex items-center gap-4 px-5 py-4 mb-3 rounded-2xl border border-[#E2D0B8] bg-white hover:bg-[#fdf7ef] transition-all">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          <span className="font-medium text-[#1e1a14]">Continue with Github</span>
        </button>
        <button className="w-full flex items-center gap-4 px-5 py-4 mb-3 rounded-2xl border border-[#E2D0B8] bg-white hover:bg-[#fdf7ef] transition-all">
          <svg width="22" height="22" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
          </svg>
          <span className="font-medium text-[#1e1a14]">Continue with Facebook</span>
        </button>

        <button className="w-full flex items-center gap-4 px-5 py-4 mb-3 rounded-2xl border border-[#E2D0B8] bg-white hover:bg-[#fdf7ef] transition-all">
          <svg width="22" height="22" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="#0A66C2"/>
          </svg>
          <span className="font-medium text-[#1e1a14]">Continue with LinkedIn</span>
        </button>
        <button className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl border border-[#E2D0B8] bg-white hover:bg-[#fdf7ef] transition-all">
          <svg width="20" height="22" viewBox="0 0 814 1000" fill="currentColor">
            <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 405.6 60.3 303.3 71 250.8c33.3-182.6 198.9-250.7 261.2-250.7 83.9 0 156.1 54.6 206.9 54.6 47.5 0 127.8-59.6 225.6-59.6 42.8 0 166.8 5.8 235.7 107.3zM456.7 100.2c-8.4-55.8 5.8-109.3 31.3-145.8C518.7-84.1 577-107 625.5-106.5c3.2 54.5-12.8 107.3-43.3 145.8-30.4 40.2-87.4 71.9-125.5 60.9z"/>
          </svg>
          <span className="font-medium text-[#1e1a14]">Continue with Apple</span>
        </button>
        <div className="relative flex items-center my-6">
          <div className="flex-1 border-t border-[#ddd0bb]" />
          <span className="mx-4 text-xs text-[#a08878]">OR</span>
          <div className="flex-1 border-t border-[#ddd0bb]" />
        </div>
        <button className="w-full bg-[#6b5344] hover:bg-[#5a4438] text-white py-4 rounded-2xl font-semibold text-base transition-all">
          Continue with Email
        </button>

        <p className="text-center text-xs text-[#a08878] mt-5">
          By continuing, you agree to our Terms and Privacy Policy.
        </p>

      </div>
    </div>
  );
}