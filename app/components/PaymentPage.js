"use client"
import React from 'react'
import Script from 'next/script'
import { useSession } from "next-auth/react"
import { useEffect, useState } from 'react'
import { initiate } from '@/actions/useraction'
import { fetchuser, fetchpayment } from '@/actions/useraction'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { useSearchParams } from 'next/navigation'


export const PaymentPage = ({ username }) => {
    const [currentuser, setcurrentuser] = useState({})
    const [payments, setpayments] = useState([])
    const serchParamscontext = useSearchParams()

    const [paymentform, setpaymentform] = useState({
        name: "",
        message: "",
        amount: ""
    })

    const handlechange = (e) => {
        setpaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const { data: session } = useSession()

    const pageUsername = username && username !== "undefined"
        ? decodeURIComponent(username)
        : session?.user?.name || ""

    const pageDisplayName = currentuser?.name || pageUsername
    const profilePic = currentuser?.profilepic
    const coverPic = currentuser?.coverpic

    const getData = async () => {
        if (!pageUsername) return
        let u = await fetchuser(pageUsername)
        setcurrentuser(u)

        let dbpayment = await fetchpayment(pageUsername)
        setpayments(dbpayment)
    }

    useEffect(() => {
        getData()
    }, [pageUsername])


    useEffect(() => {
        if (serchParamscontext.get("paymentdone") === "true") {
            toast('Payment has been made!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    }, [])



    const isFormValid = paymentform.name.trim() && paymentform.message.trim() && paymentform.amount && Number(paymentform.amount) > 0;

    const pay = async (amount) => {
        let a = await initiate(amount, pageUsername, paymentform)
        var options = {
            "key": currentuser.razorpayid,
            "amount": amount * 100,
            "currency": "INR",
            "name": "Brew Support",
            "description": "Support the creator",
            "order_id": a.id,
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": {
                "name": paymentform.name,
            },
            "theme": {
                "color": "#b8832a"
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

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
        <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

        <div className="min-h-screen bg-[#f5ede0] text-[#2d1a0e]" style={{ fontFamily: "'Lora', Georgia, serif" }}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@400;500;600&display=swap');`}</style>

            <div
                className="h-44 bg-cover bg-center sm:h-56 lg:h-64"
                style={{
                    backgroundImage: coverPic
                        ? `url(${coverPic})`
                        : "linear-gradient(to bottom right, #e8d5b7, #d4b896, #c9a87a)",
                }}
            />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 sm:-top-14 sm:w-28 sm:h-28 rounded-full border-[5px] border-[#f5ede0] bg-gradient-to-br from-[#b8832a] to-[#7a4f1e] flex items-center justify-center text-[#f5ede0] text-3xl font-bold uppercase shadow-lg overflow-hidden">
                    {profilePic ? (
                        <img src={profilePic} alt={pageDisplayName} className="w-full h-full object-cover rounded-full" />
                    ) : (
                        <span>{pageDisplayName?.charAt(0)?.toUpperCase() || "U"}</span>
                    )}
                </div>

                <div className="pt-16 sm:pt-20 pb-6 sm:pb-8 flex flex-col items-center text-center">
                    <h1 className="max-w-full break-words text-3xl sm:text-4xl font-bold tracking-tight capitalize">
                        {pageUsername}
                    </h1>
                    <p className="text-lg text-[#b8832a] mt-2 font-semibold">
                        Total Raised: ₹{payments.reduce((sum, p) => sum + Number(p.amount), 0)}
                    </p>

                    <div className="inline-flex items-center gap-2 mt-4 px-4 py-1.5 rounded-full border border-[rgba(45,26,14,0.12)] bg-[rgba(45,26,14,0.05)] text-xs text-[#7a5c3e] font-sans">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#b8832a]" />
                        No platform fees. Ever.
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 grid lg:grid-cols-[2fr_1fr] gap-5 lg:gap-8">

                <div className="bg-white border border-[rgba(45,26,14,0.08)] rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm h-full">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
                        <div>
                            <h2 className="text-xl font-bold">Supporters</h2>
                            <p className="text-sm text-[#9a7a5a] mt-1 font-sans">
                                People who make this work possible
                            </p>
                        </div>

                        <div className="text-right">
                            <p className="text-2xl font-bold">{payments.length}</p>
                            <p className="text-xs text-[#b8a090] font-sans">supporters</p>
                        </div>
                    </div>

                    <ul className="space-y-1">
                        {payments
                            .sort((a, b) => b.amount - a.amount)
                            .slice(0, 6)
                            .map((p) => {
                                return (
                                    <li
                                        key={p._id}
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#faf7f2] border border-[#eadfce] hover:shadow-md transition-all"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#b8832a] to-[#7a4f1e] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                                            {p.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <p className="text-sm text-[#2d1a0e] flex-1 min-w-0 break-words">
                                            <span className="font-semibold">{p.name}</span> donated <span className="font-bold text-[#b8832a]">₹{p.amount}</span> with <span className="text-[#8b6f52] italic">{p.message}</span>
                                        </p>
                                    </li>
                                )
                            })}
                    </ul>
                </div>

                <div className="lg:sticky lg:top-24 lg:self-start">
                    <div className="bg-white border border-[rgba(45,26,14,0.08)] rounded-2xl p-4 sm:p-6 shadow-sm">
                        <div className="mb-6">
                            <h2 className="text-xl font-bold">Support</h2>
                            <p className="text-sm text-[#9a7a5a] mt-1 font-sans">
                                Help {pageUsername} continue creating
                            </p>
                        </div>

                        <p className="text-[15px] font-semibold mb-4 font-sans">
                            Buy {pageUsername} a Coffee ☕
                        </p>

                        <input
                            onChange={handlechange}
                            value={paymentform.name}
                            name="name"
                            type="text"
                            placeholder="Enter Name"
                            className="w-full px-4 py-3 rounded-xl border border-[rgba(45,26,14,0.12)] bg-white text-sm mb-3"
                        />

                        <input
                            onChange={handlechange}
                            value={paymentform.message}
                            name="message"
                            type="text"
                            placeholder="Enter Message"
                            className="w-full px-4 py-3 rounded-xl border border-[rgba(45,26,14,0.12)] bg-white text-sm mb-3"
                        />

                        <input
                            onChange={handlechange}
                            value={paymentform.amount}
                            name="amount"
                            type="number"
                            placeholder="Enter Amount"
                            className="w-full px-4 py-3 rounded-xl border border-[rgba(45,26,14,0.12)] bg-white text-sm mb-4"
                        />

                        <div className="grid grid-cols-3 gap-2 mb-4">
                            <button
                                onClick={() => pay(50)}
                                disabled={!paymentform.name.trim() || !paymentform.message.trim()}
                                className="py-2 rounded-xl border hover:bg-[#f5ede0] disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-500"
                            >
                                ₹50
                            </button>
                            <button
                                onClick={() => pay(100)}
                                disabled={!paymentform.name.trim() || !paymentform.message.trim()}
                                className="py-2 rounded-xl border hover:bg-[#f5ede0] disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-500"
                            >
                                ₹100
                            </button>
                            <button
                                onClick={() => pay(200)}
                                disabled={!paymentform.name.trim() || !paymentform.message.trim()}
                                className="py-2 rounded-xl border hover:bg-[#f5ede0] disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-500"
                            >
                                ₹200
                            </button>
                        </div>

                        <button
                            onClick={() => pay(paymentform.amount)}
                            disabled={!isFormValid}
                            className="w-full py-3 rounded-xl bg-[#b8832a] text-white font-semibold hover:bg-[#9c6f24] transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            Support Now
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </>)
}