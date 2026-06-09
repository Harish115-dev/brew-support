"use server"
import connectDB from "@/db/connectDB"
import Razorpay from "razorpay"
import User from "@/models/user"
import payment from "@/models/payment"
import Username from "@/app/[username]/page"

export const initiate = async (amount, to_username, paymentform) => {
    await connectDB()
    let u = await User.findOne({ username: to_username }).lean()
    if (!u) {
        throw new Error("User not found")
    }

    const keyId = u.razorpayid
    const keySecret = u.razorpaysecret
    if (!keyId || !keySecret) {
        throw new Error("This creator has not configured Razorpay yet. Please ask them to add Razorpay credentials in the dashboard.")
    }

    var instance = new Razorpay({ key_id: keyId, key_secret: keySecret })
    let options = {
        amount: Number.parseInt(amount) * 100,
        currency: "INR"
    }
    let x = await instance.orders.create(options)

    await payment.create({
        oid: x.id,
        amount: amount,
        to_user: u.username,
        name: paymentform.name,
        message: paymentform.message
    })
    return x
}
export const fetchuser = async (username) => {
    await connectDB()

    const user = await User.findOne({ username }).lean()

    return JSON.parse(JSON.stringify(user))
}
export const fetchpayment = async (username) => {
    // fetch payment for top 10 recent payments for a user
    await connectDB()
    let p = await payment
        .find({ to_user: username })
        .sort({ createdAt: -1 })
        .limit(10)
        .lean()
    return JSON.parse(JSON.stringify(p))
}


export const updateprofile = async (data, oldusernameProp) => {

    await connectDB()

    if (!data) {
        return { error: "No data received" }
    }

    let ndata = data

    const oldUser = await User.findOne({ username: oldusernameProp }).lean()
    const oldusername = oldUser?.username

    if (oldusername && oldusername !== ndata.username) {
        const u = await User.findOne({ username: ndata.username }).lean()

        if (u) {
            return { error: "username already exist" }
        }
        await payment.updateMany(
            { to_user: oldusername },
            { to_user: ndata.username }
        )
    }

    await User.updateOne({ email: ndata.email }, ndata)
}