import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";
import  SessionWraper  from "./components/SessionWraper";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BrewSupport - get suppport from your lovables ",
  description: "this website helps you to get crowdfunds for creators",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body  className="min-h-full bg-[#FDF6EC]">
        <SessionWraper>
        <Navbar/>
        {children}
        <Footer/>
        </SessionWraper>
      </body>
    </html>
  );
}
