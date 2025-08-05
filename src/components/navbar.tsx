// File: components/navbar.tsx
"use client";

import { useState, useEffect } from "react";
// The ThemeToggle component doesn't exist yet, we can comment it out for now or create it
// import { ThemeToggle } from "@/components/ui/theme-toggle"; 
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";

const navigationLinks = [
  { href: "/", label: "Home", active: true },
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#about", label: "About" },
];

export default function Navbar() {
  const { isAuthenticated, loading, user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      <nav className="fixed top-6 left-0 right-0 z-50 w-full">
        <div className="mx-auto max-w-fit px-6">
          <div
            className="flex items-center justify-between px-6 py-3 rounded-3xl"
            style={{
              backdropFilter: "blur(20px)",
              backgroundColor: "rgba(0, 0, 0, 0.2)", // Darker for better visibility
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            {/* Logo Section */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-lg">V</span>
                </div>
                <span className="text-white text-2xl font-bold tracking-tight">
                  Verfolia
                </span>
              </Link>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center space-x-2 mx-8">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 rounded-2xl text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="h-9 w-16 animate-pulse rounded-2xl bg-white/10"></div>
                  <div className="h-9 w-24 animate-pulse rounded-2xl bg-white/10"></div>
                </div>
              ) : isAuthenticated ? (
                <div className="hidden md:flex items-center gap-2">
                  <span className="text-sm text-gray-400 mr-2">
                    {user?.email}
                  </span>
                   <button
                    onClick={handleSignOut}
                    className="px-4 py-2 rounded-2xl text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium border border-white/10"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-2xl text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-2xl bg-white text-black hover:bg-gray-100 transition-colors duration-200 text-sm font-medium"
                  >
                    Sign up
                  </Link>
                </div>
              )}
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden size-9 flex items-center justify-center text-white"
              >
                <svg width={20} height={20} fill="currentColor"><path d="M3 5h14M3 12h14M3 19h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path></svg>
              </button>
              {/* <ThemeToggle /> We'll add this back later */}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
         <div className="fixed inset-0 z-[60] md:hidden">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setMobileMenuOpen(false)} />
            <div className="relative h-full flex flex-col p-6">
                <div className="flex items-center justify-between">
                     <Link href="/" className="flex items-center space-x-3">
                        <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
                        <span className="text-black font-bold text-lg">V</span>
                        </div>
                        <span className="text-white text-2xl font-bold tracking-tight">
                        Verfolia
                        </span>
                    </Link>
                    <button onClick={() => setMobileMenuOpen(false)} className="size-10 flex items-center justify-center text-white"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"></path></svg></button>
                </div>
                <nav className="flex-1 flex flex-col justify-center items-center space-y-8">
                  {[...navigationLinks, {href: "#blogs", label: "Blogs"}, {href: "#solutions", label: "Solutions"}].map((link) => (
                     <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="block text-3xl font-semibold text-white">{link.label}</Link>
                  ))}
                </nav>
                 <div className="p-6">
                 {isAuthenticated ? (
                     <button onClick={() => { handleSignOut(); setMobileMenuOpen(false); }} className="block w-full py-4 text-center border border-white/20 text-white rounded-full text-lg font-semibold hover:bg-white/10 transition-colors">Sign Out</button>
                  ) : (
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="block w-full py-4 text-center bg-white text-black rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors">Sign up for free</Link>
                 )}
                 </div>
            </div>
         </div>
      )}
    </>
  );
}