
import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import mongoose from "mongoose";
import User from "@/models/user";
import payment from "@/models/payment";
import Username from "@/app/[username]/page";
import connectDB from "@/db/connectDB";


const handler = NextAuth({
  providers: [
    Github({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  callbacks: {

    async signIn({ user, account,profile}) {

      if (account.provider === "github") {
        await connectDB();
        const currentUser = await User.findOne({email: user.email});

        if (!currentUser) {
          await User.create({
            email: user.email,
            username: user.email.split("@")[0],
            name: user.name,
            image: user.image,
          });

        }
      }

      return true;
    },
async session({ session }) {
    await connectDB()
    let u = await User.findOne({ email: session.user.email }).lean()
    if (u) {
        session.user.name = u.username
        session.user.username = u.username
    }
    return session
}

  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };