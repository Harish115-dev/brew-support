"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import link from "next/link"
export default function Home() {

  return (
    <div className="flex flex-col min-h-[100vh] px-6 sm:px-[8rem] py-16" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      <section className="w-full max-w-5xl mx-auto pt-10 sm:pt-20 pb-16 text-center">

        <div className="inline-flex items-center gap-2 bg-[#f5e6c8] border border-[#ddc99a] text-[#7a5c2e] text-xs font-medium px-4 py-1.5 rounded-full mb-8 tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c8922a] animate-pulse inline-block" />
          No platform fees. Ever.
        </div>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl text-[#2c1a0e] leading-[1.08] tracking-tight mb-6">
          Let your fans <br />
          <em className="italic text-[#b07d3a]">fuel your work</em>
        </h1>

        <p className="text-base sm:text-lg text-[#7a6652] max-w-xl mx-auto leading-relaxed mb-10">
          A simple way for creators to receive support from their fans, without platform fees or commission.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="/login" className="w-full sm:w-auto bg-[#2c1a0e] text-[#FDF6EC] text-sm font-medium px-7 py-3.5 rounded-full hover:bg-[#4a2e1a] active:scale-95 transition-all text-center">
            Create your page →
          </a>
          <a href="/login" className="w-full sm:w-auto border border-[#d4bfa0] text-[#7a6652] text-sm px-7 py-3.5 rounded-full hover:border-[#b07d3a] hover:text-[#2c1a0e] transition-all text-center">
            Get started
          </a>
        </div>

        <p className="text-xs text-[#b09a7a] mt-6 tracking-wide">
          Trusted by <span className="text-[#2c1a0e] font-medium">12,000+</span> creators worldwide
        </p>
      </section>

      <div className="w-full max-w-5xl mx-auto">
        <div className="border-t border-[#e8dcc8]" />
      </div>
      <section className="w-full max-w-5xl mx-auto py-16 sm:py-24">
        <p className="text-xs text-[#b09a7a] tracking-[0.2em] uppercase text-center mb-12">Why creators choose BrewSupport</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: "🫶", title: "One-time support", desc: "Let fans buy you a coffee — a simple, heartfelt way to show appreciation." },
            { icon: "💳", title: "Fast payouts", desc: "Receive funds directly to your account with no platform holds or hidden fees." },
            { icon: "🔒", title: "Secure payments", desc: "Supporters pay safely and transparently, while you stay in full control of your page." },
            { icon: "🌐", title: "Share anywhere", desc: "Use your unique support link on social media, email, and creator bios." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-white border border-[#e8dcc8] rounded-2xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <span className="text-2xl mb-4 block">{icon}</span>
              <h3 className="text-[#2c1a0e] font-semibold text-base mb-2">{title}</h3>
              <p className="text-sm text-[#7a6652] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>
      <div className="w-full max-w-5xl mx-auto">
        <div className="border-t border-[#e8dcc8]" />
      </div>
      <section className="w-full max-w-5xl mx-auto py-16 sm:py-24">
        <h2 className="text-3xl sm:text-4xl text-[#2c1a0e] leading-tight text-center mb-6">
          How BrewSupport works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#e8dcc8] rounded-2xl p-6 hover:shadow-md transition-all duration-200">
            <span className="text-3xl mb-4 block">1</span>
            <h3 className="text-[#2c1a0e] font-semibold text-lg mb-2">Create your support page</h3>
            <p className="text-sm text-[#7a6652] leading-relaxed">Sign up in minutes and build a beautiful fan support page that reflects your brand.</p>
          </div>
          <div className="bg-white border border-[#e8dcc8] rounded-2xl p-6 hover:shadow-md transition-all duration-200">
            <span className="text-3xl mb-4 block">2</span>
            <h3 className="text-[#2c1a0e] font-semibold text-lg mb-2">Share with your audience</h3>
            <p className="text-sm text-[#7a6652] leading-relaxed">Post your link on Instagram, YouTube, Twitter, or your website and let fans support you instantly.</p>
          </div>
          <div className="bg-white border border-[#e8dcc8] rounded-2xl p-6 hover:shadow-md transition-all duration-200">
            <span className="text-3xl mb-4 block">3</span>
            <h3 className="text-[#2c1a0e] font-semibold text-lg mb-2">Receive support with ease</h3>
            <p className="text-sm text-[#7a6652] leading-relaxed">Track contributions, manage your page, and enjoy every supporter connection without extra fees.</p>
          </div>
        </div>
      </section>
      <div className="w-full max-w-5xl mx-auto">
        <div className="border-t border-[#e8dcc8]" />
      </div>
      <section className="w-full max-w-5xl mx-auto py-16 sm:py-24 text-center">
        <h2 className="text-3xl sm:text-4xl text-[#2c1a0e] leading-tight mb-4">
          Ready to <em className="italic text-[#b07d3a]">receive support?</em>
        </h2>
        <p className="text-sm text-[#7a6652] mb-8 max-w-lg mx-auto">Set up your page in under 2 minutes. Build a creator-first support page, start accepting contributions, and keep 100% of what your fans give.</p>
        <a href="/login" className="inline-block bg-[#b07d3a] text-white text-sm font-medium px-8 py-3.5 rounded-full hover:bg-[#8f6228] active:scale-95 transition-all">
          Start for free ☕
        </a>
      </section>



    </div>
  );
}
