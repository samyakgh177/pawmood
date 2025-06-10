'use client'
import { Fugaz_One, Open_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Head from "./head";
import Button from "@/components/Button";
import Image from "next/image";

const opensans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const fugaz = Fugaz_One({
  variable: "--font-fugaz",
  subsets: ["latin"],
  weight: ["400"],
});

 const metadata = {
  title: "PawMood",
  description: "Track your Pet daily mood",
};

function NavigationContent() {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div className="animate-pulse w-24 h-8 bg-blue-100 rounded-full"></div>;
  }

  if (currentUser) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/dashboard">
          <div className="flex items-center gap-2 group px-4 py-2 rounded-full hover:bg-blue-50 transition-colors">
            <Image
              src="/paw-print.svg"
              width={20}
              height={20}
              alt="Track mood"
              className="group-hover:scale-110 transition-transform"
            />
            <span className="text-blue-600 font-medium">Track Mood</span>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link href="/dashboard">
        <Button text="Join Pack" />
      </Link>
      <Link href="/dashboard">
        <Button text="Login" dark />
      </Link>
    </div>
  );
}

export default function RootLayout({ children }) {
  const header = (
    <header className="p-4 sm:p-8 flex items-center justify-between">
      <Link href={'/'} className="flex items-center gap-2 group">
        <Image
          src="/paw-print.svg"
          width={24}
          height={24}
          alt="PawMood"
          className="group-hover:scale-110 transition-transform"
        />
        <h1 className={`text-base sm:text-lg textGradient ${fugaz.className}`}>
          PawMood
        </h1>
      </Link>
      <NavigationContent />
    </header>
  );

  const footer = (
    <footer className="p-4 sm:p-8 grid place-items-center">
      <p className={`text-indigo-400 ${fugaz.className}`}>Created with 💙</p>
    </footer>
  );

  return (
    <html lang="en" className={`${opensans.variable}`}>
      <Head/>
      <AuthProvider>
        <body className="w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col antialiased text-slate-800">
          {header}
          {children}
          {footer}
        </body>
      </AuthProvider>
    </html>
  );
}
