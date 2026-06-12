"use client"
import { useState, useEffect, useRef } from "react"
import { searchusers } from "@/actions/useraction"
import { useRouter } from "next/navigation"

export default function Home() {
    const [query, setquery] = useState("")
    const [results, setresults] = useState([])
    const [loading, setloading] = useState(false)
    const [showdropdown, setshowdropdown] = useState(false)
    const debounceref = useRef(null)
    const wrapperref = useRef(null)
    const router = useRouter()

    useEffect(() => {
        if (debounceref.current) clearTimeout(debounceref.current)
        if (query.trim().length < 2) {
            setresults([])
            setshowdropdown(false)
            return
        }
        setloading(true)
        debounceref.current = setTimeout(async () => {
            const res = await searchusers(query)
            setresults(res)
            setshowdropdown(true)
            setloading(false)
        }, 400)
    }, [query])

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleclick = (e) => {
            if (wrapperref.current && !wrapperref.current.contains(e.target)) {
                setshowdropdown(false)
            }
        }
        document.addEventListener("mousedown", handleclick)
        return () => document.removeEventListener("mousedown", handleclick)
    }, [])

    const handleselect = (username) => {
        setshowdropdown(false)
        setquery("")
        router.push(`/${username}`)
    }

    return (
        <main className="flex min-h-screen flex-col px-4 py-8 sm:px-6 sm:py-12 lg:px-8" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
            <section className="w-full max-w-5xl mx-auto pt-8 sm:pt-16 pb-12 sm:pb-16 text-center">

                <div className="inline-flex items-center gap-2 bg-[#f5e6c8] border border-[#ddc99a] text-[#7a5c2e] text-xs font-medium px-4 py-1.5 rounded-full mb-8 tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c8922a] animate-pulse inline-block" />
                    No platform fees. Ever.
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl text-[#2c1a0e] leading-[1.08] tracking-tight mb-6 break-words">
                    Let your fans <br />
                    <em className="italic text-[#b07d3a]">fuel your work</em>
                </h1>

                <p className="text-base sm:text-lg text-[#7a6652] max-w-xl mx-auto leading-relaxed mb-10">
                    A simple way for creators to receive support from their fans, without platform fees or commission.
                </p>

                {/* Search Bar */}
                <div ref={wrapperref} className="relative max-w-md mx-auto mb-10">
                    <div className="flex items-center gap-2 bg-white border border-[#d4bfa0] rounded-full px-5 py-3 shadow-sm focus-within:border-[#b07d3a] focus-within:ring-2 focus-within:ring-[#b07d3a]/20 transition-all">
                        <svg className="w-4 h-4 text-[#b09a7a] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                        </svg>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setquery(e.target.value)}
                            placeholder="Search for a creator..."
                            className="flex-1 bg-transparent text-sm text-[#2c1a0e] placeholder-[#b09a7a] outline-none"
                        />
                        {loading && (
                            <svg className="w-4 h-4 text-[#b07d3a] animate-spin flex-shrink-0" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                        )}
                    </div>

                    {/* Dropdown */}
                    {showdropdown && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#e8dcc8] rounded-2xl shadow-lg overflow-hidden z-50">
                            {results.length === 0 ? (
                                <p className="text-sm text-[#b09a7a] text-center py-4 px-5">No creators found for "{query}"</p>
                            ) : (
                                <ul>
                                    {results.map((user) => (
                                        <li
                                            key={user._id}
                                            onClick={() => handleselect(user.username)}
                                            className="flex items-center gap-3 px-4 py-3 hover:bg-[#faf5ec] cursor-pointer transition-colors border-b border-[#f0e8d8] last:border-0"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#b8832a] to-[#7a4f1e] text-white flex items-center justify-center font-bold text-sm flex-shrink-0 overflow-hidden">
                                                {user.profilepic ? (
                                                    <img src={user.profilepic} alt={user.username} className="w-full h-full object-cover" />
                                                ) : (
                                                    user.username?.charAt(0).toUpperCase()
                                                )}
                                            </div>
                                            <div className="text-left">
                                                <p className="text-sm font-semibold text-[#2c1a0e]">{user.name || user.username}</p>
                                                <p className="text-xs text-[#b09a7a]">@{user.username}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </div>

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

            <section className="w-full max-w-5xl mx-auto py-12 sm:py-20">
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

            <section className="w-full max-w-5xl mx-auto py-12 sm:py-20">
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

            <section className="w-full max-w-5xl mx-auto py-12 sm:py-20 text-center">
                <h2 className="text-3xl sm:text-4xl text-[#2c1a0e] leading-tight mb-4">
                    Ready to <em className="italic text-[#b07d3a]">receive support?</em>
                </h2>
                <p className="text-sm text-[#7a6652] mb-8 max-w-lg mx-auto">Set up your page in under 2 minutes. Build a creator-first support page, start accepting contributions, and keep 100% of what your fans give.</p>
                <a href="/login" className="inline-block bg-[#b07d3a] text-white text-sm font-medium px-8 py-3.5 rounded-full hover:bg-[#8f6228] active:scale-95 transition-all">
                    Start for free ☕
                </a>
            </section>
        </main>
    )
}