"use client"
import { useSession, signIn } from "next-auth/react"
import  Dashboard  from "../Dashboard/page"

export default function Page() {
  const { data: session, status } = useSession()
    if (session) {
    return (
      <>
       <Dashboard/>
      </>
    )
  }


  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[#F5ECD7] flex items-center justify-center px-4 py-10 sm:px-6">
      <div className="w-full max-w-md bg-[#FAF3E8] rounded-3xl p-6 sm:p-8 border border-[#E8D8BC] shadow-[0_24px_70px_rgba(76,50,28,0.12)]">


        <div className="text-center mb-8">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2c1a0e] text-2xl text-[#FDF6EC] shadow-md">
            ☕
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1e1a14] mb-3">
            Welcome to BrewSupport
          </h1>
          <p className="text-[#8a7260] text-sm leading-relaxed">
            Login or create an account to receive support from your fans.
          </p>
        </div>

        <button
          type="button"
          disabled={status === "loading"}
          onClick={() => signIn("github", { callbackUrl: "/Dashboard" })}
          className="w-full flex items-center justify-center gap-3 px-5 py-4 rounded-2xl bg-[#2c1a0e] text-white shadow-md hover:bg-[#4a2e1a] active:scale-[0.98] disabled:cursor-wait disabled:opacity-60 transition-all"
        >
          <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          <span className="font-semibold">Continue with GitHub</span>
        </button>

        <p className="text-center text-xs text-[#a08878] mt-5">
          By continuing, you agree to our Terms and Privacy Policy.
        </p>

      </div>
    </main>
  );
}
