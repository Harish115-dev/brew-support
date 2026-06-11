"use client"
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { updateprofile } from '@/actions/useraction'
import { fetchuser } from '@/actions/useraction'
import { useEffect } from 'react'
import { useState } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const { data: session, update } = useSession()
  const [form, setform] = useState({})
  const router = useRouter()

  const handlesubmit = async (e) => {
    e.preventDefault()
    try {
      await update()
      await updateprofile(form, session.user.name)
      toast('Profile updated successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        onClose: () => {
          router.push(`/${form.username}`)
        }
      });
    } catch (err) {
      console.error('Profile update failed', err)
      toast.error('Failed to update profile', { position: 'top-right' })
    }
  }
  const getdata = async () => {
    if (!session?.user?.name) return

    let a = await fetchuser(session.user.name)
    setform(a || {})
  }
  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if (session?.user?.name) {
      getdata()
    }

    if (session === null) {
      router.push("/login")
    }
  }, [session])


  return (<>
     <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
    <form onSubmit={handlesubmit} >
      <div className="min-h-screen bg-[#f5ede0] text-[#2d1a0e]" style={{ fontFamily: "'Lora', Georgia, serif" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@400;500;600&display=swap');`}</style>

        <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 sm:py-10">

          <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
            <button type="button" onClick={() => signOut({ callbackUrl: "/" })} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#2d1a0e] bg-[#2d1a0e] text-[#f5ede0] text-sm font-semibold font-sans shadow-sm hover:bg-[#1a0e06] active:scale-95 transition-all">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="2">
                <path d="M10 17l5-5-5-5M15 12H3M15 4h4a2 2 0 012 2v12a2 2 0 01-2 2h-4" />
              </svg>
              Sign out
            </button>
          </div>

          <div className="bg-white border border-[rgba(45,26,14,0.08)] rounded-2xl p-4 sm:p-6 mb-4">
            <p className="text-sm font-semibold font-sans mb-4">Cover Image</p>
            <div className="h-36 rounded-xl bg-gradient-to-br from-[#e8d5b7] via-[#d4b896] to-[#c9a87a] flex items-center justify-center mb-3">
              <p className="text-sm text-[#7a5c3e] font-sans">No cover image</p>
            </div>
            <input
              name="coverpic"
              value={form.coverpic? form.coverpic : ""}
              onChange={handlechange}
              type="text"
              placeholder="Enter cover image URL"
              className="w-full px-4 py-3 rounded-xl border border-[rgba(45,26,14,0.12)] bg-[#f5ede0] text-sm font-sans"
            />
          </div>

          <div className="bg-white border border-[rgba(45,26,14,0.08)] rounded-2xl p-4 sm:p-6 mb-4">
            <p className="text-sm font-semibold font-sans mb-4">Profile Image</p>
            <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-5">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#b8832a] to-[#7a4f1e] flex items-center justify-center text-[#f5ede0] text-2xl font-bold uppercase flex-shrink-0">
                {session?.user?.name?.slice(0, 2) || "U"}
              </div>
              <input
                name="profilepic"
                value={form.profilepic? form.profilepic : ""}
                onChange={handlechange}
                type="text"
                placeholder="Enter profile image URL"
                className="w-full min-w-0 flex-1 px-4 py-3 rounded-xl border border-[rgba(45,26,14,0.12)] bg-[#f5ede0] text-sm font-sans"
                />
            </div>
          </div>

          <div className="bg-white border border-[rgba(45,26,14,0.08)] rounded-2xl p-4 sm:p-6 mb-4">
            <p className="text-sm font-semibold font-sans mb-4">Profile Info</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-[#9a7a5a] font-sans block mb-1.5">Username</label>
                <input name='username' value={form.username? form.username : ""} onChange={handlechange} type="text" placeholder="username" className="w-full px-4 py-2.5 rounded-xl border border-[rgba(45,26,14,0.12)] bg-[#f5ede0] text-sm font-sans outline-none focus:border-[#b8832a] transition-colors" />
              </div>
              <div>
                <label className="text-xs text-[#9a7a5a] font-sans block mb-1.5">Email</label>
                <input name="email" value={form.email ? form.email : ""} onChange={handlechange} type="email" placeholder="email@example.com" className="w-full px-4 py-2.5 rounded-xl border border-[rgba(45,26,14,0.12)] bg-[#f5ede0] text-sm font-sans outline-none focus:border-[#b8832a] transition-colors" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-[rgba(45,26,14,0.08)] rounded-2xl p-4 sm:p-6 mb-4">
            <p className="text-sm font-semibold font-sans mb-1">Razorpay Credentials</p>
            <p className="text-xs text-[#9a7a5a] font-sans mb-4">Used to receive payments from your supporters</p>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-xs text-[#9a7a5a] font-sans block mb-1.5">Razorpay Key ID</label>
                <input name="razorpayid" value={form.razorpayid?form.razorpayid : ""} onChange={handlechange} type="text" placeholder="rzp_live_xxxxxxxxxxxx" className="w-full px-4 py-2.5 rounded-xl border border-[rgba(45,26,14,0.12)] bg-[#f5ede0] text-sm font-sans outline-none focus:border-[#b8832a] transition-colors" />
              </div>
              <div>
                <label className="text-xs text-[#9a7a5a] font-sans block mb-1.5">Razorpay Key Secret</label>
                <input name="razorpaysecret" value={form.razorpaysecret? form.razorpaysecret : ""} onChange={handlechange} type="text" placeholder="••••••••••••••••" className="w-full px-4 py-2.5 rounded-xl border border-[rgba(45,26,14,0.12)] bg-[#f5ede0] text-sm font-sans outline-none focus:border-[#b8832a] transition-colors" />
              </div>
            </div>
          </div>

          <button type="submit" className="w-full py-3 rounded-full bg-[#2d1a0e] text-[#f5ede0] text-sm font-semibold font-sans hover:bg-[#1a0e06] transition-all">
            Save Changes
          </button>

        </div>
      </div>
    </form>
                </>
  )
}

export default Dashboard
