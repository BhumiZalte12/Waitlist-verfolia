// File: src/components/navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

// Navigation links for the navbar
const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#about", label: "About" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // NOTE: All authentication logic (useAuth, handleSignOut) has been removed.

  return (
    <>
      <nav className="fixed top-4 left-0 right-0 z-50 w-full">
        <div className="mx-auto max-w-lg rounded-full">
          <div className="flex items-center justify-between rounded-full border border-white/10 bg-black/30 p-2 px-4 shadow-lg backdrop-blur-xl">
            
            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-primary-foreground">V</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                Verfolia
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-2">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 rounded-full text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Side Actions - Desktop */}
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="/login"
                className="rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                Sign in
              </Link>
              <Link
                href="/login"
                className="rounded-full bg-primary px-4 py-2 font-bold text-primary-foreground transition hover:bg-primary/90 active:scale-95 text-sm"
              >
                Sign up
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden flex items-center justify-center text-foreground"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-lg md:hidden"
        >
          <div className="p-6">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                 <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-primary-foreground">V</span>
                  </div>
                <span className="text-xl font-bold tracking-tight text-foreground">Verfolia</span>
              </Link>
              <button onClick={() => setMobileMenuOpen(false)} className="text-foreground">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <nav className="mt-16 flex flex-col items-center gap-8">
              {navigationLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-3xl font-semibold text-foreground">
                  {link.label}
                </Link>
              ))}
            </nav>
            
            <div className="absolute bottom-8 left-6 right-6">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="block w-full rounded-full bg-primary py-3 text-center text-lg font-semibold text-primary-foreground hover:bg-primary/90">
                Sign up
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}